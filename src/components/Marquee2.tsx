import { useT } from "../i18n";

const items = [
  "Vogue", "Harper's Bazaar", "Elle", "Le Figaro",
  "Financial Times", "Madame Figaro", "Numero", "L'Officiel",
];

export default function Marquee2() {
  const t = useT();
  return (
    <section className="relative bg-ink text-bone py-10 md:py-14 overflow-hidden border-y border-bone/10">
      <div className="text-center mb-6 text-[10px] tracking-[0.5em] uppercase text-bone/40">
        {t("press.label")}
      </div>
      <div className="flex marquee-track whitespace-nowrap opacity-60">
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <div key={i} className="flex items-center px-8 md:px-14 shrink-0 font-display text-2xl md:text-4xl tracking-tight italic">
            {t}
            <span className="mx-8 md:mx-14 text-clay">·</span>
          </div>
        ))}
      </div>
    </section>
  );
}
