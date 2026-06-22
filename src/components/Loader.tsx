import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useT } from "../i18n";

export default function Loader() {
  const t = useT();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 500);
          return 100;
        }
        return p + Math.random() * 12 + 4;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] } }}
          className="fixed inset-0 z-[200] bg-ink flex items-center justify-center"
        >
          <div className="text-center px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="font-display text-3xl md:text-5xl tracking-[0.3em] text-bone">
              MAISON
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }} className="mt-12 flex items-center gap-6 justify-center">
              <div className="w-16 md:w-24 h-px bg-bone/20 relative overflow-hidden">
                <motion.div className="absolute inset-y-0 left-0 bg-clay" style={{ width: `${Math.min(progress, 100)}%` }} />
              </div>
              <span className="text-[10px] tracking-[0.4em] uppercase text-clay w-12 text-left">
                {Math.min(100, Math.floor(progress))}%
              </span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 0.6, duration: 1 }} className="mt-6 text-[10px] tracking-[0.4em] uppercase text-bone/50">
              {t("loader.subtitle")}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
