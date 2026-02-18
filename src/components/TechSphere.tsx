import { Brain, Cpu, Globe, Zap, Shield, Code2 } from 'lucide-react';

export default function TechSphere() {
  return (
    <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] mx-auto tech-sphere-container">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/20 via-cyan-500/10 to-purple-500/20 blur-3xl animate-float-slow" />

      {/* Animated sphere */}
      <div className="absolute inset-8 md:inset-10 tech-sphere">
        {/* Core */}
        <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-400 tech-sphere-core" />

        {/* Inner gradient sphere */}
        <div className="absolute inset-[25%] rounded-full bg-gradient-to-br from-indigo-500/30 to-cyan-400/20 backdrop-blur-sm border border-white/10" />

        {/* Rotating rings */}
        <div className="tech-sphere-ring" />
        <div className="tech-sphere-ring" />
        <div className="tech-sphere-ring" />
        <div className="tech-sphere-ring" />
        <div className="tech-sphere-ring" />
        <div className="tech-sphere-ring" />

        {/* Orbiting icons */}
        <div className="sphere-icon" style={{ '--icon-radius': '110px', '--icon-duration': '10s' } as React.CSSProperties}>
          <Brain className="h-6 w-6 text-indigo-400 drop-shadow-lg" />
        </div>
        <div className="sphere-icon" style={{ '--icon-radius': '120px', '--icon-duration': '12s' } as React.CSSProperties}>
          <Cpu className="h-5 w-5 text-cyan-400 drop-shadow-lg" />
        </div>
        <div className="sphere-icon" style={{ '--icon-radius': '100px', '--icon-duration': '8s' } as React.CSSProperties}>
          <Globe className="h-5 w-5 text-blue-400 drop-shadow-lg" />
        </div>
        <div className="sphere-icon" style={{ '--icon-radius': '130px', '--icon-duration': '14s' } as React.CSSProperties}>
          <Zap className="h-5 w-5 text-yellow-400 drop-shadow-lg" />
        </div>
        <div className="sphere-icon" style={{ '--icon-radius': '115px', '--icon-duration': '11s' } as React.CSSProperties}>
          <Shield className="h-5 w-5 text-green-400 drop-shadow-lg" />
        </div>
        <div className="sphere-icon" style={{ '--icon-radius': '105px', '--icon-duration': '9s' } as React.CSSProperties}>
          <Code2 className="h-5 w-5 text-pink-400 drop-shadow-lg" />
        </div>
      </div>

      {/* Orbit dots */}
      {[
        { radius: '140px', duration: '6s', color: 'bg-indigo-400', size: 'w-2 h-2' },
        { radius: '155px', duration: '8s', color: 'bg-cyan-400', size: 'w-1.5 h-1.5' },
        { radius: '125px', duration: '10s', color: 'bg-blue-400', size: 'w-2.5 h-2.5' },
        { radius: '165px', duration: '7s', color: 'bg-purple-400', size: 'w-1.5 h-1.5' },
        { radius: '145px', duration: '9s', color: 'bg-green-400', size: 'w-2 h-2' },
        { radius: '135px', duration: '11s', color: 'bg-pink-400', size: 'w-1.5 h-1.5' },
      ].map((dot, i) => (
        <div
          key={i}
          className={`orbit-dot ${dot.color} ${dot.size} shadow-lg`}
          style={
            {
              '--orbit-radius': dot.radius,
              '--orbit-duration': dot.duration,
              animationDelay: `${i * -1.2}s`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Floating tech nodes around sphere */}
      {[
        { top: '10%', left: '15%', delay: '0s', duration: '5s' },
        { top: '75%', left: '10%', delay: '1s', duration: '6s' },
        { top: '20%', left: '80%', delay: '0.5s', duration: '4.5s' },
        { top: '80%', left: '75%', delay: '1.5s', duration: '5.5s' },
        { top: '5%', left: '55%', delay: '2s', duration: '4s' },
        { top: '90%', left: '45%', delay: '0.8s', duration: '6.5s' },
      ].map((node, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 tech-node"
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

      {/* Connecting lines (decorative SVG) */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <line x1="60" y1="40" x2="200" y2="200" stroke="url(#lineGrad)" strokeWidth="0.5" />
        <line x1="340" y1="80" x2="200" y2="200" stroke="url(#lineGrad)" strokeWidth="0.5" />
        <line x1="40" y1="300" x2="200" y2="200" stroke="url(#lineGrad)" strokeWidth="0.5" />
        <line x1="340" y1="300" x2="200" y2="200" stroke="url(#lineGrad)" strokeWidth="0.5" />
        <line x1="200" y1="20" x2="200" y2="200" stroke="url(#lineGrad)" strokeWidth="0.5" />
        <line x1="200" y1="380" x2="200" y2="200" stroke="url(#lineGrad)" strokeWidth="0.5" />
      </svg>
    </div>
  );
}
