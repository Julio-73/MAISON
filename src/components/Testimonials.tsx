import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Maison no solo diseña vestidos, esculpe identidades. Una experiencia de alta costura inigualable en la era del fast fashion.",
    author: "Vogue España",
    role: "Editorial de Moda",
  },
  {
    quote: "El abrigo Écho que encargué es una obra de arte. El nivel de detalle en el forro de seda y los acabados a mano justifica cada segundo de espera.",
    author: "Elena R.",
    role: "Clienta Privada · Milán",
  },
  {
    quote: "Una visión singular que fusiona la tradición artesanal francesa con líneas arquitectónicas modernas. Absolutamente sublime.",
    author: "Le Figaro",
    role: "Crítica de Alta Costura",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-ink text-bone py-32 md:py-48 border-t border-bone/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex items-center gap-4 mb-6">
              <span className="w-12 h-px bg-clay" />
              <span className="text-[11px] tracking-[0.5em] uppercase text-clay">Testimonios</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
              La opinión<br /><span className="italic font-light text-clay">de nuestro círculo.</span>
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
