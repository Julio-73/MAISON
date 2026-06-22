import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, Check, Ruler, Shirt, Palette, User, ClipboardList } from "lucide-react";
import { useMTMStore, mtmSteps } from "../store/madeToMeasureStore";
import { useT, t } from "../i18n";

const icons = [Shirt, Ruler, Palette, User, ClipboardList];

export default function MadeToMeasure() {
  const t = useT();
  const garments = [
    t("mtm.garment1"), t("mtm.garment2"), t("mtm.garment3"), t("mtm.garment4"), t("mtm.garment5"), t("mtm.garment6"), t("mtm.garment7"), t("mtm.garment8"),
  ];
  const fabrics = [
    t("mtm.fabric1"), t("mtm.fabric2"), t("mtm.fabric3"), t("mtm.fabric4"), t("mtm.fabric5"), t("mtm.fabric6"), t("mtm.fabric7"), t("mtm.fabric8"),
  ];
  const colors = [
    t("mtm.color1"), t("mtm.color2"), t("mtm.color3"), t("mtm.color4"), t("mtm.color5"), t("mtm.color6"), t("mtm.color7"), t("mtm.color8"),
  ];
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
                <h2 className="font-display text-xl tracking-[0.2em] text-bone uppercase">{t("mtm.title")}</h2>
              </div>
              <button onClick={handleClose} className="p-1 text-bone/60 hover:text-bone transition-colors" aria-label={t("mtm.close")}>
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
                  <h3 className="font-display text-3xl tracking-[0.2em] text-bone uppercase mb-3">{t("mtm.sent")}</h3>
                  <p className="font-serif italic text-lg text-bone/60 mb-2">{t("mtm.sent.msg")}</p>
                  <p className="text-xs text-bone/40 max-w-xs">{t("mtm.sent.note")}</p>
                  <button onClick={handleClose}
                    className="mt-8 border border-bone/40 px-8 py-3 text-[11px] tracking-[0.3em] uppercase text-bone hover:bg-bone hover:text-ink transition-colors">
                    {t("mtm.close")}
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4 pb-2">
                    <Icon size={18} strokeWidth={1.5} className="text-clay" />
                    <span className="text-[10px] tracking-[0.3em] uppercase text-clay">{t("mtm.step" + (s + 1))}</span>
                  </div>

                  {/* Step 0: Garment */}
                  {s === 0 && (
                    <div className="space-y-5">
                      <p className="text-bone/60 font-serif italic text-lg">{t("mtm.garment_heading")}</p>
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
                        <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-1.5 block">{t("mtm.details")}</label>
                        <textarea value={form.details} onChange={(e) => set("details", e.target.value)} rows={3}
                          className="w-full bg-transparent border border-bone/20 px-4 py-3 text-sm text-bone outline-none focus:border-bone/60 transition-colors placeholder:text-bone/20 resize-none font-serif italic"
                          placeholder={t("mtm.details_placeholder")} />
                      </div>
                    </div>
                  )}

                  {/* Step 1: Measurements */}
                  {s === 1 && (
                    <div className="space-y-5">
                      <p className="text-bone/60 font-serif italic text-lg">{t("mtm.measure_heading")}</p>
                      <div className="grid grid-cols-2 gap-4">
                        {(["height", "bust", "waist", "hips", "inseam", "shoulder", "sleeve"] as const).map((k) => (
                          <div key={k}>
                            <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-1.5 block">{t("mtm." + k)}</label>
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
                        <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-3 block">{t("mtm.fabric_heading")}</label>
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
                        <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-3 block">{t("mtm.color_heading")}</label>
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
                        <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-1.5 block">{t("mtm.lining")}</label>
                        <input value={form.lining} onChange={(e) => set("lining", e.target.value)} placeholder={t("mtm.lining_placeholder")}
                          className="w-full bg-transparent border border-bone/20 px-4 py-3 text-sm text-bone outline-none focus:border-bone/60 transition-colors placeholder:text-bone/20" />
                      </div>
                      <div>
                        <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-1.5 block">{t("mtm.embroidery")}</label>
                        <textarea value={form.embroidery} onChange={(e) => set("embroidery", e.target.value)} rows={2}
                          className="w-full bg-transparent border border-bone/20 px-4 py-3 text-sm text-bone outline-none focus:border-bone/60 transition-colors placeholder:text-bone/20 resize-none font-serif italic"
                          placeholder={t("mtm.embroidery_placeholder")} />
                      </div>
                    </div>
                  )}

                  {/* Step 3: Client */}
                  {s === 3 && (
                    <div className="space-y-5">
                      <p className="text-bone/60 font-serif italic text-lg">{t("mtm.client_heading")}</p>
                      {(["clientName", "clientEmail", "clientPhone"] as const).map((k) => {
                        const labels: Record<string, string> = { clientName: t("mtm.review_client"), clientEmail: t("mtm.review_email"), clientPhone: t("mtm.review_phone") };
                        return (
                        <div key={k}>
                          <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-1.5 block">{labels[k]}</label>
                          <input type={k === "clientEmail" ? "email" : "text"} value={form[k]}
                            onChange={(e) => set(k, e.target.value)}
                            className="w-full bg-transparent border border-bone/20 px-4 py-3 text-sm text-bone outline-none focus:border-bone/60 transition-colors placeholder:text-bone/20"
                            placeholder={k === "clientEmail" ? t("checkout.email_placeholder") : undefined} />
                        </div>
                      ); })}
                      <div>
                        <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-1.5 block">{t("mtm.delivery")}</label>
                        <input type="date" value={form.deliveryDate} onChange={(e) => set("deliveryDate", e.target.value)}
                          className="w-full bg-transparent border border-bone/20 px-4 py-3 text-sm text-bone outline-none focus:border-bone/60 transition-colors" />
                      </div>
                      <div>
                        <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-1.5 block">{t("mtm.notes")}</label>
                        <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={2}
                          className="w-full bg-transparent border border-bone/20 px-4 py-3 text-sm text-bone outline-none focus:border-bone/60 transition-colors placeholder:text-bone/20 resize-none font-serif italic"
                          placeholder={t("mtm.notes_placeholder")} />
                      </div>
                    </div>
                  )}

                  {/* Step 4: Review */}
                  {s === 4 && (
                    <div className="space-y-5">
                      <p className="text-bone/60 font-serif italic text-lg">{t("mtm.review_heading")}</p>
                      <div className="space-y-4 border border-bone/10 p-6">
                        <ReviewRow label={t("mtm.review_garment")} value={form.garment} />
                        <ReviewRow label={t("mtm.review_details")} value={form.details} />
                        <ReviewRow label={t("mtm.review_measurements")} value={`${t("mtm.height")}: ${form.height} · ${t("mtm.bust")}: ${form.bust} · ${t("mtm.waist")}: ${form.waist} · ${t("mtm.hips")}: ${form.hips}`} />
                        <ReviewRow label={t("mtm.review_fabric")} value={form.fabric} />
                        <ReviewRow label={t("mtm.review_color")} value={form.color} />
                        <ReviewRow label={t("mtm.review_lining")} value={form.lining || "—"} />
                        <ReviewRow label={t("mtm.review_embroidery")} value={form.embroidery || "—"} />
                        <ReviewRow label={t("mtm.review_client")} value={form.clientName} />
                        <ReviewRow label={t("mtm.review_email")} value={form.clientEmail} />
                        <ReviewRow label={t("mtm.review_phone")} value={form.clientPhone} />
                        <ReviewRow label={t("mtm.review_delivery")} value={form.deliveryDate || "—"} />
                      </div>
                    </div>
                  )}

                  <button onClick={s < 4 ? nextStep : submit} disabled={!canProceed()}
                    className="btn-fill w-full bg-bone text-ink py-4 text-[11px] tracking-[0.3em] uppercase font-semibold mt-4 transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-clay">
                    {s < 4 ? t("mtm.continue") : t("mtm.submit")}
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
