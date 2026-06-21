import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useCurrency, currencies } from "../../store/currencyStore";

export default function CurrencySelector() {
  const [open, setOpen] = useState(false);
  const current = useCurrency((s) => s.current);
  const setCurrency = useCurrency((s) => s.setCurrency);

  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-bone/60 hover:text-bone transition-colors text-[11px] tracking-[0.15em]"
        data-cursor-hover>
        <span>{current.symbol}</span>
        <span>{current.code}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-7 right-0 bg-ink border border-bone/10 py-1.5 min-w-[90px] shadow-xl z-50">
            {currencies.map((c) => (
              <button key={c.code} onClick={() => { setCurrency(c.code); setOpen(false); }}
                className={`w-full text-left px-4 py-2 text-[11px] tracking-[0.15em] transition-colors ${current.code === c.code ? "text-clay" : "text-bone/60 hover:text-bone"}`}>
                {c.symbol} {c.code}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}