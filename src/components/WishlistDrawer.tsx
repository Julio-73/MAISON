import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingBag } from "lucide-react";
import { useWishlist } from "../store/wishlistStore";
import { useCartStore } from "../store/cartStore";
import { useCurrency } from "../store/currencyStore";

export default function WishlistDrawer() {
  const { isOpen, toggle, items, remove } = useWishlist();
  const addItem = useCartStore((s) => s.addItem);
  const format = useCurrency((s) => s.format);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div onClick={toggle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-[80]" />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-ink border-l border-bone/10 z-[90] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-bone/10 shrink-0">
              <h2 className="font-display text-2xl tracking-[0.2em] text-bone uppercase flex items-center gap-3">
                <Heart size={18} strokeWidth={1.5} /> Favoritos
              </h2>
              <button onClick={toggle} className="p-2 text-bone/60 hover:text-bone transition-colors" aria-label="Cerrar favoritos">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 no-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-bone/50 text-center">
                  <Heart size={36} strokeWidth={1} className="opacity-30 mb-4" />
                  <span className="text-[10px] tracking-[0.3em] uppercase">Sin favoritos aún</span>
                  <p className="font-serif italic text-lg mt-2">Descubre y guarda tus piezas.</p>
                </div>
              ) : items.map((item) => (
                <div key={item.id} className="flex gap-6">
                  <div className="w-24 h-32 bg-bone/5 overflow-hidden shrink-0 border border-bone/10">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale opacity-80" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="font-display text-xl tracking-wider text-bone">{item.name}</h3>
                      <p className="text-[10px] tracking-[0.2em] text-clay mt-1">{format(item.price)}</p>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button onClick={() => { addItem({ id: item.id, name: item.name, price: item.price, image: item.image }); remove(item.id); }}
                        className="flex items-center gap-2 border border-bone/30 px-4 py-2 text-[10px] tracking-[0.2em] uppercase text-bone hover:bg-bone hover:text-ink transition-colors">
                        <ShoppingBag size={12} /> Añadir
                      </button>
                      <button onClick={() => remove(item.id)}
                        className="text-[10px] tracking-[0.2em] uppercase text-bone/40 hover:text-clay transition-colors">
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}