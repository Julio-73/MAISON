import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { media, srcSet } from "../config/media";

const steps = [
  { num: "01", title: "Croquis", subtitle: "Semana 1", desc: "El director artístico interpreta su visión. 8 a 12 croquis preliminares sobre papel algodón.", img: media.pexelsEditorial5 },
  { num: "02", title: "Patronaje", subtitle: "Semana 2-3", desc: "El patrón se construye directamente sobre su cuerpo. Tres pruebas mínimas para ajustar la silueta.", img: media.pexelsEditorial6 },
  { num: "03", title: "Tela", subtitle: "Semana 4", desc: "Selección de textiles en los archivos históricos: sedas de Lyon, encajes de Calais, tweeds de Escocia.", img: media.pexelsEditorial4 },
  { num: "04", title: "Bordado", subtitle: "Semana 5-10", desc: "Hasta 800 horas de bordado a mano en colaboración con Lesage. Cristales, plumas, lentejuelas.", img: media.pexelsEditorial2 },
  { num: "05", title: "Pasarela", subtitle: "Semana 12", desc: "La pieza se presenta en una sesión privada. Ajustes finales. Embalaje en nuestro cofre de lino.", img: media.pexelsRunway1 },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section ref={ref} id="process" className="relative bg-ink text-bone py-32 md:py-48 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20 md:mb-32">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="flex items-center gap-4 mb-6">
            <span className="w-12 h-px bg-clay" />
            <span className="text-[11px] tracking-[0.5em] uppercase text-clay">Del hilo a la pasarela</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }} className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
            Doce semanas.<br /><span className="italic font-light text-clay">Trescientas manos.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, delay: 0.3 }} className="mt-10 text-lg text-bone/70 leading-relaxed font-serif max-w-xl">
            Cada pieza recorre un viaje meticuloso. Le invitamos a descubrir las cinco etapas que separan una idea de un vestido terminado.
          </motion.p>
        </div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-bone/10">
            <motion.div style={{ height: lineHeight }} className="absolute inset-x-0 top-0 bg-clay origin-top" />
          </div>
          <div className="space-y-24 md:space-y-32">
            {steps.map((step, i) => <ProcessStep key={step.num} step={step} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ step, index }: { step: typeof steps[number]; index: number }) {
  const isEven = index % 2 === 0;
  return (
    <motion.div initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-150px" }} transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }} className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-center">
      <div className="absolute left-6 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="w-4 h-4 rounded-full bg-clay ring-4 ring-ink" />
      </div>
      <div className={`pl-16 md:pl-0 ${isEven ? "md:order-1 md:pr-12" : "md:order-2 md:pl-12"}`}>
        <div className="relative overflow-hidden aspect-[4/5] group">
          <motion.div initial={{ scale: 1.3 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0">
            <img src={step.img} alt={step.title} loading="lazy" srcSet={srcSet(step.img)} sizes="(max-width: 768px) 100vw, 40vw" className="zoom-img w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 font-display text-7xl md:text-8xl text-bone/30">{step.num}</div>
        </div>
      </div>
      <div className={`pl-16 md:pl-0 ${isEven ? "md:order-2 md:pl-12" : "md:order-1 md:pr-12 md:text-right"}`}>
        <span className="text-[10px] tracking-[0.4em] uppercase text-clay">{step.subtitle}</span>
        <h3 className="font-display text-5xl md:text-7xl mt-3 leading-none">{step.title}</h3>
        <p className={`mt-6 text-bone/70 leading-relaxed font-serif text-lg max-w-md ${isEven ? "" : "md:ml-auto"}`}>{step.desc}</p>
      </div>
    </motion.div>
  );
}
