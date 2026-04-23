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
      <nav className="fixed top-0 left-0 z-50 w-full bg-warm-light/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:py-4 lg:py-5">
          <Link to="/" className="flex min-w-0 items-center" aria-label="Celine Medical Spa home">
            <img
              src={IMG.logo}
              alt="Celine Medical Spa"
              className="h-9 w-auto shrink-0 object-contain brightness-0 md:h-7 lg:h-9"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`text-sm uppercase tracking-[0.1em] font-light ${
                  pathname === item.path ? 'text-terracotta' : 'text-slate hover:text-terracotta'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <a href="tel:9727506100" className="px-6 py-2.5 bg-terracotta text-pure text-xs uppercase tracking-[0.1em] font-light rounded-[2px] hover:bg-sunset shadow-sm">
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
        <div className="fixed inset-0 top-[5rem] z-40 flex flex-col overflow-y-auto border-b border-line bg-warm-light p-6">
          <div className="flex flex-col gap-6 pt-8">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`text-2xl font-light tracking-tight ${
                  pathname === item.path ? 'text-terracotta' : 'text-ink'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="mt-auto pb-12 flex flex-col gap-4">
            <a href="tel:9727506100" className="text-sm font-light text-terracotta tracking-wide">
              Call (972) 750-6100
            </a>
            <p className="text-xs text-slate">Plano, Texas</p>
          </div>
        </div>
      )}
    </>
  );
}
