import { Link } from 'react-router-dom';
export default function Brand() {
  return <Link to="/" aria-label="HighTech home" className="brand"><svg width="29" height="29" viewBox="0 0 30 30" fill="none" aria-hidden="true"><path d="M4 4H11V11H19V4H26V26H19V18H11V26H4V4Z" fill="currentColor" /><path d="M11 11L19 18" stroke="var(--surface)" strokeWidth="2" /></svg><span>HighTech<span className="brand-dot">/</span></span></Link>;
}
