import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-ink text-bone border-t border-bone/10 py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 mb-16">
          <div>
            <span className="text-xl md:text-2xl font-display tracking-[0.3em] text-bone">MAISON</span>
            <p className="mt-4 text-[10px] tracking-[0.2em] uppercase text-bone/50 max-w-[200px]">
              Atelier de Haute Couture & Luxury Fashion. París, desde 1987.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-clay mb-4">Colecciones</h4>
            <ul className="space-y-2 text-xs text-bone/60">
              <li><a href="#collection" className="hover:text-bone transition-colors" data-cursor-hover>Lumière</a></li>
              <li><a href="#collection" className="hover:text-bone transition-colors" data-cursor-hover>Écho</a></li>
              <li><a href="#collection" className="hover:text-bone transition-colors" data-cursor-hover>Nuit</a></li>
              <li><a href="#lookbook" className="hover:text-bone transition-colors" data-cursor-hover>Lookbook Completo</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-clay mb-4">La Maison</h4>
            <ul className="space-y-2 text-xs text-bone/60">
              <li><a href="#atelier" className="hover:text-bone transition-colors" data-cursor-hover>El Atelier</a></li>
              <li><a href="#process" className="hover:text-bone transition-colors" data-cursor-hover>El Proceso</a></li>
              <li><a href="#manifesto" className="hover:text-bone transition-colors" data-cursor-hover>Manifiesto</a></li>
              <li><a href="#showrooms" className="hover:text-bone transition-colors" data-cursor-hover>Boutiques</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-clay mb-4">Contacto</h4>
            <ul className="space-y-2 text-xs text-bone/60">
              <li><a href="#contact" className="hover:text-bone transition-colors" data-cursor-hover>Reservar Cita</a></li>
              <li><span className="text-bone/45">paris@maison-couture.com</span></li>
              <li><span className="text-bone/45">+33 (0) 1 42 77 00 00</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-bone/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.2em] uppercase text-bone/40">
          <div>
            © 2026 MAISON. Todos los derechos reservados.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-bone transition-colors" data-cursor-hover>Privacidad</a>
            <a href="#" className="hover:text-bone transition-colors" data-cursor-hover>Términos</a>
            <a href="#" className="hover:text-bone transition-colors" data-cursor-hover>Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
