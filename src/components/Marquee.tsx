import { motion } from "framer-motion";
import { useT, t } from "../i18n";

interface MarqueeProps {
  dark?: boolean;
}

export default function Marquee({ dark = false }: MarqueeProps) {
  const t = useT();
  const items = [
    t("marquee.1"), t("marquee.2"), t("marquee.3"), t("marquee.4"),
    t("marquee.5"), t("marquee.6"),
  ];
  return (
    <section className={`relative overflow-hidden py-5 md:py-6 border-y ${
      dark ? "bg-ink border-bone/10" : "bg-bone border-ink/10"
    }`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <div key={i} className="flex items-center px-8 md:px-14 shrink-0">
            <span className={`font-display text-3xl md:text-6xl tracking-tight ${
              dark ? "text-bone/45" : "text-ink/45"
            }`}>{t}</span>
            <span className="mx-8 md:mx-14 text-clay">✦</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
