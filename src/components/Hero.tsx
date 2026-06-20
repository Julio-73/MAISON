import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { media } from "../config/media";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden bg-ink text-bone">
      <motion.div style={{ scale, opacity }} className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline preload="auto" poster={media.heroVideoPoster} className="absolute inset-0 w-full h-full object-cover">
          <source src="https://videos.pexels.com/video-files/9512046/9512046-hd_1280_720_25fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/9512046/9512046-hd_1920_1080_25fps.mp4" type="video/mp4" />
          <source src={media.heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
      </motion.div>

      <motion.div style={{ y }} className="absolute top-32 right-8 md:right-16 z-10 hidden md:block">
        <div className="rotate-90 origin-top-right text-[10px] tracking-[0.5em] uppercase text-bone/60">
          Collection · Automne · 2026
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 1 }} className="absolute top-28 left-6 md:left-12 z-20 flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-bone/60">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-clay opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-clay"></span>
        </span>
        En vivo · Atelier 2026
      </motion.div>

      <motion.div style={{ opacity: titleOpacity }} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 min-h-screen flex flex-col justify-end pb-24 md:pb-32 pt-32">
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.8 } } }} className="max-w-5xl">
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }} className="flex items-center gap-4 mb-8">
            <span className="w-12 h-px bg-clay" />
            <span className="text-[11px] tracking-[0.5em] uppercase text-clay">Haute Couture · Atelier Paris</span>
          </motion.div>

          <h1 className="font-display text-[14vw] md:text-[10vw] lg:text-[180px] leading-[0.88] tracking-tight">
            <span className="block overflow-hidden">
              <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.2, delay: 1, ease: [0.77, 0, 0.175, 1] }} className="block italic font-light">
                Elegancia
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.2, delay: 1.15, ease: [0.77, 0, 0.175, 1] }} className="block">
                Atemporal
              </motion.span>
            </span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.5, ease: [0.77, 0, 0.175, 1] }} className="mt-10 max-w-xl text-base md:text-lg text-bone/70 leading-relaxed font-serif">
            Donde la tradición se encuentra con la vanguardia. Cada pieza es esculpida a mano en nuestro atelier parisino, un diálogo silencioso entre el hilo, la forma y el alma.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.7, ease: [0.77, 0, 0.175, 1] }} className="mt-12 flex flex-wrap items-center gap-4">
            <a href="#collection" className="btn-fill inline-flex items-center gap-3 bg-bone text-ink px-8 py-4 text-[11px] tracking-[0.3em] uppercase transition-colors" data-cursor-hover>
              Descubrir <ArrowUpRight size={16} strokeWidth={1.5} />
            </a>
            <a href="#looks" className="link-line inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-bone px-2 py-4" data-cursor-hover>
              Ver Campaña
            </a>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 2, ease: [0.77, 0, 0.175, 1] }} className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-3xl">
          {[
            { n: "37", l: "Años de oficio" },
            { n: "120", l: "Artesanos" },
            { n: "1.2k", l: "Horas / pieza" },
            { n: "100%", l: "Hecho a mano" },
          ].map((s, i) => (
            <div key={i} className="border-t border-bone/20 pt-4">
              <div className="font-display text-3xl md:text-5xl text-bone">{s.n}</div>
              <div className="mt-1 text-[10px] tracking-[0.3em] uppercase text-bone/50">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.4em] uppercase text-bone/50">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown size={16} strokeWidth={1.2} className="text-bone/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
