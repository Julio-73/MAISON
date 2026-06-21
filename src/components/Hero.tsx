import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { media } from "../config/media";
import { t, subscribe } from "../i18n";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const unsub = subscribe(() => forceUpdate((n) => n + 1));
    return unsub;
  }, []);

  const stats = [
    { n: "37", l: "Años de oficio" },
    { n: "120", l: "Artesanos" },
    { n: "1.2k", l: "Horas / pieza" },
    { n: "100%", l: "Hecho a mano" },
  ];

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden bg-ink text-bone">
      <motion.div style={{ scale, opacity }} className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={media.heroVideoPoster}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={media.heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ y }}
        className="absolute top-32 right-8 md:right-16 z-10 hidden md:block"
      >
        <div className="rotate-90 origin-top-right text-[10px] tracking-[0.5em] uppercase text-bone/60">
          Collection · Automne · 2026
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute top-28 left-6 md:left-12 z-20 flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-bone/60"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-clay opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-clay"></span>
        </span>
        En vivo · Atelier 2026
      </motion.div>

      <motion.div
        style={{ opacity: titleOpacity }}
        className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 min-h-screen flex flex-col justify-end pb-24 md:pb-32 pt-32"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.6 } } }}
          className="max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex items-center gap-4 mb-6 md:mb-8"
          >
            <span className="w-8 md:w-16 h-px bg-bone/60" />
            <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-bone/80">
              {t("hero.subtitle")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
            className="font-display text-[14vw] md:text-[10vw] lg:text-[180px] leading-[0.88] tracking-tight"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease: [0.77, 0, 0.175, 1] }}
            className="mt-10 max-w-xl text-base md:text-lg text-bone/70 leading-relaxed font-serif"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: [0.77, 0, 0.175, 1] }}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <a
              href="#collection"
              className="inline-flex items-center gap-3 bg-bone text-ink px-8 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-clay transition-colors"
              data-cursor-hover
            >
              {t("hero.cta")} <ArrowUpRight size={16} strokeWidth={1.5} />
            </a>
            <a
              href="#looks"
              className="inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-bone border-b border-bone/40 px-2 py-4 hover:border-bone transition-colors"
              data-cursor-hover
            >
              {t("hero.secondary_cta")}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8, ease: [0.77, 0, 0.175, 1] }}
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-3xl"
        >
          {stats.map((s, i) => (
            <div key={i} className="border-t border-bone/20 pt-4">
              <div className="font-display text-3xl md:text-5xl text-bone">{s.n}</div>
              <div className="mt-1 text-[10px] tracking-[0.3em] uppercase text-bone/50">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
