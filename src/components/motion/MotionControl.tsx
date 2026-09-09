import { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';

export default function MotionControl() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [paused, setPaused] = useState(() => {
    try {
      return localStorage.getItem('hightech-motion') === 'paused';
    } catch {
      return false;
    }
  });
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = paused || reduced ? 'paused' : 'playing';
  }, [paused, reduced]);
  const toggle = () => {
    setPaused(!paused);
    try {
      localStorage.setItem('hightech-motion', paused ? 'playing' : 'paused');
    } catch {
      /* Works without browser storage. */
    }
  };
  const label = reduced
    ? 'Animations reduced by system preference'
    : paused
      ? 'Play animations'
      : 'Pause animations';
  return (
    <button
      type="button"
      className="motion-control"
      aria-label={label}
      title={label}
      aria-pressed={paused || reduced}
      disabled={reduced}
      onClick={toggle}
    >
      {paused || reduced ? (
        <Play size={14} aria-hidden="true" />
      ) : (
        <Pause size={14} aria-hidden="true" />
      )}
      <span>Motion</span>
    </button>
  );
}
