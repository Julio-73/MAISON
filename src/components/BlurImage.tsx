import { useState, useRef, useEffect } from "react";

interface BlurImageProps {
  src: string;
  alt: string;
  className?: string;
  srcSet?: string;
  sizes?: string;
}

export default function BlurImage({ src, alt, className = "", srcSet, sizes }: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <div className="relative overflow-hidden w-full h-full">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        srcSet={srcSet}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
      {!loaded && (
        <div className="absolute inset-0 bg-bone/10 animate-pulse" />
      )}
    </div>
  );
}
