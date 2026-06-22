import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, X, ShoppingBag, Heart, Scissors, Calendar } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useWishlist } from "../store/wishlistStore";
import { useMTMStore } from "../store/madeToMeasureStore";
import { useAppointmentStore } from "../store/appointmentStore";
import CurrencySelector from "./ui/CurrencySelector";
import { useT, setLanguage, getCurrentLang, langs } from "../i18n";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(getCurrentLang());
  const [langOpen, setLangOpen] = useState(false);
  const t = useT();
  const { toggleCart, items } = useCartStore();
  const { toggle: toggleWish, items: wishItems } = useWishlist();
  const { toggle: toggleMTM } = useMTMStore();
  const { toggle: toggleAppt } = useAppointmentStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleLangChange = (l: string) => {
    setLang(l);
    setLanguage(l);
    setOpen(false);
    setLangOpen(false);
  };

  const navLinks = [
    { label: t("nav.collection"), href: "#collection" },
    { label: t("nav.atelier"), href: "#atelier" },
    { label: t("nav.process"), href: "#process" },
    { label: t("nav.looks"), href: "#looks" },
    { label: t("nav.boutiques"), href: "#showrooms" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-ink/90 backdrop-blur-md border-b border-bone/10" : ""
        }`}
      >
        {/* ===== DESKTOP NAVBAR (lg+) ===== */}
        <nav className="hidden lg:flex w-full h-20 px-12 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3" data-cursor-hover>
            <span className="text-xl font-display tracking-[0.3em] text-bone">MAISON</span>
          </a>

          {/* Center links */}
          <div className="flex items-center gap-10">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[11px] tracking-[0.3em] uppercase text-bone/70 hover:text-bone transition-colors"
                data-cursor-hover
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-6">
            {/* Language picker */}
            <div className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-2 text-bone/60 hover:text-bone transition-colors text-[11px] tracking-[0.2em]"
                data-cursor-hover
              >
                <Globe size={14} strokeWidth={1.5} />
                {lang}
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-8 right-0 bg-ink border border-bone/10 py-2 min-w-[80px] shadow-xl z-50"
                  >
                    {langs.map((l) => (
                      <button
                        key={l}
                        onClick={() => handleLangChange(l)}
                        className={`w-full text-left px-4 py-2 text-[11px] tracking-[0.2em] uppercase transition-colors ${
                          lang === l ? "text-clay" : "text-bone/60 hover:text-bone"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Currency */}
            <CurrencySelector />

            {/* Wishlist */}
            <button onClick={toggleWish} className="relative flex items-center p-2 text-bone/70 hover:text-bone transition-colors" data-cursor-hover>
              <Heart size={16} strokeWidth={1.4} />
              {wishItems.length > 0 && (
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-clay text-ink text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishItems.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button onClick={toggleCart} className="relative flex items-center p-2 text-bone/70 hover:text-bone transition-colors" data-cursor-hover>
              <ShoppingBag size={18} strokeWidth={1.4} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-clay text-ink text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Alta Costura */}
            <button onClick={toggleMTM}
              className="flex items-center gap-2 border border-bone/30 px-5 py-3 text-[10px] tracking-[0.2em] uppercase text-bone/80 hover:text-bone hover:border-bone transition-colors"
              data-cursor-hover>
              <Scissors size={12} strokeWidth={1.5} /> {t("nav.altacostura")}
            </button>

            {/* Reservar Cita */}
            <button onClick={toggleAppt}
              className="flex items-center gap-2 border border-bone/30 px-5 py-3 text-[10px] tracking-[0.2em] uppercase text-bone/80 hover:text-bone hover:border-bone transition-colors"
              data-cursor-hover>
              <Calendar size={12} strokeWidth={1.5} /> {t("nav.cita")}
            </button>

            <a href="#contact"
              className="inline-flex items-center border border-bone/40 px-6 py-3 text-[11px] tracking-[0.3em] uppercase text-bone hover:bg-bone hover:text-ink transition-colors"
              data-cursor-hover>
              {t("nav.reserve")}
            </a>
          </div>
        </nav>

        {/* ===== MOBILE NAVBAR (< lg) ===== */}
        <nav className="lg:hidden w-full h-20 px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <span className="text-xl font-display tracking-[0.3em] text-bone">MAISON</span>
          </a>

          <div className="flex items-center gap-1">
            {/* Mobile Language */}
            <div className="relative">
              <button onClick={(e) => { e.stopPropagation(); setLangOpen((v) => !v); }}
                className="flex items-center gap-1 px-2 py-2 text-bone/60 hover:text-bone transition-colors" aria-label="Language">
                <Globe size={16} strokeWidth={1.5} />
                <span className="text-[10px] tracking-[0.1em] font-medium">{lang}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-9 right-0 bg-ink border border-bone/10 py-1.5 min-w-[72px] shadow-xl z-50">
                    {langs.map((l) => (
                      <button key={l} onClick={() => handleLangChange(l)}
                        className={`w-full text-left px-4 py-2 text-[11px] tracking-[0.15em] uppercase transition-colors ${lang === l ? "text-clay" : "text-bone/60 hover:text-bone"}`}>
                        {l}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button onClick={toggleWish} className="relative p-2 text-bone" aria-label={t("nav.wishlist")}>
              <Heart size={22} strokeWidth={1.5} />
              {wishItems.length > 0 && (
                <span className="absolute top-1 right-0 w-4 h-4 bg-clay text-ink text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishItems.length}
                </span>
              )}
            </button>
            <button onClick={toggleCart} className="relative p-2 text-bone" aria-label={t("nav.cart")}>
              <ShoppingBag size={24} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-0 w-4 h-4 bg-clay text-ink text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setOpen(true)} className="p-2 text-bone" aria-label={t("nav.menu")}>
              <Menu size={28} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ===== MOBILE MENU OVERLAY ===== */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[70] bg-ink flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-20 shrink-0 border-b border-bone/10">
              <span className="text-xl font-display tracking-[0.3em] text-bone">MAISON</span>
              <button onClick={() => setOpen(false)} className="p-2 text-bone" aria-label={t("nav.close")}>
                <X size={28} strokeWidth={1.5} />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 flex items-center justify-center">
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }}
                className="flex flex-col items-center gap-8 w-full px-6"
              >
                {navLinks.map((l) => (
                  <motion.li
                    key={l.href}
                    variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="text-5xl sm:text-6xl font-display tracking-widest text-bone hover:text-clay transition-colors uppercase text-center block"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Language selector */}
            <div className="px-8 pb-6 shrink-0 flex flex-col items-center border-t border-bone/10 pt-8">
              <div className="text-[10px] tracking-[0.4em] uppercase text-bone/40 mb-4">{t("nav.idioma")}</div>
              <div className="flex gap-6">
                {langs.map((l) => (
                  <button
                    key={l}
                    onClick={() => handleLangChange(l)}
                    className={`text-[11px] tracking-[0.3em] uppercase font-display transition-colors ${
                      lang === l ? "text-clay" : "text-bone/50 hover:text-bone"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile action buttons */}
            <div className="px-8 pb-8 shrink-0 flex flex-col items-center gap-3">
              <button onClick={() => { toggleMTM(); setOpen(false); }}
                className="w-full flex items-center justify-center gap-3 border border-bone/30 px-6 py-4 text-[11px] tracking-[0.3em] uppercase text-bone hover:bg-bone hover:text-ink transition-colors">
                <Scissors size={14} /> {t("nav.altacostura")}
              </button>
              <button onClick={() => { toggleAppt(); setOpen(false); }}
                className="w-full flex items-center justify-center gap-3 border border-bone/30 px-6 py-4 text-[11px] tracking-[0.3em] uppercase text-bone hover:bg-bone hover:text-ink transition-colors">
                <Calendar size={14} /> {t("nav.cita")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
