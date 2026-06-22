import { motion } from "framer-motion";
import { useT, t } from "../i18n";

export default function Testimonials() {
  const t = useT();
  const testimonials = [
    { quote: t("testimonials.q1"), author: t("testimonials.author1"), role: t("testimonials.role1") },
    { quote: t("testimonials.q2"), author: t("testimonials.author2"), role: t("testimonials.role2") },
    { quote: t("testimonials.q3"), author: t("testimonials.author3"), role: t("testimonials.role3") },
  ];
  return (
    <section id="testimonials" className="bg-ink text-bone py-32 md:py-48 border-t border-bone/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex items-center gap-4 mb-6">
              <span className="w-12 h-px bg-clay" />
              <span className="text-[11px] tracking-[0.5em] uppercase text-clay">{t("testimonials.label")}</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
              {t("testimonials.heading1")}<br /><span className="italic font-light text-clay">{t("testimonials.heading2")}</span>
            </motion.h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="border border-bone/15 p-8 md:p-10 flex flex-col justify-between hover:border-clay/50 transition-colors duration-500"
            >
              <p className="font-serif italic text-lg md:text-xl text-bone/85 leading-relaxed">
                "{t.quote}"
              </p>
              <div className="mt-10 pt-6 border-t border-bone/10">
                <div className="font-display text-xl text-bone">{t.author}</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-clay mt-1">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
