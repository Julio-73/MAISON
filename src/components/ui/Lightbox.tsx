import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface LightboxProps {
  images: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
}

export default function Lightbox({ images, index, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(index);

  const prev = () => setCurrent((c) => (c > 0 ? c - 1 : images.length - 1));
  const next = () => setCurrent((c) => (c < images.length - 1 ? c + 1 : 0));

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] bg-ink/95 backdrop-blur-lg flex items-center justify-center">
        <button onClick={onClose} className="absolute top-6 right-6 z-10 text-bone/60 hover:text-bone transition-colors p-2">
          <X size={28} strokeWidth={1.5} />
        </button>

        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-bone/50 hover:text-bone transition-colors p-2">
              <ChevronLeft size={36} strokeWidth={1.5} />
            </button>
            <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-bone/50 hover:text-bone transition-colors p-2">
              <ChevronRight size={36} strokeWidth={1.5} />
            </button>
          </>
        )}

        <AnimatePresence mode="wait">
          <motion.img key={current} src={images[current].src} alt={images[current].alt}
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.3 }}
            className="max-w-[90vw] max-h-[85vh] object-contain select-none"
            draggable={false} />
        </AnimatePresence>

        {images.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-clay w-6" : "bg-bone/30 hover:bg-bone/50"}`} />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}