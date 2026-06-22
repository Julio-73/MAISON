import { motion } from "framer-motion";
import { useT, t } from "../i18n";

export default function Manifesto() {
  const t = useT();
  const quotes = [
    { text: t("manifesto.q1"), author: "Gabrielle" },
    { text: t("manifesto.q2"), author: "Coco" },
    { text: t("manifesto.q3"), author: "Cristóbal" },
  ];
  return (
    <section id="manifesto" className="relative bg-ink text-bone py-32 md:py-48 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 0.05, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 2 }} className="font-display text-[20vw] md:text-[15vw] leading-none whitespace-nowrap text-bone">
          MAISON
        </motion.div>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="flex items-center justify-center gap-4 mb-16">
          <span className="w-12 h-px bg-clay" />
          <span className="text-[11px] tracking-[0.5em] uppercase text-clay">{t("manifesto.label")}</span>
          <span className="w-12 h-px bg-clay" />
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }} className="font-display text-4xl md:text-6xl lg:text-7xl text-center leading-tight">
          {t("manifesto.heading")}
        </motion.h2>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, delay: 0.4 }} className="mt-20 grid md:grid-cols-3 gap-10">
          {quotes.map((q, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }} className="border-t border-bone/20 pt-6">
              <p className="font-serif italic text-xl md:text-2xl text-bone/80 leading-snug">"{q.text}"</p>
              <p className="mt-4 text-[10px] tracking-[0.4em] uppercase text-clay">— {q.author}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
