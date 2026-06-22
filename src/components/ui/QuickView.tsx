import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "../../store/cartStore";
import { useWishlist } from "../../store/wishlistStore";
import { useCurrency } from "../../store/currencyStore";
import { useT } from "../../i18n";
import { useToastStore } from "../../store/toastStore";
import BlurImage from "../BlurImage";

interface QuickViewProps {
  product: {
    id: string; name: string; price: number; image: string;
    images?: string[]; category?: string; fabric?: string; desc?: string;
  } | null;
  onClose: () => void;
}

export default function QuickView({ product, onClose }: QuickViewProps) {
  const t = useT();
  const toast = useToastStore((s) => s.add);
  const addItem = useCartStore((s) => s.addItem);
  const { add: addWish, remove: remWish, has } = useWishlist();
  const format = useCurrency((s) => s.format);
  const [imgIndex, setImgIndex] = useState(0);
  const allImages = product?.images?.length ? product.images : (product ? [product.image] : []);
  const prevImg = () => setImgIndex((i) => (i > 0 ? i - 1 : allImages.length - 1));
  const nextImg = () => setImgIndex((i) => (i < allImages.length - 1 ? i + 1 : 0));

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
            className="fixed inset-0 bg-ink/70 backdrop-blur-sm z-[100]" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-3xl md:w-full bg-bone text-ink z-[110] flex flex-col md:flex-row overflow-hidden shadow-2xl">
            <div className="relative md:w-1/2 aspect-[4/5] md:aspect-auto md:h-full overflow-hidden bg-ink/5 group">
              <BlurImage src={allImages[imgIndex]} alt={product.name} className="w-full h-full object-cover" />
              {allImages.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); prevImg(); }} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-bone/80 text-ink flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-clay">
                    <ChevronLeft size={16} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); nextImg(); }} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-bone/80 text-ink flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-clay">
                    <ChevronRight size={16} />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {allImages.map((_, i) => (
                      <button key={i} onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIndex ? "bg-clay w-4" : "bg-bone/60 hover:bg-bone"}`} />
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {product.category && <span className="text-[10px] tracking-[0.3em] uppercase text-clay">{product.category}</span>}
                    <h2 className="font-display text-3xl md:text-4xl mt-2 leading-tight">{product.name}</h2>
                  </div>
                  <button onClick={onClose} className="p-1 text-ink/40 hover:text-ink transition-colors shrink-0">
                    <X size={20} strokeWidth={1.5} />
                  </button>
                </div>
                <div className="w-10 h-px bg-clay/50 my-6" />
                <div className="font-display text-3xl text-ink mb-4">{format(product.price)}</div>
                {product.fabric && <p className="text-sm text-ink/60 font-serif italic mb-4">{product.fabric}</p>}
                {product.desc && <p className="text-sm text-ink/70 leading-relaxed font-serif">{product.desc}</p>}
              </div>
              <div className="flex flex-col gap-3 mt-8">
                <button onClick={() => { addItem({ id: product.id, name: product.name, price: product.price, image: product.image }); toast(t("quickview.add") + " · " + product.name); onClose(); }}
                  className="btn-fill w-full flex items-center justify-center gap-3 bg-ink text-bone py-4 text-[11px] tracking-[0.3em] uppercase transition-colors">
                  <ShoppingBag size={14} strokeWidth={1.5} /> {t("quickview.add")}
                </button>
                <button onClick={() => {
                  const inWish = has(product.id);
                  inWish ? remWish(product.id) : addWish({ id: product.id, name: product.name, price: product.price, image: product.image });
                  toast((inWish ? t("wishlist.remove") : t("wishlist.add")) + " · " + product.name);
                }}
                  className={`w-full flex items-center justify-center gap-2 py-3 text-[10px] tracking-[0.3em] uppercase border transition-colors ${has(product.id) ? "border-clay text-clay" : "border-ink/20 text-ink/60 hover:border-ink/40"}`}>
                  <Heart size={13} strokeWidth={1.5} fill={has(product.id) ? "currentColor" : "none"} />
                  {has(product.id) ? t("quickview.in_wishlist") : t("quickview.add_wishlist")}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}