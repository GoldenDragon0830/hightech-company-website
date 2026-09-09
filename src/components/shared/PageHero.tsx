import type { ReactNode } from 'react';
export default function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: ReactNode; description: string; children?: ReactNode }) {
  return <section className="page-hero"><div className="shell">
    <div className="eyebrow entrance"><span className="status-dot" />{eyebrow}</div>
    <h1 className="entrance entrance-1">{title}</h1>
    <div className="page-hero-bottom entrance entrance-2"><p>{description}</p>{children}</div>
  </div><div className="hero-horizon" aria-hidden="true" /></section>;
}
