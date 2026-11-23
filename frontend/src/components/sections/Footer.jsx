import { ZenoLogo } from '../ui/Icons.jsx';

const footerLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
  { label: 'Community Guidelines', href: '#' },
  { label: 'Status', href: '#' },
  { label: 'Contact', href: '#' },
];

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/5 bg-[#0B0C10]/60 backdrop-blur-md mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand & Copyright */}
          <div className="flex items-center gap-2.5 text-zinc-500 text-xs">
            <ZenoLogo className="w-5 h-5 rounded-md" />
            <span className="font-semibold text-zinc-300">Zeno</span>
            <span>•</span>
            <span>© 2026 All rights reserved</span>
          </div>

          {/* Responsive Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-zinc-500">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-zinc-300 transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* System Status Pill */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
