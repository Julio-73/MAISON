import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Heart } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { useWishlist } from "../../store/wishlistStore";
import { useCurrency } from "../../store/currencyStore";

interface QuickViewProps {
  product: {
    id: string; name: string; price: number; image: string;
    category?: string; fabric?: string; desc?: string;
  } | null;
  onClose: () => void;
}

export default function QuickView({ product, onClose }: QuickViewProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { add: addWish, remove: remWish, has } = useWishlist();
  const format = useCurrency((s) => s.format);

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
            className="fixed inset-0 bg-ink/70 backdrop-blur-sm z-[100]" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-3xl md:w-full bg-bone text-ink z-[110] flex flex-col md:flex-row overflow-hidden shadow-2xl">
            <div className="md:w-1/2 aspect-[4/5] md:aspect-auto md:h-full overflow-hidden bg-ink/5">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
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
                <button onClick={() => { addItem({ id: product.id, name: product.name, price: product.price, image: product.image }); onClose(); }}
                  className="btn-fill w-full flex items-center justify-center gap-3 bg-ink text-bone py-4 text-[11px] tracking-[0.3em] uppercase transition-colors">
                  <ShoppingBag size={14} strokeWidth={1.5} /> Añadir a la bolsa
                </button>
                <button onClick={() => has(product.id) ? remWish(product.id) : addWish({ id: product.id, name: product.name, price: product.price, image: product.image })}
                  className={`w-full flex items-center justify-center gap-2 py-3 text-[10px] tracking-[0.3em] uppercase border transition-colors ${has(product.id) ? "border-clay text-clay" : "border-ink/20 text-ink/60 hover:border-ink/40"}`}>
                  <Heart size={13} strokeWidth={1.5} fill={has(product.id) ? "currentColor" : "none"} />
                  {has(product.id) ? "En favoritos" : "Añadir a favoritos"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}