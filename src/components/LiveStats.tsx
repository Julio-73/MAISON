import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Globe, Sparkles, Users, Award } from "lucide-react";

interface Stat {
  Icon: typeof Globe;
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

const stats: Stat[] = [
  { Icon: Users, value: 2847, suffix: "", label: "Clientes privados" },
  { Icon: Sparkles, value: 18420, suffix: "", label: "Piezas entregadas" },
  { Icon: Globe, value: 23, suffix: "", label: "Países servidos" },
  { Icon: Award, value: 47, suffix: "", label: "Premios internacionales" },
];

function Counter({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 2.4, ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        if (ref.current) {
          ref.current.textContent = decimals > 0 ? v.toFixed(decimals) : Math.floor(v).toLocaleString();
        }
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals]);

  return <span ref={ref}>0</span>;
}

export default function LiveStats() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const parisTime = now.toLocaleTimeString("es-ES", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" });

  return (
    <section className="relative bg-bone text-ink py-20 md:py-28 border-y border-ink/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-clay opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-clay"></span>
              </span>
              <span className="text-[10px] tracking-[0.4em] uppercase text-clay">En vivo · Maison</span>
            </motion.div>
            <motion.h3 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="font-display text-3xl md:text-5xl leading-tight">
              Lo que hacemos,<br /><span className="italic text-clay">medido en tiempo real.</span>
            </motion.h3>
          </div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-ink/50 flex items-center gap-3">
            <span className="w-8 h-px bg-clay" />
            París · {parisTime}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }} className="border-t border-ink/20 pt-5">
              <s.Icon size={18} strokeWidth={1.2} className="text-clay mb-4" />
              <div className="font-display text-4xl md:text-6xl text-ink">
                <Counter value={s.value} decimals={s.decimals} />
                {s.suffix}
              </div>
              <div className="mt-2 text-[10px] tracking-[0.3em] uppercase text-ink/60">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
