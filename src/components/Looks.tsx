import { motion } from "framer-motion";
import { useState } from "react";
import { media } from "../config/media";
import DistortedImage from "./DistortedImage";

const looks = [
  { img: media.look1, title: "Noir Silhouette", code: "L·01" },
  { img: media.look2, title: "Rouge Mémoire", code: "L·02" },
  { img: media.look3, title: "Beige Construit", code: "L·03" },
  { img: media.look4, title: "Cuir Sculpté", code: "L·04" },
];

export default function Looks() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="looks" className="bg-ink text-bone py-32 md:py-48">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-24">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="flex items-center gap-4 mb-6">
              <span className="w-12 h-px bg-clay" />
              <span className="text-[11px] tracking-[0.5em] uppercase text-clay">La Campaña</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }} className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
              Mirada<br /><span className="italic font-light text-clay">de autor.</span>
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, delay: 0.3 }} className="max-w-sm text-bone/60 leading-relaxed font-serif text-lg">
            Cuatro imágenes. Cuatro formas de habitar la elegancia. Fotografía de Claire Fontaine · París, 2026.
          </motion.p>
        </div>

        <div className="grid grid-cols-12 gap-8 md:gap-12 pb-12">
          {looks.map((l, i) => (
            <motion.div
              key={l.code}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: i * 0.1, ease: [0.77, 0, 0.175, 1] }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className={`relative overflow-hidden group cursor-pointer border border-bone/10 p-2 bg-bone/[0.01] hover:border-clay/40 transition-colors duration-700 ${
                i === 0 ? "col-span-12 md:col-span-7 aspect-[4/3]" :
                i === 1 ? "col-span-12 md:col-span-5 aspect-[4/5] md:translate-y-16" :
                i === 2 ? "col-span-12 md:col-span-5 aspect-[4/5]" :
                "col-span-12 md:col-span-7 aspect-[4/3] md:-translate-y-16"
              }`}
              data-cursor-hover
            >
              <div className="relative w-full h-full overflow-hidden">
                <DistortedImage src={l.img} alt={l.title} className="zoom-img absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className={`absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent transition-opacity duration-700 ${active === i ? "opacity-100" : "opacity-60"}`} />
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
                <div className="flex items-start justify-between text-bone mix-blend-difference">
                  <span className="text-[10px] tracking-[0.4em] uppercase opacity-80">{l.code}</span>
                  <span className={`w-10 h-10 rounded-full border border-bone/40 flex items-center justify-center text-xs transition-all duration-500 ${active === i ? "bg-bone text-ink rotate-45 border-bone" : "text-bone"}`}>↗</span>
                </div>
                <div className="text-bone mix-blend-difference">
                  <div className="font-display text-3xl md:text-5xl leading-tight">{l.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
