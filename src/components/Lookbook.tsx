import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, X, ShoppingBag } from "lucide-react";
import { media } from "../config/media";

interface Product {
  id: string; code: string; name: string; category: string;
  price: number; img: string; fabric: string; origin: string;
}

const products: Product[] = [
  { id: "n01", code: "M·N·01", name: "Vestido Lumière", category: "Haute Couture", price: 18500, img: media.pexelsEditorial1, fabric: "Seda cruda · Encaje Calais", origin: "Hecho en París" },
  { id: "n02", code: "M·N·02", name: "Abrigo Écho", category: "Atelier Privé", price: 12200, img: media.pexelsEditorial3, fabric: "Lana virgen · Cachemira", origin: "Hecho en París" },
  { id: "n03", code: "M·N·03", name: "Conjunto Nuit", category: "Gala", price: 24800, img: media.pexelsEditorial8, fabric: "Terciopelo · Cristales Swarovski", origin: "Hecho en París" },
  { id: "n04", code: "M·N·04", name: "Traje Construit", category: "Sastrería", price: 9800, img: media.pexelsEditorial7, fabric: "Lana fría · Forro seda", origin: "Hecho en París" },
];

export default function Lookbook() {
  const [cart, setCart] = useState<Product[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);

  const addToCart = (p: Product) => setCart((c) => (c.find((x) => x.id === p.id) ? c : [...c, p]));
  const removeFromCart = (id: string) => setCart((c) => c.filter((x) => x.id !== id));
  const total = cart.reduce((s, p) => s + p.price, 0);

  return (
    <section id="lookbook" className="relative bg-bone text-ink py-32 md:py-48">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex items-center gap-4 mb-6">
              <span className="w-12 h-px bg-clay" />
              <span className="text-[11px] tracking-[0.5em] uppercase text-clay">Lookbook Privé · 2026</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
              Las piezas<br /><span className="italic font-light text-clay">de la temporada.</span>
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-[10px] tracking-[0.4em] uppercase text-ink/50 max-w-xs">
            Cada pieza es única. Reservas abiertas. Producción 8 a 12 semanas.
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((p, i) => (
            <motion.article key={p.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }} onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)} className="group" data-cursor-hover>
              <div className="relative aspect-[3/4] overflow-hidden bg-ink/5 mb-5">
                <img src={p.img} alt={p.name} loading="lazy" className="zoom-img absolute inset-0 w-full h-full object-cover" />
                <div className="absolute top-3 left-3 text-[10px] tracking-[0.3em] uppercase text-bone bg-ink/60 backdrop-blur-sm px-3 py-1.5">{p.code}</div>
                <motion.button onClick={() => addToCart(p)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: hovered === p.id ? 1 : 0, y: hovered === p.id ? 0 : 20 }} className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-bone text-ink flex items-center justify-center hover:bg-clay transition-colors" aria-label="Add to cart">
                  <Plus size={18} strokeWidth={1.5} />
                </motion.button>
              </div>
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-2xl md:text-3xl leading-tight">{p.name}</h3>
                  <div className="text-right shrink-0">
                    <div className="text-[10px] tracking-[0.3em] uppercase text-ink/50">Desde</div>
                    <div className="font-display text-xl">€{p.price.toLocaleString()}</div>
                  </div>
                </div>
                <div className="mt-2 text-[10px] tracking-[0.3em] uppercase text-clay">{p.category}</div>
                <div className="mt-3 text-xs text-ink/60 font-serif italic">{p.fabric}</div>
              </div>
            </motion.article>
          ))}
        </div>

        <AnimatePresence>
          {cart.length > 0 && (
            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }} className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:bottom-8 md:w-96 z-40 bg-ink text-bone shadow-2xl shadow-ink/50">
              <div className="p-6 border-b border-bone/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag size={18} strokeWidth={1.4} className="text-clay" />
                  <span className="font-display text-lg">Sus reservas ({cart.length})</span>
                </div>
                <button onClick={() => setCart([])} className="text-[10px] tracking-[0.3em] uppercase text-bone/60 hover:text-bone transition-colors" data-cursor-hover>Vaciar</button>
              </div>
              <div className="max-h-64 overflow-y-auto p-4 space-y-2">
                {cart.map((p) => (
                  <div key={p.id} className="flex items-center gap-3 p-2 hover:bg-bone/5 transition-colors">
                    <img src={p.img} alt={p.name} className="w-12 h-12 object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-sm truncate">{p.name}</div>
                      <div className="text-[10px] tracking-[0.3em] uppercase text-clay">{p.code}</div>
                    </div>
                    <div className="text-xs font-display shrink-0">€{p.price.toLocaleString()}</div>
                    <button onClick={() => removeFromCart(p.id)} className="text-bone/40 hover:text-clay transition-colors" data-cursor-hover aria-label="Remove"><X size={14} /></button>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t border-bone/15">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-bone/60">Total estimado</span>
                  <span className="font-display text-2xl">€{total.toLocaleString()}</span>
                </div>
                <a href="#contact" className="btn-fill w-full inline-flex items-center justify-center gap-3 bg-bone text-ink px-6 py-4 text-[11px] tracking-[0.3em] uppercase" data-cursor-hover>Solicitar cita</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
