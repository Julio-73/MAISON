import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, Check, Ruler, Shirt, Palette, User, ClipboardList } from "lucide-react";
import { useMTMStore, mtmSteps } from "../store/madeToMeasureStore";

const icons = [Shirt, Ruler, Palette, User, ClipboardList];

const garments = [
  "Vestido de noche", "Traje sastre", "Abrigo", "Blusa", "Falda", "Pantalón", "Americana", "Camisa a medida",
];

const fabrics = [
  "Seda cruda", "Cachemira", "Lana virgen", "Algodón egipcio", "Lino belga", "Terciopelo", "Encaje Chantilly", "Organza",
];

const colors = [
  "Negro", "Blanco", "Marfil", "Gris perla", "Azul medianoche", "Burdeos", "Verde bosque", "Rosa empolvado",
];

export default function MadeToMeasure() {
  const { form, isOpen, submitted, set, nextStep, prevStep, reset, toggle, submit } = useMTMStore();
  const s = form.step;
  const Icon = icons[s] || Shirt;

  const canProceed = () => {
    switch (s) {
      case 0: return form.garment !== "" && form.details.length > 2;
      case 1: return form.height !== "" && form.bust !== "" && form.waist !== "" && form.hips !== "";
      case 2: return form.fabric !== "" && form.color !== "";
      case 3: return form.clientName.length > 2 && form.clientEmail.includes("@") && form.clientPhone.length > 5;
      case 4: return true;
      default: return false;
    }
  };

  const handleClose = () => { reset(); toggle(); };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose} className="fixed inset-0 bg-ink/70 backdrop-blur-sm z-[80]" />
          <motion.div initial={{ scale: 0.92, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 30 }}
            transition={{ duration: 0.35, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[600px] md:max-h-[90vh] bg-ink border border-bone/10 z-[95] flex flex-col shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-bone/10 shrink-0">
              <div className="flex items-center gap-3">
                {s > 0 && s < 4 && (
                  <button onClick={prevStep} className="text-bone/50 hover:text-bone transition-colors">
                    <ChevronLeft size={20} />
                  </button>
                )}
                <h2 className="font-display text-xl tracking-[0.2em] text-bone uppercase">Alta Costura</h2>
              </div>
              <button onClick={handleClose} className="p-1 text-bone/60 hover:text-bone transition-colors" aria-label="Cerrar">
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            {!submitted && (
              <div className="flex items-center justify-center gap-0 px-6 pt-6">
                {mtmSteps.map((st, i) => (
                  <div key={st.key} className="flex items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                      i <= s ? "bg-bone text-ink" : "bg-bone/10 text-bone/40"}`}>
                      {i < s ? <Check size={12} strokeWidth={3} /> : i + 1}
                    </div>
                    {i < mtmSteps.length - 1 && (
                      <div className={`w-8 sm:w-12 h-[1px] mx-1 ${i < s ? "bg-bone" : "bg-bone/20"}`} />
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              {submitted ? (
                <div className="py-16 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-bone flex items-center justify-center mb-6">
                    <Check size={28} strokeWidth={2.5} className="text-ink" />
                  </div>
                  <h3 className="font-display text-3xl tracking-[0.2em] text-bone uppercase mb-3">Solicitud Enviada</h3>
                  <p className="font-serif italic text-lg text-bone/60 mb-2">Nos pondremos en contacto en 24-48 horas.</p>
                  <p className="text-xs text-bone/40 max-w-xs">Nuestro atelier revisará tus preferencias y te enviará un presupuesto personalizado.</p>
                  <button onClick={handleClose}
                    className="mt-8 border border-bone/40 px-8 py-3 text-[11px] tracking-[0.3em] uppercase text-bone hover:bg-bone hover:text-ink transition-colors">
                    Cerrar
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4 pb-2">
                    <Icon size={18} strokeWidth={1.5} className="text-clay" />
                    <span className="text-[10px] tracking-[0.3em] uppercase text-clay">{mtmSteps[s].label}</span>
                  </div>

                  {/* Step 0: Garment */}
                  {s === 0 && (
                    <div className="space-y-5">
                      <p className="text-bone/60 font-serif italic text-lg">¿Qué pieza deseas crear?</p>
                      <div className="grid grid-cols-2 gap-3">
                        {garments.map((g) => (
                          <button key={g} onClick={() => set("garment", g)}
                            className={`text-left px-4 py-3 text-xs tracking-[0.1em] border transition-colors ${
                              form.garment === g ? "border-bone bg-bone/10 text-bone" : "border-bone/15 text-bone/60 hover:border-bone/40"}`}>
                            {g}
                          </button>
                        ))}
                      </div>
                      <div>
                        <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-1.5 block">Detalles adicionales</label>
                        <textarea value={form.details} onChange={(e) => set("details", e.target.value)} rows={3}
                          className="w-full bg-transparent border border-bone/20 px-4 py-3 text-sm text-bone outline-none focus:border-bone/60 transition-colors placeholder:text-bone/20 resize-none font-serif italic"
                          placeholder="Describe tu visión, inspiración, referencias..." />
                      </div>
                    </div>
                  )}

                  {/* Step 1: Measurements */}
                  {s === 1 && (
                    <div className="space-y-5">
                      <p className="text-bone/60 font-serif italic text-lg">Tus medidas (cm)</p>
                      <div className="grid grid-cols-2 gap-4">
                        {(["height", "bust", "waist", "hips", "inseam", "shoulder", "sleeve"] as const).map((k) => (
                          <div key={k}>
                            <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-1.5 block">{k}</label>
                            <input type="number" value={form[k]} onChange={(e) => set(k, e.target.value)} placeholder="cm"
                              className="w-full bg-transparent border border-bone/20 px-4 py-3 text-sm text-bone outline-none focus:border-bone/60 transition-colors placeholder:text-bone/20" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Materials */}
                  {s === 2 && (
                    <div className="space-y-5">
                      <div>
                        <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-3 block">Tejido principal</label>
                        <div className="grid grid-cols-2 gap-3">
                          {fabrics.map((f) => (
                            <button key={f} onClick={() => set("fabric", f)}
                              className={`text-left px-4 py-3 text-xs tracking-[0.1em] border transition-colors ${
                                form.fabric === f ? "border-bone bg-bone/10 text-bone" : "border-bone/15 text-bone/60 hover:border-bone/40"}`}>
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-3 block">Color</label>
                        <div className="grid grid-cols-2 gap-3">
                          {colors.map((c) => (
                            <button key={c} onClick={() => set("color", c)}
                              className={`text-left px-4 py-3 text-xs tracking-[0.1em] border transition-colors ${
                                form.color === c ? "border-bone bg-bone/10 text-bone" : "border-bone/15 text-bone/60 hover:border-bone/40"}`}>
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-1.5 block">Forro / Entretela</label>
                        <input value={form.lining} onChange={(e) => set("lining", e.target.value)} placeholder="Seda, viscosa..."
                          className="w-full bg-transparent border border-bone/20 px-4 py-3 text-sm text-bone outline-none focus:border-bone/60 transition-colors placeholder:text-bone/20" />
                      </div>
                      <div>
                        <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-1.5 block">Bordados / Personalización</label>
                        <textarea value={form.embroidery} onChange={(e) => set("embroidery", e.target.value)} rows={2}
                          className="w-full bg-transparent border border-bone/20 px-4 py-3 text-sm text-bone outline-none focus:border-bone/60 transition-colors placeholder:text-bone/20 resize-none font-serif italic"
                          placeholder="Iniciales, monograma, patrón de bordado..." />
                      </div>
                    </div>
                  )}

                  {/* Step 3: Client */}
                  {s === 3 && (
                    <div className="space-y-5">
                      <p className="text-bone/60 font-serif italic text-lg">Tus datos de contacto</p>
                      {(["clientName", "clientEmail", "clientPhone"] as const).map((k) => (
                        <div key={k}>
                          <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-1.5 block">
                            {k.replace("client", "")}
                          </label>
                          <input type={k === "clientEmail" ? "email" : "text"} value={form[k]}
                            onChange={(e) => set(k, e.target.value)}
                            className="w-full bg-transparent border border-bone/20 px-4 py-3 text-sm text-bone outline-none focus:border-bone/60 transition-colors placeholder:text-bone/20"
                            placeholder={k === "clientEmail" ? "correo@ejemplo.com" : undefined} />
                        </div>
                      ))}
                      <div>
                        <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-1.5 block">Fecha deseada de entrega</label>
                        <input type="date" value={form.deliveryDate} onChange={(e) => set("deliveryDate", e.target.value)}
                          className="w-full bg-transparent border border-bone/20 px-4 py-3 text-sm text-bone outline-none focus:border-bone/60 transition-colors" />
                      </div>
                      <div>
                        <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-1.5 block">Notas adicionales</label>
                        <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={2}
                          className="w-full bg-transparent border border-bone/20 px-4 py-3 text-sm text-bone outline-none focus:border-bone/60 transition-colors placeholder:text-bone/20 resize-none font-serif italic"
                          placeholder="Alergias, plazos, referencias..." />
                      </div>
                    </div>
                  )}

                  {/* Step 4: Review */}
                  {s === 4 && (
                    <div className="space-y-5">
                      <p className="text-bone/60 font-serif italic text-lg">Revisa tu solicitud</p>
                      <div className="space-y-4 border border-bone/10 p-6">
                        <ReviewRow label="Prenda" value={form.garment} />
                        <ReviewRow label="Detalles" value={form.details} />
                        <ReviewRow label="Medidas" value={`Altura: ${form.height} · Contorno: ${form.bust} · Cintura: ${form.waist} · Cadera: ${form.hips}`} />
                        <ReviewRow label="Tejido" value={form.fabric} />
                        <ReviewRow label="Color" value={form.color} />
                        <ReviewRow label="Forro" value={form.lining || "—"} />
                        <ReviewRow label="Bordados" value={form.embroidery || "—"} />
                        <ReviewRow label="Cliente" value={form.clientName} />
                        <ReviewRow label="Email" value={form.clientEmail} />
                        <ReviewRow label="Teléfono" value={form.clientPhone} />
                        <ReviewRow label="Entrega deseada" value={form.deliveryDate || "—"} />
                      </div>
                    </div>
                  )}

                  <button onClick={s < 4 ? nextStep : submit} disabled={!canProceed()}
                    className="btn-fill w-full bg-bone text-ink py-4 text-[11px] tracking-[0.3em] uppercase font-semibold mt-4 transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-clay">
                    {s < 4 ? "Continuar" : "Enviar solicitud"}
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-sm border-b border-bone/5 pb-3 last:border-0">
      <span className="text-[10px] tracking-[0.2em] uppercase text-bone/50">{label}</span>
      <span className="text-right text-bone/80 max-w-[60%]">{value}</span>
    </div>
  );
}
