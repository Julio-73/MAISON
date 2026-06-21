import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, CreditCard, Truck, Check } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useCurrency } from "../store/currencyStore";

type Step = "review" | "shipping" | "payment" | "confirmed";

export default function CheckoutModal() {
  const { isCheckoutOpen, toggleCheckout, items, cartTotal, clearCart } = useCartStore();
  const format = useCurrency((s) => s.format);
  const [step, setStep] = useState<Step>("review");
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", zip: "", card: "", expiry: "", cvv: "" });

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const steps: { key: Step; label: string }[] = [
    { key: "review", label: "Revisar" },
    { key: "shipping", label: "Envío" },
    { key: "payment", label: "Pago" },
  ];
  const stepIndex = steps.findIndex((s) => s.key === step);

  const handleConfirm = () => {
    clearCart();
    setStep("confirmed");
  };

  const reset = () => { setStep("review"); toggleCheckout(); setForm({ name: "", email: "", address: "", city: "", zip: "", card: "", expiry: "", cvv: "" }); };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={reset} className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-[80]" />
          <motion.div initial={{ scale: 0.92, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0, y: 30 }}
            transition={{ duration: 0.35, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[520px] md:max-h-[90vh] bg-ink border border-bone/10 z-[95] flex flex-col shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-bone/10 shrink-0">
              <div className="flex items-center gap-3">
                {step !== "review" && step !== "confirmed" && (
                  <button onClick={() => setStep(steps[stepIndex - 1].key)} className="text-bone/50 hover:text-bone transition-colors">
                    <ChevronLeft size={20} />
                  </button>
                )}
                <h2 className="font-display text-xl tracking-[0.2em] text-bone uppercase">Checkout</h2>
              </div>
              <button onClick={reset} className="p-1 text-bone/60 hover:text-bone transition-colors" aria-label="Cerrar">
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* Steps indicator */}
            {step !== "confirmed" && (
              <div className="flex items-center justify-center gap-0 px-6 pt-6">
                {steps.map((s, i) => (
                  <div key={s.key} className="flex items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                      i <= stepIndex ? "bg-bone text-ink" : "bg-bone/10 text-bone/40"}`}>
                      {i < stepIndex ? <Check size={12} strokeWidth={3} /> : i + 1}
                    </div>
                    {i < steps.length - 1 && <div className={`w-10 sm:w-16 h-[1px] mx-1 ${i < stepIndex ? "bg-bone" : "bg-bone/20"}`} />}
                  </div>
                ))}
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              {/* Step: Review */}
              {step === "review" && (
                <div className="space-y-4">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-bone/50">Productos</p>
                  {items.map((i) => (
                    <div key={i.id} className="flex justify-between items-center border-b border-bone/5 pb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-16 bg-bone/5 overflow-hidden border border-bone/10">
                          <img src={i.image} alt={i.name} className="w-full h-full object-cover grayscale opacity-80" />
                        </div>
                        <div>
                          <p className="font-display tracking-wider text-bone text-sm">{i.name}</p>
                          <p className="text-[10px] text-bone/50">Qty: {i.quantity}</p>
                        </div>
                      </div>
                      <span className="text-sm text-bone">{format(i.price * i.quantity)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-bone/60">Total</span>
                    <span className="font-display text-xl text-bone">{format(cartTotal())}</span>
                  </div>
                  <button onClick={() => setStep("shipping")}
                    className="btn-fill w-full bg-bone text-ink py-4 text-[11px] tracking-[0.3em] uppercase font-semibold mt-4 hover:bg-clay transition-colors">
                    Continuar
                  </button>
                </div>
              )}

              {/* Step: Shipping */}
              {step === "shipping" && (
                <div className="space-y-5">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-bone/50">Información de envío</p>
                  {(["name", "email", "address", "city", "zip"] as const).map((k) => (
                    <div key={k}>
                      <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-1.5 block">{k}</label>
                      <input value={form[k]} onChange={(e) => update(k, e.target.value)}
                        className="w-full bg-transparent border border-bone/20 px-4 py-3 text-sm text-bone outline-none focus:border-bone/60 transition-colors placeholder:text-bone/20"
                        placeholder={k === "email" ? "correo@ejemplo.com" : undefined} />
                    </div>
                  ))}
                  <button onClick={() => setStep("payment")}
                    className="btn-fill w-full bg-bone text-ink py-4 text-[11px] tracking-[0.3em] uppercase font-semibold mt-2 hover:bg-clay transition-colors">
                    Continuar al pago
                  </button>
                </div>
              )}

              {/* Step: Payment */}
              {step === "payment" && (
                <div className="space-y-5">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-bone/50">Información de pago</p>
                  <div>
                    <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-1.5 block">Número de tarjeta</label>
                    <input value={form.card} onChange={(e) => update("card", e.target.value)} placeholder="4242 4242 4242 4242"
                      className="w-full bg-transparent border border-bone/20 px-4 py-3 text-sm text-bone outline-none focus:border-bone/60 transition-colors placeholder:text-bone/20" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-1.5 block">Vencimiento</label>
                      <input value={form.expiry} onChange={(e) => update("expiry", e.target.value)} placeholder="MM/AA"
                        className="w-full bg-transparent border border-bone/20 px-4 py-3 text-sm text-bone outline-none focus:border-bone/60 transition-colors placeholder:text-bone/20" />
                    </div>
                    <div>
                      <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-1.5 block">CVV</label>
                      <input value={form.cvv} onChange={(e) => update("cvv", e.target.value)} placeholder="123"
                        className="w-full bg-transparent border border-bone/20 px-4 py-3 text-sm text-bone outline-none focus:border-bone/60 transition-colors placeholder:text-bone/20" />
                    </div>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-bone/10">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-bone/60">Total a cobrar</span>
                    <span className="font-display text-xl text-bone">{format(cartTotal())}</span>
                  </div>
                  <button onClick={handleConfirm}
                    className="btn-fill w-full bg-clay text-ink py-4 text-[11px] tracking-[0.3em] uppercase font-semibold hover:bg-bone transition-colors">
                    Confirmar pedido
                  </button>
                </div>
              )}

              {/* Step: Confirmed */}
              {step === "confirmed" && (
                <div className="py-16 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-bone flex items-center justify-center mb-6">
                    <Check size={28} strokeWidth={2.5} className="text-ink" />
                  </div>
                  <h3 className="font-display text-3xl tracking-[0.2em] text-bone uppercase mb-3">Pedido Confirmado</h3>
                  <p className="font-serif italic text-lg text-bone/60 mb-2">Gracias por tu compra.</p>
                  <p className="text-xs text-bone/40 max-w-xs">Recibirás un correo con los detalles de envío en breve.</p>
                  <button onClick={reset}
                    className="mt-8 border border-bone/40 px-8 py-3 text-[11px] tracking-[0.3em] uppercase text-bone hover:bg-bone hover:text-ink transition-colors">
                    Volver a la tienda
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}