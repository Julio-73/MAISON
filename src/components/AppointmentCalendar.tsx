import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Calendar, Clock } from "lucide-react";
import { useAppointmentStore, timeSlots, services, getMinDate, getMaxDate } from "../store/appointmentStore";
import { useT } from "../i18n";

export default function AppointmentCalendar() {
  const t = useT();
  const { form, isOpen, booked, set, toggle, reset, submit } = useAppointmentStore();

  const canBook = form.date && form.time && form.name.length > 2 && form.email.includes("@") && form.phone.length > 5;

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
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[560px] md:max-h-[90vh] bg-ink border border-bone/10 z-[95] flex flex-col shadow-2xl overflow-hidden">

            <div className="flex items-center justify-between p-6 border-b border-bone/10 shrink-0">
              <h2 className="font-display text-xl tracking-[0.2em] text-bone uppercase flex items-center gap-3">
                <Calendar size={18} strokeWidth={1.5} /> {t("appt.title")}
              </h2>
              <button onClick={handleClose} className="p-1 text-bone/60 hover:text-bone transition-colors" aria-label={t("appt.close")}>
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              {booked ? (
                <div className="py-16 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-bone flex items-center justify-center mb-6">
                    <Check size={28} strokeWidth={2.5} className="text-ink" />
                  </div>
                  <h3 className="font-display text-3xl tracking-[0.2em] text-bone uppercase mb-3">{t("appt.confirmed")}</h3>
                  <div className="flex items-center gap-2 text-clay text-sm mb-4">
                    <Calendar size={14} /> {form.date} <Clock size={14} /> {form.time}
                  </div>
                  <p className="font-serif italic text-lg text-bone/60 mb-2">{t("appt.confirmed.msg")}</p>
                  <p className="text-xs text-bone/40 max-w-xs">{t("appt.confirmed.note")}</p>
                  <button onClick={handleClose}
                    className="mt-8 border border-bone/40 px-8 py-3 text-[11px] tracking-[0.3em] uppercase text-bone hover:bg-bone hover:text-ink transition-colors">
                    {t("appt.close")}
                  </button>
                </div>
              ) : (
                <>
                  {/* Service */}
                  <div>
                    <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-3 block">{t("appt.service")}</label>
                    <div className="grid grid-cols-2 gap-2">
                      {services.map((srv, idx) => (
                        <button key={srv} onClick={() => set("service", srv)}
                          className={`text-left px-4 py-3 text-xs tracking-[0.1em] border transition-colors ${
                            form.service === srv ? "border-bone bg-bone/10 text-bone" : "border-bone/15 text-bone/60 hover:border-bone/40"}`}>
{t("appt.srv" + (idx + 1))}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-1.5 block">{t("appt.date")}</label>
                    <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)}
                      min={getMinDate()} max={getMaxDate()}
                      className="w-full bg-transparent border border-bone/20 px-4 py-3 text-sm text-bone outline-none focus:border-bone/60 transition-colors" />
                  </div>

                  {/* Time slots */}
                  {form.date && (
                    <div>
                      <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-3 block">{t("appt.time")}</label>
                      <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map((t) => (
                          <button key={t} onClick={() => set("time", t)}
                            className={`text-center px-2 py-2 text-xs border transition-colors ${
                              form.time === t ? "border-bone bg-bone/10 text-bone" : "border-bone/15 text-bone/60 hover:border-bone/40"}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Client data */}
                  <div className="border-t border-bone/10 pt-6 space-y-5">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-bone/50">{t("appt.your_data")}</p>
                    {(["name", "email", "phone"] as const).map((k) => (
                      <div key={k}>
                        <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-1.5 block">{t(k)}</label>
                        <input type={k === "email" ? "email" : "text"} value={form[k]}
                          onChange={(e) => set(k, e.target.value)}
                          className="w-full bg-transparent border border-bone/20 px-4 py-3 text-sm text-bone outline-none focus:border-bone/60 transition-colors placeholder:text-bone/20"
                          placeholder={k === "email" ? t("checkout.email_placeholder") : undefined} />
                      </div>
                    ))}
                    <div>
                      <label className="text-[9px] tracking-[0.3em] uppercase text-bone/40 mb-1.5 block">{t("appt.notes")}</label>
                      <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={2}
                        className="w-full bg-transparent border border-bone/20 px-4 py-3 text-sm text-bone outline-none focus:border-bone/60 transition-colors placeholder:text-bone/20 resize-none font-serif italic"
                        placeholder={t("appt.notes_placeholder")} />
                    </div>
                  </div>

                  <button onClick={submit} disabled={!canBook}
                    className="btn-fill w-full bg-bone text-ink py-4 text-[11px] tracking-[0.3em] uppercase font-semibold mt-4 transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-clay">
                    {t("appt.confirm")}
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
