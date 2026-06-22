import { motion, AnimatePresence } from "framer-motion";
import { Check, Info, X } from "lucide-react";
import { useToastStore } from "../store/toastStore";

export default function ToastContainer() {
  const { toasts, remove } = useToastStore();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] flex flex-col items-center gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.77, 0, 0.175, 1] }}
            className="pointer-events-auto flex items-center gap-3 bg-bone text-ink px-5 py-3 shadow-xl border border-ink/10 min-w-[220px]"
          >
            {t.type === "success" ? (
              <Check size={16} strokeWidth={2.5} className="text-clay shrink-0" />
            ) : (
              <Info size={16} strokeWidth={2.5} className="text-clay shrink-0" />
            )}
            <span className="text-[11px] tracking-[0.15em] uppercase font-medium">{t.message}</span>
            <button onClick={() => remove(t.id)} className="ml-auto text-ink/30 hover:text-ink transition-colors p-0.5">
              <X size={14} strokeWidth={1.5} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
