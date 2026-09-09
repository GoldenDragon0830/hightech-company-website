import { useEffect, useRef } from 'react';

/** A perspective-projected point cloud; no WebGL dependency or tracking. */
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerMedia = window.matchMedia('(pointer: fine)');
    let frame = 0;
    let width = 1;
    let height = 1;
    let visible = true;
    let phase = 0;
    let lastTime = 0;
    let px = 0;
    let py = 0;
    let tx = 0;
    let ty = 0;
    let seed = 7349;
    const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    const particles = Array.from({ length: 1200 }, (_, i) => {
      const t = random() * Math.PI * 2;
      const spread = Math.pow(random(), 2) * 0.75;
      const angle = random() * Math.PI * 2;
      return { t, spread, angle, size: random(), phase: random() * Math.PI * 2, stray: i % 5 === 0, x: random() * 2 - 1, y: random() * 2 - 1, z: random() };
    });
    const paused = () => media.matches || document.documentElement.dataset.motion === 'paused';
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const scale = Math.min(width * 0.48, height * 0.54);
      const count = width < 600 ? 650 : particles.length;
      for (let i = 0; i < count; i++) {
        const p = particles[i];
        const t = p.t / Math.PI - 1;
        let x = Math.sin(t * 2.6 + phase * 0.075) * 0.48 + Math.cos(p.angle) * p.spread;
        let y = t * 1.05 + Math.sin(p.angle) * p.spread * 0.55;
        let z = Math.cos(t * 3 + phase * 0.09) * 0.5 + Math.sin(p.angle) * p.spread;
        if (p.stray) { x = p.x * 1.5; y = p.y * 1.5; z = p.z; }
        const twist = phase * 0.045 + y * 0.6;
        const rx = x * Math.cos(twist) - z * Math.sin(twist);
        z = x * Math.sin(twist) + z * Math.cos(twist);
        x = rx;
        const depth = 2.9 / (2.9 + z);
        const sx = width * 0.52 + (x * 0.84 + y * 0.33) * scale * depth + px * depth;
        const sy = height * 0.49 + (y * 0.84 - x * 0.18) * scale * depth + py * depth;
        const opacity = (0.25 + (Math.sin(phase * 0.6 + p.phase) + 1) * 0.27) * (p.stray ? 0.45 : 1);
        const size = (0.45 + p.size * 1.15) * depth;
        ctx.fillStyle = i % 7 === 0 ? `rgba(213,255,112,${opacity})` : `rgba(232,240,219,${opacity})`;
        ctx.beginPath(); ctx.arc(sx, sy, size, 0, Math.PI * 2); ctx.fill();
        if (p.size > 0.993 && !p.stray) {
          ctx.strokeStyle = `rgba(224,255,170,${opacity * 0.45})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath(); ctx.moveTo(sx - 5, sy); ctx.lineTo(sx + 5, sy); ctx.moveTo(sx, sy - 5); ctx.lineTo(sx, sy + 5); ctx.stroke();
        }
      }
    };
    const tick = (time: number) => {
      if (!visible || document.hidden || paused()) { frame = 0; return; }
      if (time - lastTime >= 32) {
        phase += Math.min((time - lastTime) / 1000, 0.05);
        px += (tx - px) * 0.055; py += (ty - py) * 0.055;
        draw(); lastTime = time;
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame); frame = 0; lastTime = performance.now();
      draw();
      if (visible && !document.hidden && !paused()) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(bounds.width, 1); height = Math.max(bounds.height, 1);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); sync();
    };
    const move = (event: PointerEvent) => {
      if (!pointerMedia.matches || paused()) return;
      const bounds = canvas.getBoundingClientRect();
      tx = ((event.clientX - bounds.left) / width - 0.5) * 20;
      ty = ((event.clientY - bounds.top) / height - 0.5) * 20;
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    intersection.observe(canvas);
    const mutation = new MutationObserver(sync);
    mutation.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });
    media.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('pointermove', move, { passive: true });
    resize();
    return () => {
      cancelAnimationFrame(frame); resizeObserver.disconnect(); intersection.disconnect(); mutation.disconnect();
      media.removeEventListener('change', sync); document.removeEventListener('visibilitychange', sync); window.removeEventListener('pointermove', move);
    };
  }, []);
  return <canvas ref={ref} data-starfield aria-hidden="true" className="starfield" />;
}
