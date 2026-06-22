import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { Plus, Eye, Heart } from "lucide-react";
import { media, srcSet } from "../config/media";
import { useCartStore } from "../store/cartStore";
import { useWishlist } from "../store/wishlistStore";
import { useCurrency } from "../store/currencyStore";
import QuickView from "./ui/QuickView";
import Lightbox from "./ui/Lightbox";
import { useT, t } from "../i18n";

interface Product {
  id: string; code: string; name: string; category: string;
  price: number; img: string; image: string; fabric: string; origin: string;
}

export default function Lookbook() {
  const t = useT();
  const products: Product[] = [
    { id: "n01", code: "M·N·01", name: t("lookbook.p1.name"), category: "Haute Couture", price: 18500, img: media.pexelsEditorial1, image: media.pexelsEditorial1, fabric: t("lookbook.p1.fabric"), origin: t("lookbook.origin") },
    { id: "n02", code: "M·N·02", name: t("lookbook.p2.name"), category: "Atelier Privé", price: 12200, img: media.pexelsEditorial3, image: media.pexelsEditorial3, fabric: t("lookbook.p2.fabric"), origin: t("lookbook.origin") },
    { id: "n03", code: "M·N·03", name: t("lookbook.p3.name"), category: "Gala", price: 24800, img: media.pexelsEditorial8, image: media.pexelsEditorial8, fabric: t("lookbook.p3.fabric"), origin: t("lookbook.origin") },
    { id: "n04", code: "M·N·04", name: t("lookbook.p4.name"), category: "Sastrería", price: 9800, img: media.pexelsEditorial7, image: media.pexelsEditorial7, fabric: t("lookbook.p4.fabric"), origin: t("lookbook.origin") },
  ];
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);
  const { has, toggleItem: toggleWish } = useWishlist();
  const format = useCurrency((s) => s.format);
  const [quickProduct, setQuickProduct] = useState<Product | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const lightboxImages = products.map((p) => ({ src: p.img, alt: p.name }));

  return (
    <section id="lookbook" className="relative bg-bone text-ink py-32 md:py-48">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex items-center gap-4 mb-6">
              <span className="w-12 h-px bg-clay" />
              <span className="text-[11px] tracking-[0.5em] uppercase text-clay">{t("lookbook.label")}</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
              {t("lookbook.heading1")}<br /><span className="italic font-light text-clay">{t("lookbook.heading2")}</span>
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-[10px] tracking-[0.4em] uppercase text-ink/50 max-w-xs">
            {t("lookbook.desc")}
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((p, i) => (
            <motion.article key={p.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }} onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)} className="group" data-cursor-hover>
              <div className="relative aspect-[3/4] overflow-hidden bg-ink/5 mb-5" onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}>
                <img src={p.img} alt={p.name} loading="lazy" srcSet={srcSet(p.img)} sizes="(max-width: 768px) 50vw, 25vw" className="zoom-img absolute inset-0 w-full h-full object-cover cursor-pointer" />
                <div className="absolute top-3 left-3 text-[10px] tracking-[0.3em] uppercase text-bone bg-ink/60 backdrop-blur-sm px-3 py-1.5">{p.code}</div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: hovered === p.id ? 1 : 0 }} className="absolute inset-0 bg-ink/20 backdrop-blur-[2px] flex items-center justify-center gap-3">
                  <button onClick={(e) => { e.stopPropagation(); setQuickProduct(p); }}
                    className="w-11 h-11 rounded-full bg-bone text-ink flex items-center justify-center hover:bg-clay transition-colors" aria-label={t("lookbook.quickview")}>
                    <Eye size={16} strokeWidth={1.5} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); addItem({ id: p.id, name: p.name, price: p.price, image: p.img }); }}
                    className="w-11 h-11 rounded-full bg-bone text-ink flex items-center justify-center hover:bg-clay transition-colors" aria-label={t("lookbook.add")}>
                    <Plus size={18} strokeWidth={1.5} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); toggleWish({ id: p.id, name: p.name, price: p.price, image: p.img }); }}
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${has(p.id) ? "bg-clay text-ink" : "bg-bone text-ink hover:bg-clay"}`} aria-label={t("lookbook.wishlist")}>
                    <Heart size={15} strokeWidth={1.5} className={has(p.id) ? "fill-ink" : ""} />
                  </button>
                </motion.div>
              </div>
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl leading-tight">{p.name}</h3>
                    <div className="mt-1 text-[10px] tracking-[0.3em] uppercase text-clay">{p.category}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[10px] tracking-[0.3em] uppercase text-ink/50">{t("lookbook.from")}</div>
                    <div className="font-display text-xl">{format(p.price)}</div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-ink/60 font-serif italic">{p.fabric}</div>
              </div>
            </motion.article>
          ))}
        </div>
        <AnimatePresence>
          {quickProduct && <QuickView product={quickProduct} onClose={() => setQuickProduct(null)} />}
        </AnimatePresence>
        {lightboxOpen && <Lightbox images={lightboxImages} index={lightboxIndex} onClose={() => setLightboxOpen(false)} />}
      </div>
    </section>
  );
}
