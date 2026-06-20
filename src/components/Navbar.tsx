import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";

const links = [
  { label: "Colección", href: "#collection" },
  { label: "Atelier", href: "#atelier" },
  { label: "Proceso", href: "#process" },
  { label: "Looks", href: "#looks" },
  { label: "Boutiques", href: "#showrooms" },
  { label: "Contacto", href: "#contact" },
];

const langs = ["FR", "EN", "IT", "ES", "JP"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("FR");
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2.6, ease: [0.77, 0, 0.175, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? "backdrop-blur-xl bg-ink/80 border-b border-bone/10" : "bg-transparent"
        }`}
      >
        {/* ========================================================================= */}
        {/* DESKTOP NAVBAR (Visible ONLY on screens >= 1024px / lg) */}
        {/* ========================================================================= */}
        <nav className="hidden lg:flex max-w-[1400px] mx-auto px-12 h-20 items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <span className="text-2xl font-display tracking-[0.3em] text-bone">MAISON</span>
            <span className="w-12 h-px bg-clay group-hover:w-20 transition-all duration-700" />
            <span className="text-[10px] tracking-[0.4em] text-clay uppercase">Est. 1987</span>
          </a>

          <ul className="flex items-center gap-10">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-line text-xs tracking-[0.25em] uppercase text-bone/80 hover:text-bone transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                onBlur={() => setTimeout(() => setLangOpen(false), 150)}
                className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-bone/70 hover:text-bone transition-colors px-2 py-2"
                data-cursor-hover
              >
                <Globe size={13} strokeWidth={1.4} />
                {lang}
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 bg-ink border border-bone/15 backdrop-blur-xl min-w-[80px]"
                  >
                    {langs.map((l) => (
                      <button
                        key={l}
                        onClick={() => { setLang(l); setLangOpen(false); }}
                        className={`block w-full text-left px-4 py-2 text-[10px] tracking-[0.3em] uppercase transition-colors ${
                          lang === l ? "text-clay" : "text-bone/70 hover:text-bone"
                        }`}
                        data-cursor-hover
                      >
                        {l}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#contact" className="inline-flex items-center btn-fill border border-bone/40 px-6 py-3 text-[11px] tracking-[0.3em] uppercase text-bone transition-colors" data-cursor-hover>
              Reservar
            </a>
          </div>
        </nav>

        {/* ========================================================================= */}
        {/* MOBILE & TABLET NAVBAR (Visible ONLY on screens < 1024px) */}
        {/* ========================================================================= */}
        <nav className="lg:hidden w-full h-20 px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <span className="text-xl font-display tracking-[0.3em] text-bone">MAISON</span>
          </a>

          <button
            onClick={() => setOpen(true)}
            className="p-2 text-bone flex items-center justify-center bg-transparent border-none outline-none cursor-pointer hover:text-clay transition-colors z-[60]"
            aria-label="Open menu"
            data-cursor-hover
          >
            <Menu size={28} strokeWidth={1.5} />
          </button>
        </nav>
      </motion.header>

      {/* ========================================================================= */}
      {/* MOBILE MENU OVERLAY PANEL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-ink flex flex-col justify-between"
          >
            <div className="flex flex-col h-full">
              {/* Header inside overlay */}
              <div className="flex items-center justify-between px-6 h-20 shrink-0">
                <span className="text-xl font-display tracking-[0.3em] text-bone">MAISON</span>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 text-bone flex items-center justify-center bg-transparent border-none outline-none cursor-pointer hover:text-clay transition-colors"
                  aria-label="Close menu"
                  data-cursor-hover
                >
                  <X size={28} strokeWidth={1.5} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 flex items-center justify-center">
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
                  }}
                  className="flex flex-col items-center gap-8 w-full"
                >
                  {links.map((l) => (
                    <motion.li
                      key={l.href}
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
                    >
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="text-5xl sm:text-6xl font-display tracking-widest text-bone hover:text-clay transition-colors uppercase text-center block w-full"
                      >
                        {l.label}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* Bottom Languages list in overlay */}
              <div className="px-8 pb-12 shrink-0 flex flex-col items-center">
                <div className="text-[10px] tracking-[0.4em] uppercase text-bone/40 mb-4">Idioma</div>
                <div className="flex gap-6">
                  {langs.map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setOpen(false); }}
                      className={`text-[11px] tracking-[0.3em] uppercase font-display transition-colors ${
                        lang === l ? "text-clay" : "text-bone/50 hover:text-bone"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
