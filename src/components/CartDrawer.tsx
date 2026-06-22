import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useCurrency } from "../store/currencyStore";
import { useEffect } from "react";
import { useT } from "../i18n";

export default function CartDrawer() {
  const t = useT();
  const { isOpen, toggleCart, toggleCheckout, items, updateQuantity, removeItem, cartTotal } = useCartStore();
  const format = useCurrency((s) => s.format);

  // Prevent scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-[80]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-ink border-l border-bone/10 z-[90] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-bone/10 shrink-0">
              <h2 className="font-display text-2xl tracking-[0.2em] text-bone uppercase">{t("cart.title")}</h2>
              <button
                onClick={toggleCart}
                className="p-2 text-bone/60 hover:text-bone transition-colors"
                aria-label={t("cart.close")}
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 no-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-bone/50 text-center">
                  <span className="text-[10px] tracking-[0.3em] uppercase mb-4">{t("cart.empty")}</span>
                  <p className="font-serif italic text-lg">{t("cart.empty.desc")}</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-6">
                    <div className="w-24 h-32 bg-bone/5 overflow-hidden shrink-0 border border-bone/10">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale opacity-80" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="font-display text-xl tracking-wider text-bone">{item.name}</h3>
                        <p className="text-[10px] tracking-[0.2em] text-clay mt-1">{format(item.price)}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4 border border-bone/20 px-3 py-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-bone/60 hover:text-bone">
                            <Minus size={14} />
                          </button>
                          <span className="text-xs text-bone w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-bone/60 hover:text-bone">
                            <Plus size={14} />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-bone/40 hover:text-clay transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-6 md:p-8 border-t border-bone/10 bg-ink shrink-0">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-bone/60">{t("cart.subtotal")}</span>
                  <span className="font-display text-2xl text-bone">{format(cartTotal())}</span>
                </div>
                <button onClick={toggleCheckout}
                  className="btn-fill w-full bg-bone text-ink py-4 text-[11px] tracking-[0.3em] uppercase font-semibold hover:bg-clay transition-colors">
                  {t("cart.checkout")}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
