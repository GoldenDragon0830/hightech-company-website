import { Brain, Cpu, Globe, Zap, Shield, Code2 } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function TechSphere() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const moveX = ((e.clientX - centerX) / rect.width) * 15;
      const moveY = ((e.clientY - centerY) / rect.height) * 15;

      container.style.transform = `perspective(1200px) rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
    };

    const handleMouseLeave = () => {
      container.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)';
      container.style.transition = 'transform 0.5s ease-out';
      setTimeout(() => { container.style.transition = ''; }, 500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-[340px] h-[340px] md:w-[440px] md:h-[440px] mx-auto animate-sphere-entrance">
      {/* Outer ambient glow */}
      <div className="absolute inset-[-20%] rounded-full bg-gradient-to-br from-indigo-500/15 via-cyan-500/10 to-purple-500/15 blur-3xl animate-float-slow" />

      {/* Secondary pulsing glow */}
      <div className="absolute inset-[5%] rounded-full bg-gradient-to-tr from-blue-400/10 to-cyan-300/10 blur-2xl animate-float-delayed" />

      <div ref={containerRef} className="relative w-full h-full tech-sphere-container" style={{ transition: 'transform 0.1s ease-out' }}>
        {/* Animated sphere */}
        <div className="absolute inset-8 md:inset-10 tech-sphere">
          {/* Core sphere with enhanced gradient */}
          <div className="absolute inset-[28%] rounded-full bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-400 tech-sphere-core" />

          {/* Inner glass layer */}
          <div className="absolute inset-[23%] rounded-full bg-gradient-to-br from-indigo-500/20 to-cyan-400/15 backdrop-blur-sm border border-white/20 shadow-inner" />

          {/* Outer glass layer */}
          <div className="absolute inset-[18%] rounded-full border border-white/10 bg-gradient-to-b from-white/5 to-transparent" />

          {/* Rotating rings */}
          <div className="tech-sphere-ring" />
          <div className="tech-sphere-ring" />
          <div className="tech-sphere-ring" />
          <div className="tech-sphere-ring" />
          <div className="tech-sphere-ring" />
          <div className="tech-sphere-ring" />

          {/* Orbiting icons — evenly spread around 360° */}
          <div className="sphere-icon" style={{ '--icon-radius': '120px', '--icon-duration': '12s', '--icon-start': '0deg' } as React.CSSProperties}>
            <Brain className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="sphere-icon" style={{ '--icon-radius': '125px', '--icon-duration': '14s', '--icon-start': '60deg' } as React.CSSProperties}>
            <Cpu className="h-4 w-4 text-cyan-500" />
          </div>
          <div className="sphere-icon" style={{ '--icon-radius': '115px', '--icon-duration': '10s', '--icon-start': '120deg' } as React.CSSProperties}>
            <Globe className="h-4 w-4 text-blue-500" />
          </div>
          <div className="sphere-icon" style={{ '--icon-radius': '130px', '--icon-duration': '16s', '--icon-start': '180deg' } as React.CSSProperties}>
            <Zap className="h-4 w-4 text-yellow-500" />
          </div>
          <div className="sphere-icon" style={{ '--icon-radius': '118px', '--icon-duration': '11s', '--icon-start': '240deg' } as React.CSSProperties}>
            <Shield className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="sphere-icon" style={{ '--icon-radius': '122px', '--icon-duration': '13s', '--icon-start': '300deg' } as React.CSSProperties}>
            <Code2 className="h-4 w-4 text-pink-500" />
          </div>
        </div>

        {/* Orbit dots — more spread with glow */}
        {[
          { radius: '145px', duration: '6s', color: 'bg-indigo-400', size: 'w-2 h-2' },
          { radius: '160px', duration: '8s', color: 'bg-cyan-400', size: 'w-1.5 h-1.5' },
          { radius: '130px', duration: '10s', color: 'bg-blue-400', size: 'w-2.5 h-2.5' },
          { radius: '170px', duration: '7s', color: 'bg-purple-400', size: 'w-1.5 h-1.5' },
          { radius: '150px', duration: '9s', color: 'bg-emerald-400', size: 'w-2 h-2' },
          { radius: '140px', duration: '11s', color: 'bg-pink-400', size: 'w-1.5 h-1.5' },
          { radius: '155px', duration: '7.5s', color: 'bg-sky-400', size: 'w-2 h-2' },
          { radius: '165px', duration: '12s', color: 'bg-amber-400', size: 'w-1.5 h-1.5' },
        ].map((dot, i) => (
          <div
            key={i}
            className={`orbit-dot ${dot.color} ${dot.size}`}
            style={
              {
                '--orbit-radius': dot.radius,
                '--orbit-duration': dot.duration,
                animationDelay: `${i * -1.5}s`,
              } as React.CSSProperties
            }
          />
        ))}

        {/* Floating tech nodes */}
        {[
          { top: '8%', left: '12%', delay: '0s', duration: '5s' },
          { top: '78%', left: '8%', delay: '1s', duration: '6s' },
          { top: '15%', left: '82%', delay: '0.5s', duration: '4.5s' },
          { top: '82%', left: '78%', delay: '1.5s', duration: '5.5s' },
          { top: '3%', left: '50%', delay: '2s', duration: '4s' },
          { top: '92%', left: '42%', delay: '0.8s', duration: '6.5s' },
          { top: '45%', left: '3%', delay: '1.2s', duration: '5.2s' },
          { top: '50%', left: '95%', delay: '0.3s', duration: '4.8s' },
        ].map((node, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 tech-node"
            style={
              {
                top: node.top,
                left: node.left,
                '--node-delay': node.delay,
                '--node-duration': node.duration,
              } as React.CSSProperties
            }
          />
        ))}

        {/* Connecting lines (animated SVG) */}
        <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 440 440">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="lineGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <line x1="50" y1="35" x2="220" y2="220" stroke="url(#lineGrad)" strokeWidth="0.6" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="0" to="8" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="390" y1="70" x2="220" y2="220" stroke="url(#lineGrad2)" strokeWidth="0.6" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="0" to="8" dur="2.5s" repeatCount="indefinite" />
          </line>
          <line x1="35" y1="340" x2="220" y2="220" stroke="url(#lineGrad)" strokeWidth="0.6" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="0" to="8" dur="1.8s" repeatCount="indefinite" />
          </line>
          <line x1="390" y1="350" x2="220" y2="220" stroke="url(#lineGrad2)" strokeWidth="0.6" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="0" to="8" dur="2.2s" repeatCount="indefinite" />
          </line>
          <line x1="220" y1="15" x2="220" y2="220" stroke="url(#lineGrad)" strokeWidth="0.6" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="0" to="8" dur="3s" repeatCount="indefinite" />
          </line>
          <line x1="220" y1="425" x2="220" y2="220" stroke="url(#lineGrad2)" strokeWidth="0.6" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="0" to="8" dur="2.8s" repeatCount="indefinite" />
          </line>
        </svg>
      </div>
    </div>
  );
}
