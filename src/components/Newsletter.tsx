import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="bg-bone text-ink py-28 md:py-36 border-y border-ink/10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[11px] tracking-[0.5em] uppercase text-clay block mb-6">Cercle Privé</span>
          <h2 className="font-display text-4xl md:text-6xl mb-8">
            Forme parte <span className="italic">de la leyenda</span>
          </h2>
          <p className="max-w-xl mx-auto text-ink/75 leading-relaxed font-serif text-lg mb-12">
            Suscríbase para recibir invitaciones exclusivas a desfiles privados, previsualizaciones de colecciones de temporada y notas editoriales de nuestro director artístico.
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
              placeholder="Su dirección de correo electrónico"
              required
              className="w-full bg-transparent border-b border-ink/30 focus:border-clay outline-none py-3 text-sm tracking-[0.1em] placeholder-ink/40"
              data-cursor-hover
            />
            <button
              type="submit"
              className="btn-fill w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-ink text-bone px-8 py-4 text-[10px] tracking-[0.3em] uppercase transition-colors shrink-0"
              data-cursor-hover
            >
              Unirse <ArrowRight size={14} />
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-clay font-display text-2xl"
          >
            Bienvenido al Círculo Privado de MAISON.
          </motion.div>
        )}
      </div>
    </section>
  );
}
