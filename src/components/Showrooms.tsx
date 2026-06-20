import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const showrooms = [
  { city: "Paris", country: "France", address: "12 Rue de Sévigné, 75004", flag: "🇫🇷", hours: "Mar–Sam · 11h–19h" },
  { city: "Milano", country: "Italia", address: "Via della Spiga 27, 20121", flag: "🇮🇹", hours: "Mar–Sab · 10h–19h" },
  { city: "Tokyo", country: "日本", address: "Aoyama 5-6-23, Minato", flag: "🇯🇵", hours: "火–土 · 11時–20時" },
  { city: "New York", country: "USA", address: "688 Madison Avenue, 10065", flag: "🇺🇸", hours: "Mon–Sat · 10am–7pm" },
];

export default function Showrooms() {
  return (
    <section id="showrooms" className="bg-ink text-bone py-32 md:py-48 border-t border-bone/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex items-center gap-4 mb-6">
              <span className="w-12 h-px bg-clay" />
              <span className="text-[11px] tracking-[0.5em] uppercase text-clay">Boutiques</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
              Cuatro ciudades.<br /><span className="italic font-light text-clay">Una sola exigencia.</span>
            </motion.h2>
          </div>
          <p className="max-w-md text-bone/60 leading-relaxed font-serif">Reservamos citas privadas exclusivamente. Cada visita incluye una copa de champagne y acceso a las últimas piezas aún no publicadas.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-bone/10">
          {showrooms.map((s, i) => (
            <motion.div key={s.city} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }} className="group bg-ink p-8 md:p-10 hover:bg-bone hover:text-ink transition-colors duration-700" data-cursor-hover>
              <div className="text-4xl mb-6">{s.flag}</div>
              <div className="font-display text-3xl md:text-4xl">{s.city}</div>
              <div className="text-[10px] tracking-[0.3em] uppercase opacity-60 mt-1">{s.country}</div>
              <div className="mt-8 flex items-start gap-2 text-sm font-serif">
                <MapPin size={14} strokeWidth={1.4} className="mt-1 shrink-0 opacity-60" />
                <span>{s.address}</span>
              </div>
              <div className="mt-3 text-xs opacity-60 font-serif">{s.hours}</div>
              <div className="mt-8 pt-6 border-t border-current/15 flex items-center justify-between">
                <span className="text-[10px] tracking-[0.3em] uppercase opacity-60">Reservar</span>
                <span className="text-xl transition-transform duration-500 group-hover:rotate-45">↗</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
