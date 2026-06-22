import { motion } from "framer-motion";
import { useT } from "../i18n";

export default function Footer() {
  const t = useT();
  return (
    <footer className="bg-ink text-bone border-t border-bone/10 py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 mb-16">
          <div>
            <span className="text-xl md:text-2xl font-display tracking-[0.3em] text-bone">MAISON</span>
            <p className="mt-4 text-[10px] tracking-[0.2em] uppercase text-bone/50 max-w-[200px]">
              {t("footer.brand")}
            </p>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-clay mb-4">{t("footer.collections")}</h4>
            <ul className="space-y-2 text-xs text-bone/60">
              <li><a href="#collection" className="hover:text-bone transition-colors" data-cursor-hover>{t("footer.c1")}</a></li>
              <li><a href="#collection" className="hover:text-bone transition-colors" data-cursor-hover>{t("footer.c2")}</a></li>
              <li><a href="#collection" className="hover:text-bone transition-colors" data-cursor-hover>{t("footer.c3")}</a></li>
              <li><a href="#lookbook" className="hover:text-bone transition-colors" data-cursor-hover>{t("footer.c4")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-clay mb-4">{t("footer.lamaison")}</h4>
            <ul className="space-y-2 text-xs text-bone/60">
              <li><a href="#atelier" className="hover:text-bone transition-colors" data-cursor-hover>{t("footer.l1")}</a></li>
              <li><a href="#process" className="hover:text-bone transition-colors" data-cursor-hover>{t("footer.l2")}</a></li>
              <li><a href="#manifesto" className="hover:text-bone transition-colors" data-cursor-hover>{t("footer.l3")}</a></li>
              <li><a href="#showrooms" className="hover:text-bone transition-colors" data-cursor-hover>{t("footer.l4")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-clay mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-2 text-xs text-bone/60">
              <li><a href="#contact" className="hover:text-bone transition-colors" data-cursor-hover>{t("footer.cita")}</a></li>
              <li><span className="text-bone/45">paris@maison-couture.com</span></li>
              <li><span className="text-bone/45">+33 (0) 1 42 77 00 00</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-bone/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.2em] uppercase text-bone/40">
          <div>
            {t("footer.rights")}
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-bone transition-colors" data-cursor-hover>{t("footer.privacy")}</a>
            <a href="#" className="hover:text-bone transition-colors" data-cursor-hover>{t("footer.terms")}</a>
            <a href="#" className="hover:text-bone transition-colors" data-cursor-hover>{t("footer.cookies")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
