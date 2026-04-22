import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IMG } from '../siteImages';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'auto';
  }, [mobileMenuOpen]);

  // Close mobile menu on path change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Location', path: '/location' },
    { name: 'Specials', path: '/specials' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-warm-light/90 backdrop-blur-md border-b border-line">
        <div className="max-w-[1400px] mx-auto px-6 py-3 sm:py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 min-w-0" aria-label="Celine Medical Spa home">
            <img
              src={IMG.logo}
              alt="Celine Medical Spa"
              className="h-16 w-auto sm:h-20 object-contain shrink-0"
            />
            <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-terracotta border-l border-line pl-3 h-4 leading-4 font-bold">
              Medical Spa
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`text-sm uppercase tracking-[0.1em] font-bold ${
                  pathname === item.path ? 'text-terracotta' : 'text-slate hover:text-terracotta'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <a href="tel:9727506100" className="px-6 py-2.5 bg-terracotta text-pure text-xs uppercase tracking-[0.1em] font-bold rounded-[2px] hover:bg-sunset shadow-sm">
              (972) 750-6100
            </a>
          </div>

          <button className="md:hidden text-ink" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[5.5rem] sm:top-28 z-40 bg-warm-light flex flex-col p-6 border-b border-line overflow-y-auto">
          <div className="flex flex-col gap-6 pt-8">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`text-2xl font-medium tracking-tight ${
                  pathname === item.path ? 'text-terracotta' : 'text-ink'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="mt-auto pb-12 flex flex-col gap-4">
            <a href="tel:9727506100" className="text-sm font-bold text-terracotta tracking-wide">
              Call (972) 750-6100
            </a>
            <p className="text-xs text-slate">Plano, Texas</p>
          </div>
        </div>
      )}
    </>
  );
}
