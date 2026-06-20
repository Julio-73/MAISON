const items = [
  "Atelier Paris", "Hand Crafted", "Made in France", "Haute Couture",
  "Since 1987", "Slow Fashion", "Bespoke Tailoring", "Couture · 2026",
];

export default function Marquee() {
  return (
    <section className="relative bg-bone text-ink py-6 md:py-8 overflow-hidden border-y border-ink/10">
      <div className="flex marquee-track whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <div key={i} className="flex items-center px-8 md:px-14 shrink-0">
            <span className="font-display text-3xl md:text-6xl tracking-tight">{t}</span>
            <span className="mx-8 md:mx-14 text-clay">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}
