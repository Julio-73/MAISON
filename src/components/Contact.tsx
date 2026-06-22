import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useT } from "../i18n";

export default function Contact() {
  const t = useT();
  const [formData, setFormData] = useState({ name: "", email: "", showroom: "Paris", notes: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSent(true);
    }
  };

  return (
    <section id="contact" className="bg-ink text-bone py-36 md:py-56">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex items-center gap-4 mb-6">
              <span className="w-12 h-px bg-clay" />
              <span className="text-[11px] tracking-[0.5em] uppercase text-clay">{t("contact.label")}</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8">
              {t("contact.heading1")}<br /><span className="italic font-light text-clay">{t("contact.heading2")}</span>
            </motion.h2>
            <p className="max-w-md text-bone/60 leading-relaxed font-serif text-lg">
              {t("contact.desc")}
            </p>
          </div>

          <div className="border border-bone/15 p-8 md:p-12 bg-bone/5">
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-bone/50 mb-2">{t("contact.name")}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-bone/20 focus:border-clay outline-none py-2 text-sm tracking-[0.1em] transition-colors"
                    data-cursor-hover
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-bone/50 mb-2">{t("contact.email")}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-bone/20 focus:border-clay outline-none py-2 text-sm tracking-[0.1em] transition-colors"
                    data-cursor-hover
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-bone/50 mb-2">{t("contact.showroom")}</label>
                  <select
                    value={formData.showroom}
                    onChange={(e) => setFormData({ ...formData, showroom: e.target.value })}
                    className="w-full bg-transparent border-b border-bone/20 focus:border-clay outline-none py-2 text-sm tracking-[0.1em] transition-colors appearance-none cursor-pointer"
                    data-cursor-hover
                  >
                    <option value="Paris" className="bg-ink text-bone">{t("contact.opt1")}</option>
                    <option value="Milano" className="bg-ink text-bone">{t("contact.opt2")}</option>
                    <option value="Tokyo" className="bg-ink text-bone">{t("contact.opt3")}</option>
                    <option value="New York" className="bg-ink text-bone">{t("contact.opt4")}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-bone/50 mb-2">{t("contact.notes")}</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-transparent border-b border-bone/20 focus:border-clay outline-none py-2 text-sm tracking-[0.1em] transition-colors resize-none"
                    placeholder={t("contact.notes_placeholder")}
                    data-cursor-hover
                  />
                </div>
                <button
                  type="submit"
                  className="btn-fill w-full inline-flex items-center justify-center gap-3 bg-bone text-ink px-8 py-4 text-[11px] tracking-[0.3em] uppercase transition-colors"
                  data-cursor-hover
                >
                  {t("contact.submit")} <ArrowUpRight size={16} />
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="text-clay text-5xl mb-6">✦</div>
                <h3 className="font-display text-3xl mb-4">{t("contact.sent_title")}</h3>
                <p className="font-serif italic text-bone/70 max-w-sm mx-auto">
                  {t("contact.sent_body_prefix")} {formData.name}. {t("contact.sent_body_suffix")} {formData.showroom}. {t("contact.sent_body_end")}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
