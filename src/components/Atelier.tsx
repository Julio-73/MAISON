import { motion } from "framer-motion";

const stats = [
  { n: "1.200", l: "Horas por pieza" },
  { n: "100%", l: "Hecho a mano" },
  { n: "37", l: "Años de oficio" },
  { n: "23", l: "Países servidos" },
];

const pillars = [
  { title: "Patronaje", desc: "Cada molde se construye sobre maniquí individual. La tela se corta a ojo, a mano, con tijeras de sastre heredadas." },
  { title: "Bordado", desc: "Lesage, Lemarié y nuestro propio atelier colaboran en bordados que requieren hasta 800 horas por pieza." },
  { title: "Sastrería", desc: "Sastres de quinta generación terminan cada costura a mano. La pajarita final nunca se cose: se ata." },
];

export default function Atelier() {
  return (
    <section id="atelier" className="relative bg-bone text-ink py-32 md:py-48 overflow-hidden border-t border-ink/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          <div className="lg:sticky lg:top-32">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="flex items-center gap-4 mb-6">
              <span className="w-12 h-px bg-clay" />
              <span className="text-[11px] tracking-[0.5em] uppercase text-clay">L'Atelier</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }} className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
              Donde el<br />tiempo<br /><span className="italic font-light text-clay">se cose a mano.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, delay: 0.3 }} className="mt-10 text-lg md:text-xl text-ink/70 leading-relaxed font-serif max-w-md">
              En el corazón del Marais, nuestro atelier preserva las técnicas que la industria olvidó. Aquí, cada prenda recorre entre 40 y 120 horas de trabajo humano.
            </motion.p>
            <div className="mt-16 grid grid-cols-2 gap-8">
              {stats.map((s, i) => (
                <motion.div key={s.l} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.1 * i }} className="border-t border-ink/20 pt-4">
                  <div className="font-display text-4xl md:text-5xl text-ink">{s.n}</div>
                  <div className="mt-1 text-[10px] tracking-[0.3em] uppercase text-ink/60">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {pillars.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, delay: i * 0.15 }} className="group relative border-t border-ink/20 py-10 md:py-14" data-cursor-hover>
                <div className="flex items-start justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-6">
                      <span className="font-display text-2xl text-clay">0{i + 1}</span>
                      <h3 className="font-display text-3xl md:text-5xl">{p.title}</h3>
                    </div>
                    <p className="mt-6 ml-14 text-ink/70 leading-relaxed font-serif max-w-md">{p.desc}</p>
                  </div>
                  <div className="hidden md:block text-clay opacity-0 group-hover:opacity-100 transition-opacity duration-700">→</div>
                </div>
                <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.2 + i * 0.1 }} className="absolute left-0 right-0 bottom-0 h-px bg-clay origin-left" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
