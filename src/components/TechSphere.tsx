import { useEffect, useRef } from 'react';

type TargetPoint = { x: number; y: number };

type StarParticle = {
  x: number;
  y: number;
  px: number;
  py: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
  depth: number;
  targetX: number;
  targetY: number;
};

type AmbientStar = {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  phase: number;
};

const PARTICLE_COUNT = 2800;
const AMBIENT_STAR_COUNT = 300;
const LOOP_DURATION_MS = 24000;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function drawRoundedSquare(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  radius: number
) {
  const half = size / 2;
  const x = cx - half;
  const y = cy - half;
  const r = Math.min(radius, half * 0.48);

  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + size - r, y);
  ctx.quadraticCurveTo(x + size, y, x + size, y + r);
  ctx.lineTo(x + size, y + size - r);
  ctx.quadraticCurveTo(x + size, y + size, x + size - r, y + size);
  ctx.lineTo(x + r, y + size);
  ctx.quadraticCurveTo(x, y + size, x, y + size - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.stroke();
}

function createChipTargetPoints(width: number, height: number): TargetPoint[] {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return [{ x: width / 2, y: height / 2 }];

  const cx = width / 2;
  const cy = height / 2;
  const chipSize = Math.min(width, height) * 0.44;
  const half = chipSize / 2;
  const pinLength = chipSize * 0.15;

  ctx.strokeStyle = 'rgba(255,255,255,1)';
  ctx.fillStyle = 'rgba(255,255,255,1)';
  ctx.lineWidth = Math.max(2, chipSize * 0.028);
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  drawRoundedSquare(ctx, cx, cy, chipSize, chipSize * 0.1);
  drawRoundedSquare(ctx, cx, cy, chipSize * 0.56, chipSize * 0.07);

  const pinCount = 8;
  for (let i = 0; i < pinCount; i += 1) {
    const t = (i + 1) / (pinCount + 1);

    const topPinX = cx - half + chipSize * t;
    ctx.beginPath();
    ctx.moveTo(topPinX, cy - half);
    ctx.lineTo(topPinX, cy - half - pinLength);
    ctx.stroke();

    const bottomPinX = cx - half + chipSize * t;
    ctx.beginPath();
    ctx.moveTo(bottomPinX, cy + half);
    ctx.lineTo(bottomPinX, cy + half + pinLength);
    ctx.stroke();

    const leftPinY = cy - half + chipSize * t;
    ctx.beginPath();
    ctx.moveTo(cx - half, leftPinY);
    ctx.lineTo(cx - half - pinLength, leftPinY);
    ctx.stroke();

    const rightPinY = cy - half + chipSize * t;
    ctx.beginPath();
    ctx.moveTo(cx + half, rightPinY);
    ctx.lineTo(cx + half + pinLength, rightPinY);
    ctx.stroke();
  }

  ctx.font = `700 ${Math.max(28, chipSize * 0.24)}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('AI', cx, cy + 1);

  const image = ctx.getImageData(0, 0, width, height).data;
  const points: TargetPoint[] = [];
  const step = Math.max(2, Math.floor(Math.min(width, height) / 180));

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const alpha = image[(y * width + x) * 4 + 3];
      if (alpha > 60) points.push({ x, y });
    }
  }

  return points.length > 0 ? points : [{ x: cx, y: cy }];
}

function assignTargets(points: TargetPoint[], count: number) {
  const total = points.length;
  const assigned: TargetPoint[] = [];

  for (let i = 0; i < count; i += 1) {
    const source = points[(i * 29 + i * i) % total];
    const jitterAngle = Math.random() * Math.PI * 2;
    const jitterRadius = Math.random() * 2.8;
    assigned.push({
      x: source.x + Math.cos(jitterAngle) * jitterRadius,
      y: source.y + Math.sin(jitterAngle) * jitterRadius,
    });
  }

  return assigned;
}

export default function TechSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frameId = 0;
    let particles: StarParticle[] = [];
    let ambientStars: AmbientStar[] = [];

    const startTime = performance.now();

    const resetScene = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(340, Math.floor(rect.width));
      height = Math.max(340, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cx = width / 2;
      const cy = height / 2;
      const spawnRadius = Math.min(width, height) * 0.68;

      const targetPoints = assignTargets(
        createChipTargetPoints(width, height),
        PARTICLE_COUNT
      );

      particles = targetPoints.map((target) => {
        const angle = Math.random() * Math.PI * 2;
        const radius = spawnRadius * (0.45 + Math.random() * 0.75);
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        return {
          x,
          y,
          px: x,
          py: y,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 1.9 + 0.45,
          alpha: Math.random() * 0.7 + 0.2,
          phase: Math.random() * Math.PI * 2,
          depth: Math.random() * 0.9 + 0.1,
          targetX: target.x,
          targetY: target.y,
        };
      });

      ambientStars = Array.from({ length: AMBIENT_STAR_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.25,
        speed: Math.random() * 1.3 + 0.4,
        drift: (Math.random() - 0.5) * 0.06,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (time: number) => {
      const cx = width / 2;
      const cy = height / 2;
      const maxRadius = Math.max(width, height) * 0.95;

      const cycle = ((time - startTime) % LOOP_DURATION_MS) / LOOP_DURATION_MS;

      const gatherIn = smoothstep(0.08, 0.42, cycle);
      const hold = 1 - smoothstep(0.6, 0.78, cycle);
      const gather = clamp(Math.min(gatherIn, hold), 0, 1);
      const disperse = smoothstep(0.72, 0.98, cycle);

      const sceneReveal = smoothstep(0.02, 0.12, cycle);
      const sceneFade = 1 - smoothstep(0.92, 1, cycle);
      const sceneAlpha = clamp(sceneReveal * sceneFade, 0, 1);

      const bg = context.createRadialGradient(
        cx,
        cy,
        maxRadius * 0.08,
        cx,
        cy,
        maxRadius
      );
      bg.addColorStop(0, 'rgba(18, 40, 84, 1)');
      bg.addColorStop(0.42, 'rgba(7, 20, 47, 1)');
      bg.addColorStop(1, 'rgba(3, 10, 26, 1)');
      context.globalAlpha = sceneAlpha;
      context.fillStyle = bg;
      context.fillRect(0, 0, width, height);

      context.globalAlpha = sceneAlpha;
      for (const star of ambientStars) {
        star.x += star.drift;
        if (star.x < -2) star.x = width + 2;
        if (star.x > width + 2) star.x = -2;

        const twinkle =
          0.2 +
          ((Math.sin(time * 0.0011 * star.speed + star.phase) + 1) / 2) * 0.8;
        context.fillStyle = `rgba(180, 220, 255, ${twinkle * 0.5})`;
        context.beginPath();
        context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        context.fill();
      }

      const nebulaPulse = 0.3 + (Math.sin(time * 0.00065) + 1) * 0.2;
      const coreGlow = context.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        Math.min(width, height) * 0.46
      );
      coreGlow.addColorStop(0, `rgba(168, 224, 255, ${0.22 * gather})`);
      coreGlow.addColorStop(0.5, `rgba(85, 155, 255, ${0.13 * gather * nebulaPulse})`);
      coreGlow.addColorStop(1, 'rgba(23, 70, 145, 0)');
      context.fillStyle = coreGlow;
      context.beginPath();
      context.arc(cx, cy, Math.min(width, height) * 0.46, 0, Math.PI * 2);
      context.fill();

      context.save();
      context.globalCompositeOperation = 'lighter';
      context.globalAlpha = sceneAlpha;

      for (const particle of particles) {
        particle.px = particle.x;
        particle.py = particle.y;

        const centerX = particle.x - cx;
        const centerY = particle.y - cy;
        const centerDistance = Math.hypot(centerX, centerY) + 0.001;

        const swirl = (0.002 + (1 - particle.depth) * 0.0018) * (1 - gather);
        particle.vx += (-centerY / centerDistance) * swirl;
        particle.vy += (centerX / centerDistance) * swirl;

        particle.vx +=
          Math.sin(time * 0.00042 + particle.phase) * 0.02 * (1 - gather);
        particle.vy +=
          Math.cos(time * 0.00039 + particle.phase) * 0.02 * (1 - gather);

        const wobbleX = Math.cos(time * 0.0011 + particle.phase) * (2 + gather * 3);
        const wobbleY = Math.sin(time * 0.001 + particle.phase) * (2 + gather * 3);
        const attraction = 0.011 + gather * 0.043;

        particle.vx += (particle.targetX + wobbleX - particle.x) * attraction;
        particle.vy += (particle.targetY + wobbleY - particle.y) * attraction;

        particle.vx += (centerX / centerDistance) * disperse * 0.02;
        particle.vy += (centerY / centerDistance) * disperse * 0.02;

        const damping = 0.967 - gather * 0.03;
        particle.vx *= damping;
        particle.vy *= damping;

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (
          (particle.x < -50 ||
            particle.x > width + 50 ||
            particle.y < -50 ||
            particle.y > height + 50) &&
          gather < 0.28
        ) {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.min(width, height) * (0.5 + Math.random() * 0.35);
          particle.x = cx + Math.cos(angle) * radius;
          particle.y = cy + Math.sin(angle) * radius;
          particle.px = particle.x;
          particle.py = particle.y;
          particle.vx *= 0.2;
          particle.vy *= 0.2;
        }

        const twinkle = 0.35 + ((Math.sin(time * 0.0032 + particle.phase) + 1) / 2) * 0.65;
        const alpha = particle.alpha * twinkle * (0.38 + gather * 0.85) * sceneAlpha;
        const size = particle.size * (0.95 + twinkle * 0.45 + gather * 0.24);

        context.strokeStyle = `rgba(121, 199, 255, ${alpha * 0.2})`;
        context.lineWidth = Math.max(0.35, size * 0.35);
        context.beginPath();
        context.moveTo(particle.px, particle.py);
        context.lineTo(particle.x, particle.y);
        context.stroke();

        const blue = Math.floor(220 + twinkle * 30);
        const green = Math.floor(170 + twinkle * 45);

        context.fillStyle = `rgba(110, ${green}, ${blue}, ${alpha})`;
        context.beginPath();
        context.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        context.fill();
      }

      context.restore();
      context.globalAlpha = 1;
      frameId = window.requestAnimationFrame(draw);
    };

    resetScene();
    const resizeObserver = new ResizeObserver(resetScene);
    resizeObserver.observe(canvas);
    frameId = window.requestAnimationFrame(draw);

    return () => {
      resizeObserver.disconnect();
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="relative w-[500px] h-[500px] md:w-[540px] md:h-[540px] mx-auto animate-sphere-entrance">
      <div className="absolute inset-[-18%] rounded-full bg-gradient-to-br from-blue-500/28 via-cyan-400/10 to-indigo-500/24 blur-3xl animate-float-slow" />

      <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-950/95 shadow-[0_30px_90px_rgba(30,64,175,0.28)]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-label="A realistic cosmic starfield converging into a high-tech AI core symbol"
          style={{
            WebkitMaskImage:
              'radial-gradient(circle at center, black 62%, rgba(0,0,0,0.85) 78%, rgba(0,0,0,0.45) 90%, transparent 100%)',
            maskImage:
              'radial-gradient(circle at center, black 62%, rgba(0,0,0,0.85) 78%, rgba(0,0,0,0.45) 90%, transparent 100%)',
          }}
        />

        <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_26%,rgba(56,189,248,0.22),transparent_38%),radial-gradient(circle_at_70%_72%,rgba(99,102,241,0.22),transparent_42%)]" />
        <div className="pointer-events-none absolute inset-0 rounded-full border border-white/12" />
        <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_65px_rgba(8,15,40,0.55)]" />


        <div className="pointer-events-none absolute inset-x-0 top-6 flex justify-center">
          <span className="ts-hightech-reveal text-[34px] md:text-[40px] font-semibold tracking-[0.04em]">
            HighTech
          </span>
        </div>
      </div>

      <style>{`
        .ts-hightech-reveal {
          opacity: 0;
          transform: translateY(12px) scale(0.96);
          color: transparent;
          background-image: linear-gradient(110deg, #9fdbff 8%, #eff6ff 36%, #67e8f9 48%, #dbeafe 62%, #9fdbff 92%);
          background-size: 240% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          text-shadow:
            0 0 10px rgba(125, 211, 252, 0.32),
            0 0 24px rgba(56, 189, 248, 0.28),
            0 0 48px rgba(59, 130, 246, 0.2);
          animation:
            tsWordReveal ${LOOP_DURATION_MS}ms linear infinite,
            tsWordShine 2600ms linear infinite;
        }

        @keyframes tsWordReveal {
          0%, 80% {
            opacity: 0;
            transform: translateY(12px) scale(0.96);
            filter: blur(4px);
          }
          86%, 96% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-8px) scale(1.02);
            filter: blur(5px);
          }
        }

        @keyframes tsWordShine {
          from {
            background-position: 210% 50%;
          }
          to {
            background-position: -40% 50%;
          }
        }
      `}</style>
    </div>
  );
}
