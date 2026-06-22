import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useT } from "../i18n";

export default function Newsletter() {
  const t = useT();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setLoading(true);
      // Simulating a CRM API request (e.g., Mailchimp, Klaviyo)
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <section className="bg-bone text-ink py-32 md:py-44 border-y border-ink/10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[11px] tracking-[0.5em] uppercase text-clay block mb-6">{t("newsletter.label")}</span>
          <h2 className="font-display text-4xl md:text-6xl mb-8">
            {t("newsletter.heading1")} <span className="italic">{t("newsletter.heading2")}</span>
          </h2>
          <p className="max-w-xl mx-auto text-ink/75 leading-relaxed font-serif text-lg mb-12">
            {t("newsletter.desc")}
          </p>
        </motion.div>

        {!submitted ? (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("newsletter.placeholder")}
              aria-label={t("newsletter.aria")}
              required
              className="w-full bg-transparent border-b border-ink/30 focus:border-clay outline-none py-3 text-sm tracking-[0.1em] placeholder-ink/40"
              data-cursor-hover
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-fill w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-ink text-bone px-8 py-4 text-[10px] tracking-[0.3em] uppercase transition-colors shrink-0 disabled:opacity-70 disabled:cursor-wait"
              data-cursor-hover
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <>{t("newsletter.submit")} <ArrowRight size={14} /></>}
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-clay font-display text-2xl"
          >
            {t("newsletter.success")}
          </motion.div>
        )}
      </div>
    </section>
  );
}
