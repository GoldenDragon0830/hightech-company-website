import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Brand from './Brand';
import Reveal from '@/components/motion/Reveal';
import { site } from '@/data/site';

export default function Footer() {
  return <footer className="site-footer"><div className="shell"><Reveal className="footer-grid"><div className="footer-intro"><Brand /><p>Thoughtful digital products.<br />Built by people who care.</p><a className="text-link" href={site.github} target="_blank" rel="noopener noreferrer">Find us on GitHub <ArrowUpRight size={15} /></a></div><div><h2>Explore</h2><ul>{[['/about','About the studio'],['/services','Our capabilities'],['/industries','Industries'],['/projects','Project lab'],['/careers','Careers']].map(([path, label]) => <li key={path}><Link to={path}>{label}</Link></li>)}</ul></div><div><h2>Let’s connect</h2><ul><li><a href={`mailto:${site.email}`}>{site.email}</a></li><li><a href={site.phoneHref}>{site.phone}</a></li><li><a href={site.calendly} target="_blank" rel="noopener noreferrer">Book a conversation <ArrowUpRight size={14} /></a></li></ul><p className="footer-address">{site.address}</p></div></Reveal><div className="footer-wordmark" aria-hidden="true">HighTech<span>↗</span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} HighTech. All rights reserved.</span><span>Small team. High standards.</span><Link to="/contact">Contact & privacy information <ArrowUpRight size={13} /></Link></div></div></footer>;
}
