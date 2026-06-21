import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { media } from "../config/media";
import { useCartStore } from "../store/cartStore";

const collections = [
  {
    id: "c1", num: "01", title: "Lumière", subtitle: "Colección Otoño", price: 3400,
    img: media.collection1,
    desc: "Una oda a la luz dorada del otoño parisino. Sedas crudas, lanas vírgenes y bordados a mano que respiran calma y sofisticación.",
    tags: ["12 piezas", "Edición limitada"],
  },
  {
    id: "c2", num: "02", title: "Écho", subtitle: "Atelier Privé", price: 4200,
    img: media.collection2,
    desc: "Texturas esculpidas, pliegues arquitectónicos. Una colección que explora el silencio entre las formas y la piel.",
    tags: ["8 piezas únicas", "Hecho a medida"],
  },
  {
    id: "c3", num: "03", title: "Nuit", subtitle: "Gala · Couture", price: 5800,
    img: media.collection3,
    desc: "La noche como escenario. Negros profundos, lentejuelas tejidas a mano y volúmenes que desafían la gravedad.",
    tags: ["6 piezas", "Pasarela exclusiva"],
  },
];

export default function Collection() {
  return (
    <section id="collection" className="bg-ink text-bone py-32 md:py-48">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-24 md:mb-32">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="flex items-center gap-4 mb-6">
              <span className="w-12 h-px bg-clay" />
              <span className="text-[11px] tracking-[0.5em] uppercase text-clay">Las Colecciones</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }} className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
              Tres capítulos<br /><span className="italic font-light text-clay">de una misma historia</span>
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, delay: 0.3 }} className="max-w-md text-bone/60 leading-relaxed font-serif text-lg">
            Cada colección nace de un archivo, de una emoción, de un viaje. Piezas únicas que trascienden la temporada.
          </motion.p>
        </div>

        <div className="space-y-32 md:space-y-48">
          {collections.map((c, i) => <CollectionItem key={c.num} item={c} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function CollectionItem({ item, index }: { item: typeof collections[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const textX = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -120 : 120, index % 2 === 0 ? 120 : -120]);
  const isEven = index % 2 === 0;
  const addItem = useCartStore((state) => state.addItem);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2 }}
      className="relative grid md:grid-cols-12 gap-8 md:gap-16 items-center py-12 md:py-20 border-b border-bone/5 last:border-b-0"
    >
      {/* Parallax Background Text */}
      <motion.div
        style={{ x: textX }}
        className="absolute bottom-4 left-0 right-0 pointer-events-none select-none font-display text-[15vw] leading-none uppercase text-transparent bg-clip-text text-stroke opacity-5 tracking-[0.2em] whitespace-nowrap"
      >
        {item.title}
      </motion.div>

      {/* Image Column */}
      <motion.div
        style={{ y }}
        className={`md:col-span-7 ${isEven ? "md:order-1" : "md:order-2"} relative overflow-hidden aspect-[4/5] md:aspect-[5/6] border border-bone/10 p-2 bg-bone/[0.02]`}
      >
        <div className="relative w-full h-full overflow-hidden">
          <img src={item.img} alt={item.title} loading="lazy" className="zoom-img w-full h-full object-cover" />
        </div>
        <div className="absolute top-6 left-6 text-bone mix-blend-difference">
          <div className="font-display text-6xl md:text-8xl opacity-40">{item.num}</div>
        </div>
      </motion.div>

      {/* Description Column */}
      <div className={`md:col-span-5 ${isEven ? "md:order-2 md:pl-10" : "md:order-1 md:pr-10"} relative z-10`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
        >
          <span className="text-[11px] tracking-[0.5em] uppercase text-clay">{item.subtitle}</span>
          <h3 className="font-display text-5xl md:text-7xl mt-4 leading-none">{item.title}</h3>
          
          <div className="w-12 h-px bg-clay/50 my-6" />

          <p className="text-bone/70 leading-relaxed font-serif text-lg max-w-md">{item.desc}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <span key={t} className="text-[10px] tracking-[0.3em] uppercase border border-bone/15 px-4 py-2 rounded-full text-bone/60 bg-bone/[0.01]">{t}</span>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <button
              onClick={() => addItem({ id: item.id, name: item.title, price: item.price, image: item.img })}
              className="btn-fill inline-flex items-center gap-3 bg-bone text-ink px-8 py-4 text-[11px] tracking-[0.3em] uppercase transition-colors"
              data-cursor-hover
            >
              Añadir a la bolsa
            </button>
            <a href="#contact" className="inline-flex items-center gap-4 text-[11px] tracking-[0.3em] uppercase text-bone group" data-cursor-hover>
              <span className="link-line">Explorar colección</span>
              <span className="w-8 h-px bg-bone group-hover:w-16 transition-all duration-500" />
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
