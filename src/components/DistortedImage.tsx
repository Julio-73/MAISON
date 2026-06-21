import { useEffect, useRef, useState } from "react";

interface DistortedImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function DistortedImage({ src, alt, className = "" }: DistortedImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const hoverRef = useRef(0); // target hover factor (0 to 1)
  const currentHoverRef = useRef(0); // smooth interpolated hover value
  const mouseRef = useRef({ x: 0.5, y: 0.5 }); // target mouse coords
  const currentMouseRef = useRef({ x: 0.5, y: 0.5 }); // smooth mouse coords
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let gl = canvas.getContext("webgl", { alpha: true, antialias: true });
    if (!gl) {
      // Fallback if WebGL is not supported
      return;
    }

    // --- Shader Sources ---
    const vsSource = `
      attribute vec2 aPosition;
      attribute vec2 aTexCoord;
      varying vec2 vTexCoord;
      void main() {
        vTexCoord = aTexCoord;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uTime;
      uniform float uHover;
      uniform vec2 uMouse;

      void main() {
        vec2 uv = vTexCoord;
        
        // Continuous organic silk wave
        float waveX = sin(uv.y * 8.0 + uTime * 0.6) * 0.0035;
        float waveY = cos(uv.x * 8.0 + uTime * 0.6) * 0.0035;
        uv.x += waveX;
        uv.y += waveY;
        
        // Interactive liquid wave on hover
        if (uHover > 0.01) {
          vec2 distVec = uv - uMouse;
          float dist = length(distVec);
          
          // Ripple expands outwards and decays exponentially over distance
          float ripple = sin(dist * 28.0 - uTime * 5.0) * 0.018 * uHover * exp(-dist * 4.0);
          uv += normalize(distVec) * ripple;
        }
        
        gl_FragColor = texture2D(uTexture, uv);
      }
    `;

    // --- Helper compilation functions ---
    function compileShader(source: string, type: number): WebGLShader | null {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // --- Geometry: Full-screen Quad ---
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1,  1, -1, -1,  1,
      -1,  1,  1, -1,  1,  1
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    const texCoords = new Float32Array([
      0, 0,  1, 0,  0, 1,
      0, 1,  1, 0,  1, 1
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

    const aTexCoord = gl.getAttribLocation(program, "aTexCoord");
    gl.enableVertexAttribArray(aTexCoord);
    gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, 0, 0);

    // --- Uniform Locations ---
    const uTime = gl.getUniformLocation(program, "uTime");
    const uHover = gl.getUniformLocation(program, "uHover");
    const uMouse = gl.getUniformLocation(program, "uMouse");

    // --- Image Texture Upload ---
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // Set parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = src;
    image.onload = () => {
      if (!gl) return;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      setImageLoaded(true);
      resizeCanvas();
    };

    // --- Resize Canvas to maintain aspect ratio ---
    function resizeCanvas() {
      if (!canvas || !container || !image.complete) return;
      const rect = container.getBoundingClientRect();
      
      // Target display size in pixels
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl!.viewport(0, 0, width, height);
      }
    }

    const resizeObserver = new ResizeObserver(() => resizeCanvas());
    resizeObserver.observe(container);

    // --- Mouse Listeners for displacement mapping ---
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      // Invert Y coordinate so it matches WebGL textures
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      mouseRef.current = { x, y };
    };

    const handleMouseEnter = () => {
      hoverRef.current = 1.0;
    };

    const handleMouseLeave = () => {
      hoverRef.current = 0.0;
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Pause animation when out of viewport
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    visibilityObserver.observe(container);

    // --- Animation loop ---
    let animationFrameId: number;
    let startTime = performance.now();

    function render() {
      if (!gl) return;

      if (!visibleRef.current) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const time = (performance.now() - startTime) * 0.001; // elapsed time in seconds

      // Interpolate hover factor smoothly (spring physics feel)
      currentHoverRef.current += (hoverRef.current - currentHoverRef.current) * 0.08;

      // Interpolate mouse coordinates smoothly
      currentMouseRef.current.x += (mouseRef.current.x - currentMouseRef.current.x) * 0.08;
      currentMouseRef.current.y += (mouseRef.current.y - currentMouseRef.current.y) * 0.08;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(uTime, time);
      gl.uniform1f(uHover, currentHoverRef.current);
      gl.uniform2f(uMouse, currentMouseRef.current.x, currentMouseRef.current.y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      gl?.deleteTexture(texture);
      gl?.deleteBuffer(positionBuffer);
      gl?.deleteBuffer(texCoordBuffer);
      gl?.deleteProgram(program);
    };
  }, [src]);

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Fallback image shown while compiling/loading WebGL texture */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 absolute inset-0 ${
          imageLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block object-cover pointer-events-none" />
    </div>
  );
}
