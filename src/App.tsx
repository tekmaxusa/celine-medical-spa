/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, ReactNode, Component } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Star, 
  Phone, 
  MapPin, 
  Mail, 
  CheckCircle2, 
  UserSearch, 
  ShieldCheck,
  Droplets,
  Sparkles,
  FlaskConical,
  LogIn,
  LogOut,
  Calendar,
  Clock,
  User,
  Settings,
  LayoutDashboard,
  ClipboardList,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  auth, 
  logOut, 
  getServices, 
  getSpecialists, 
  getClientBookings, 
  getMerchantBookings, 
  updateBookingStatus,
  addService,
  updateService,
  deleteService,
  addSpecialist,
  updateSpecialist,
  deleteSpecialist
} from './firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp, collection } from 'firebase/firestore';
import { db } from './firebase';
import { IMG } from './siteImages';
import { copy } from './siteContent';

const SITE_NAME = 'Celine Medical Spa';
const LOGO_SRC = `${import.meta.env.BASE_URL}celine-logo.png`;
const isWinter = () => {
  const m = new Date().getMonth(); // 0=Jan ... 11=Dec
  return m === 11 || m === 0 || m === 1; // Dec/Jan/Feb
};

// --- Types ---

type Page = 'home' | 'services' | 'client-dashboard' | 'merchant-dashboard';

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
  category: string;
}

interface Specialist {
  id: string;
  name: string;
  role: string;
  image?: string;
  bio?: string;
}

// --- Error Boundary ---

class ErrorBoundary extends (Component as any) {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, errorInfo: error.message };
  }

  render() {
    if ((this as any).state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 p-6">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-red-100">
            <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
            <h2 className="text-2xl font-headline text-on-surface mb-4">Something went wrong</h2>
            <p className="text-on-surface-variant mb-6">We encountered an unexpected error. Please try refreshing the page.</p>
            <div className="bg-red-50 p-4 rounded-lg text-left mb-6 overflow-hidden">
              <p className="text-xs font-mono text-red-700 break-all">{(this as any).state.errorInfo}</p>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-primary text-on-primary py-3 rounded-lg font-bold"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return (this as any).props.children;
  }
}

// --- Components ---

const Navbar = ({ currentPage, setPage, user, role }: { currentPage: Page, setPage: (p: Page) => void, user: FirebaseUser | null, role: string | null }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goAbout = () => {
    if (currentPage === 'home') {
      document.getElementById('our-approach')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setPage('home');
      setTimeout(() => document.getElementById('our-approach')?.scrollIntoView({ behavior: 'smooth' }), 350);
    }
  };

  const navLinks = [
    { name: 'Services', id: 'services' as Page, action: null as (() => void) | null },
    { name: 'About', id: 'home' as Page, action: goAbout },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-stone-200/80 bg-white shadow-sm ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="flex justify-between items-center w-full px-5 sm:px-8 py-4 md:py-5 max-w-7xl mx-auto">
        <button
          type="button"
          className="flex items-center gap-3 md:gap-4 min-w-0 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg pr-2"
          onClick={() => setPage('home')}
          aria-label={SITE_NAME}
        >
          <div className="shrink-0 flex items-center justify-center">
            <img
              src={LOGO_SRC}
              alt={SITE_NAME}
              className="h-11 sm:h-12 md:h-14 w-auto max-h-[56px] md:max-h-[64px] object-contain block"
            />
          </div>
        </button>
        
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive =
              (link.id === 'services' && currentPage === 'services') ||
              (link.name === 'About' && currentPage === 'home');
            return (
              <button
                key={link.name}
                type="button"
                onClick={() => (link.action ? link.action() : setPage(link.id))}
                className={`px-4 py-2 rounded-md text-sm font-semibold tracking-wide transition-colors ${
                  isActive
                    ? 'text-primary bg-primary-container/60 ring-1 ring-primary/30 shadow-sm'
                    : 'text-stone-800 bg-stone-100/95 hover:bg-stone-200 hover:text-stone-950'
                }`}
              >
                {link.name}
              </button>
            );
          })}
          
          {/* Sign In and User Profile hidden per request
          {user ? (
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setPage(role === 'merchant' ? 'merchant-dashboard' : 'client-dashboard')}
                className="text-on-surface-variant hover:text-primary font-medium flex items-center gap-2"
              >
                <LayoutDashboard size={18} /> Dashboard
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-stone-200">
                <img src={user.photoURL || ''} alt="" className="w-8 h-8 rounded-full" />
                <button onClick={logOut} className="text-on-surface-variant hover:text-red-500 transition-colors">
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={signInWithGoogle}
              className="flex items-center gap-2 text-on-surface-variant hover:text-primary font-medium"
            >
              <LogIn size={18} /> Sign In
            </button>
          )}

          <button 
            onClick={() => setPage('booking')}
            className="bg-primary text-on-primary px-8 py-3 rounded-md font-semibold hover:opacity-90 transition-all active:scale-95"
          >
            Book Now
          </button>
          */}
        </div>

        <button
          type="button"
          className="md:hidden rounded-lg p-2 text-stone-800 bg-stone-100 hover:bg-stone-200 ring-1 ring-stone-200/80"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-t border-stone-100 p-8 space-y-6 shadow-xl"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  if (link.action) link.action();
                  else setPage(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left text-lg font-medium text-on-surface-variant"
              >
                {link.name}
              </button>
            ))}
            {/* Dashboard and Book Now hidden per request
            {user && (
              <button
                onClick={() => { setPage(role === 'merchant' ? 'merchant-dashboard' : 'client-dashboard'); setIsMobileMenuOpen(false); }}
                className="block w-full text-left text-lg font-medium text-on-surface-variant"
              >
                Dashboard
              </button>
            )}
            <button 
              onClick={() => { setPage('booking'); setIsMobileMenuOpen(false); }}
              className="w-full bg-primary text-on-primary py-4 rounded-md font-bold"
            >
              Book Now
            </button>
            */}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};


const Footer = ({ setPage }: { setPage: (p: Page) => void }) => (
  <footer className="bg-stone-100 py-12 px-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto text-center md:text-left">
      <div className="space-y-4">
        <img
          src={LOGO_SRC}
          alt={SITE_NAME}
          className="h-[72px] md:h-[84px] w-auto max-w-[340px] md:max-w-[420px] object-contain mx-auto md:mx-0"
        />
        <p className="text-sm font-medium text-on-surface">{copy.footer.tagline}</p>
        <p className="text-sm text-on-surface-variant max-w-xs mx-auto md:mx-0 leading-relaxed">
          {copy.footer.description}
        </p>
      </div>
      <div className="flex flex-col space-y-3">
        <h5 className="font-bold text-on-surface text-sm uppercase tracking-widest mb-2">{copy.footer.exploreTitle}</h5>
        <button type="button" onClick={() => setPage('home')} className="text-on-surface-variant text-sm hover:text-secondary transition-all text-left">
          Philosophy
        </button>
        <button type="button" onClick={() => setPage('services')} className="text-on-surface-variant text-sm hover:text-secondary transition-all text-left">
          Services
        </button>
        <a href={copy.footer.phoneTel} className="text-on-surface-variant text-sm hover:text-secondary transition-all text-left">
          Call us
        </a>
        <p className="text-xs text-on-surface-variant pt-2">{copy.region}</p>
      </div>
      <div className="flex flex-col space-y-2 text-sm text-on-surface-variant">
        <h5 className="font-bold text-on-surface text-sm uppercase tracking-widest mb-2">{copy.footer.contactTitle}</h5>
        {copy.footer.addressLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p className="text-xs mt-2">{copy.footer.hours}</p>
        <a className="text-primary font-medium hover:underline mt-2" href={copy.footer.phoneTel}>{copy.footer.phoneDisplay}</a>
        <a className="hover:text-primary transition-colors" href={copy.footer.mailto}>{copy.footer.email}</a>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-10 px-2">
      <p className="text-xs text-stone-500 leading-relaxed text-left">{copy.footer.disclaimer}</p>
    </div>
    <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-stone-200 text-center">
      <p className="text-sm text-stone-400">© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
    </div>
  </footer>
);

// --- Pages ---

const HomePage: React.FC<{ setPage: (p: Page) => void }> = ({ setPage }) => {
  const testimonialsTrackRef = React.useRef<HTMLDivElement | null>(null);

  const scrollTestimonialsBy = (dir: -1 | 1) => {
    const el = testimonialsTrackRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>('[data-review-card="true"]');
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 360;
    // 24px = gap-6
    el.scrollBy({ left: dir * Math.round(cardWidth + 24), behavior: 'smooth' });
  };

  return (
    <motion.div 
      key="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
    {/* Hero — spa name only in navbar; photo stays sharp (no text on image) */}
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          className="hero-bg-photo hero-bg-photo--home absolute inset-0 h-full w-full max-w-none object-cover object-[center_22%] md:object-[center_25%]"
          src={IMG.homeHero} 
          alt="Celine Medical Spa reception with wall signage"
          sizes="100vw"
          decoding="sync"
          fetchPriority="high"
        />
        {/* Light left fade for text — lower opacity so more of the photo stays bright */}
        <div
          className="absolute inset-y-0 left-0 w-[min(100%,38rem)] bg-gradient-to-r from-white/70 to-transparent pointer-events-none"
          aria-hidden
        />
      </div>
      <div className="container mx-auto px-5 sm:px-8 relative z-10 w-full">
        <div className="max-w-xl lg:max-w-2xl">
          <div className="rounded-2xl border border-stone-200/80 bg-white/90 p-7 md:p-8 shadow-[0_22px_56px_-22px_rgba(15,23,42,0.16)] backdrop-blur-sm">
            <p className="text-primary text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase mb-4">
              {copy.hero.eyebrow}
            </p>
            <h1 className="font-headline text-stone-900 leading-[1.15] mb-5">
              <span className="block text-[1.65rem] sm:text-3xl md:text-4xl lg:text-[2.35rem] font-normal tracking-tight">
                {copy.hero.headline}
              </span>
              <span className="mt-3 block text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] text-primary italic font-medium">
                {copy.hero.headlineAccent}
              </span>
            </h1>
            <p className="text-on-surface-variant text-base md:text-lg leading-relaxed max-w-prose mb-7">
              {copy.hero.sub}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <button 
                type="button"
                onClick={() => setPage('services')}
                className="bg-primary text-on-primary px-8 py-3.5 rounded-lg font-semibold text-sm md:text-base shadow-md hover:opacity-95 hover:shadow-lg transition-all"
              >
                {copy.hero.ctaPrimary}
              </button>
              <button
                type="button"
                onClick={() => document.getElementById('our-approach')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-stone-800 px-8 py-3.5 rounded-lg font-semibold text-sm md:text-base border border-stone-200 shadow-sm hover:bg-stone-50 transition-all"
              >
                {copy.hero.ctaSecondary}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Our Approach */}
    <section id="our-approach" className="py-20 px-8 bg-stone-50 border-y border-stone-100">
      <div className="max-w-4xl mx-auto text-center mb-14">
        <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Our approach</p>
        <h2 className="text-3xl md:text-4xl text-on-surface mb-6">{copy.philosophy.title}</h2>
        <p className="text-on-surface-variant leading-relaxed mb-4">{copy.philosophy.body}</p>
        <p className="text-on-surface-variant leading-relaxed">{copy.philosophy.body2}</p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {copy.whyChoose.items.map((item) => (
          <div key={item.title} className="bg-white rounded-xl p-8 border border-stone-100 shadow-sm text-center md:text-left">
            <h3 className="font-headline text-lg text-primary mb-3">{item.title}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Curated Treatments */}
    <section className="py-24 px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl text-on-surface mb-6">{copy.curated.title}</h2>
            <p className="text-on-surface-variant leading-relaxed">{copy.curated.intro}</p>
          </div>
          <button 
            onClick={() => setPage('services')}
            className="text-primary font-bold border-b-2 border-primary-container pb-1 hover:border-primary transition-all"
          >
            {copy.curated.exploreCta}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {!isWinter() ? (
            <div className="md:col-span-8 group relative overflow-hidden rounded-xl bg-surface-container-low aspect-[16/9]">
              <img 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={IMG.pico} 
                alt="Pico laser treatment"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white text-left max-w-[44rem]">
                <p className="text-white/80 text-xs font-semibold tracking-widest uppercase mb-2">{copy.homeTreatments.pico.subtitle}</p>
                <h3 className="text-3xl mb-2 font-headline">{copy.homeTreatments.pico.title}</h3>
                <p className="text-white/85 mb-4 max-w-md text-sm leading-relaxed">{copy.homeTreatments.pico.desc}</p>
                <button type="button" onClick={() => setPage('services')} className="inline-flex items-center text-sm font-bold tracking-widest uppercase">
                  Learn more <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="md:col-span-8 group relative overflow-hidden rounded-xl bg-surface-container-low aspect-[16/9]">
              <img 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={IMG.derma} 
                alt="Ultherapy skin tightening"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white text-left max-w-[44rem]">
                <p className="text-white/80 text-xs font-semibold tracking-widest uppercase mb-2">{copy.homeTreatments.ultherapy.subtitle}</p>
                <h3 className="text-3xl mb-2 font-headline">{copy.homeTreatments.ultherapy.title}</h3>
                <p className="text-white/90 mb-4 max-w-md text-sm leading-relaxed">{copy.homeTreatments.ultherapy.desc}</p>
                <button type="button" onClick={() => setPage('services')} className="inline-flex items-center text-sm font-bold tracking-widest uppercase">
                  Learn more <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          )}

          <div className="md:col-span-4 group relative overflow-hidden rounded-xl bg-secondary-container">
            <div className="p-8 flex flex-col h-full justify-between">
              <Droplets className="text-secondary mb-4" size={32} />
              <div>
                <p className="text-on-secondary-container/90 text-xs font-semibold tracking-widest uppercase mb-2">{copy.homeTreatments.airjet.subtitle}</p>
                <h3 className="text-2xl text-on-secondary-container mb-2">{copy.homeTreatments.airjet.title}</h3>
                <p className="text-on-secondary-container/80 text-sm mb-6 leading-relaxed">{copy.homeTreatments.airjet.desc}</p>
                <img 
                  className="rounded-lg w-full aspect-square object-cover shadow-lg" 
                  src={IMG.hydrafacial} 
                  alt="Airjet facial treatment"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-4 group relative overflow-hidden rounded-xl bg-surface-container-low aspect-square md:aspect-auto">
            <img 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src={IMG.derma} 
              alt="Ultherapy skin tightening"
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-primary/80 to-transparent text-left">
              <p className="text-white/90 text-xs font-semibold tracking-widest uppercase mb-2">{copy.homeTreatments.ultherapy.subtitle}</p>
              <h3 className="text-2xl text-white mb-2">{copy.homeTreatments.ultherapy.title}</h3>
              <p className="text-white/90 text-sm leading-relaxed">{copy.homeTreatments.ultherapy.desc}</p>
            </div>
          </div>

          <div className="md:col-span-8 bg-white rounded-xl p-10 flex flex-col md:flex-row gap-8 items-center border border-primary/5">
            <div className="flex-1">
              <span className="text-secondary font-bold text-xs uppercase tracking-[0.2em] mb-2 block">{copy.homeTreatments.pixel8.eyebrow}</span>
              <h3 className="text-3xl text-on-surface mb-4">{copy.homeTreatments.pixel8.title}</h3>
              <p className="text-on-surface-variant mb-6 leading-relaxed">{copy.homeTreatments.pixel8.desc}</p>
              <button type="button" onClick={() => setPage('services')} className="bg-secondary text-on-secondary px-6 py-3 rounded-md text-sm font-bold">{copy.homeTreatments.pixel8.cta}</button>
            </div>
            <div className="flex-1 w-full">
              <img 
                className="rounded-xl w-full h-48 object-cover" 
                src={IMG.co2Laser} 
                alt="Pixel8 RF microneedling"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-24 bg-stone-100 overflow-hidden relative">
      <img
        src={IMG.antiAging}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-[0.05] pointer-events-none"
        aria-hidden
      />
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl text-on-surface">{copy.testimonials.title}</h2>
            <p className="text-on-surface-variant mt-4 text-sm leading-relaxed">{copy.testimonials.intro}</p>
            <div className="h-1 w-20 bg-primary-container mt-6"></div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollTestimonialsBy(-1)}
              className="h-11 w-11 rounded-full bg-white/90 ring-1 ring-stone-200 shadow-sm hover:bg-white transition-colors grid place-items-center text-stone-700"
              aria-label="Scroll reviews left"
            >
              <ArrowRight className="rotate-180" size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollTestimonialsBy(1)}
              className="h-11 w-11 rounded-full bg-white/90 ring-1 ring-stone-200 shadow-sm hover:bg-white transition-colors grid place-items-center text-stone-700"
              aria-label="Scroll reviews right"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={testimonialsTrackRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mx-8 px-8 hide-scrollbar"
          aria-label="Reviews carousel"
        >
          {copy.testimonials.items.map((t) => (
            <article
              key={t.initials}
              data-review-card="true"
              className={`snap-start shrink-0 w-[88%] sm:w-[420px] lg:w-[440px] bg-white p-8 rounded-xl shadow-sm border border-stone-200/50 ${
                'highlight' in t && t.highlight ? 'md:-translate-y-2 md:shadow-md' : ''
              }`}
            >
              <div className="flex text-primary mb-6">
                {[...Array(5)].map((_, j) => <Star key={j} size={18} fill="currentColor" />)}
              </div>
              <p className="italic text-on-surface-variant mb-8 leading-relaxed">{t.text}</p>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  'highlight' in t && t.highlight ? 'bg-secondary-container text-secondary' : 'bg-primary-container text-primary'
                }`}>
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-sm">{t.name}</h4>
                  <p className="text-xs text-on-surface-variant">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 px-8 relative overflow-hidden bg-primary text-on-primary">
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        <svg className="h-full w-full fill-current" viewBox="0 0 100 100">
          <circle cx="100" cy="50" r="50"></circle>
        </svg>
      </div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl mb-8 leading-tight">{copy.homeCta.title}</h2>
        <p className="text-lg md:text-xl text-primary-fixed mb-12 opacity-95 leading-relaxed max-w-2xl mx-auto">{copy.homeCta.body}</p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <a
            className="inline-flex items-center bg-white text-primary px-10 py-4 rounded-md font-bold text-lg hover:bg-primary-container transition-all shadow-xl gap-2"
            href={copy.homeCta.phoneTel}
          >
            <Phone size={22} /> {copy.homeCta.phoneDisplay}
          </a>
          <a
            className="flex items-center font-bold text-lg gap-2 hover:underline decoration-2 underline-offset-8 text-primary-fixed/95"
            href={copy.footer.mailto}
          >
            <Mail size={20} /> {copy.footer.email}
          </a>
        </div>
      </div>
    </section>
    </motion.div>
  );
};

const ServicesPage: React.FC = () => (
  <motion.div 
    key="services-page"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {/* Hero */}
    <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-28 pb-16">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          className="hero-bg-photo absolute inset-0 h-full w-full max-w-none object-cover object-center"
          src={IMG.facility1} 
          alt="Treatment lounge interior"
          sizes="100vw"
          decoding="sync"
          fetchPriority="high"
        />
        <div
          className="absolute inset-y-0 left-0 w-full max-w-[min(100%,52rem)] bg-gradient-to-r from-white/92 via-white/55 to-transparent pointer-events-none md:from-white/88 md:via-white/40"
          aria-hidden
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
        <div className="max-w-2xl rounded-2xl bg-white/92 px-6 py-8 shadow-lg shadow-black/10 ring-1 ring-black/5 backdrop-blur-md sm:px-8 sm:py-10">
          <span className="inline-block text-primary font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm mb-4">
            {copy.servicesPage.heroEyebrow}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline text-on-surface leading-tight mb-5">
            {copy.servicesPage.heroTitle}
          </h1>
          <p className="text-lg font-medium text-on-surface leading-relaxed max-w-xl">
            {copy.servicesPage.heroSub}
          </p>
        </div>
      </div>
    </section>

    {/* Featured (seasonal rule: hide Pico in winter) */}
    <section className="py-24 px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-xl">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-2">{copy.servicesPage.section1Label}</p>
          <h2 className="text-4xl text-on-surface mb-4 font-headline">
            {isWinter() ? copy.servicesPage.winterFeaturedTitle : copy.servicesPage.section1Title}
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            {isWinter() ? copy.servicesPage.winterFeaturedDesc : copy.servicesPage.section1Desc}
          </p>
        </div>
        <div className="text-secondary tracking-widest text-sm border-b border-outline-variant/30 pb-2 uppercase font-bold">Physician-guided</div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        <div className="md:col-span-7 group relative overflow-hidden rounded-xl bg-white transition-all hover:shadow-2xl border border-stone-100">
          <div className="aspect-[16/9] overflow-hidden">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src={isWinter() ? IMG.derma : IMG.ipl} 
              alt={isWinter() ? 'Ultherapy skin tightening' : 'Pico laser treatment'}
            />
          </div>
          <div className="p-8">
            <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
              <h3 className="text-2xl font-headline text-on-surface">
                {isWinter() ? copy.servicesPage.winterFeaturedCardTitle : copy.servicesPage.section1Title}
              </h3>
              <span className="text-primary font-semibold text-sm">
                {isWinter() ? copy.servicesPage.winterFeaturedPrice : copy.servicesPage.section1Price}
              </span>
            </div>
            <p className="text-on-surface-variant mb-6 leading-relaxed">
              {isWinter() ? copy.servicesPage.winterFeaturedCardDesc : copy.servicesPage.section1Desc}
            </p>
            <a href={copy.homeCta.phoneTel} className="text-primary font-medium inline-flex items-center gap-2 group-hover:translate-x-2 transition-transform">
              {isWinter() ? copy.servicesPage.winterFeaturedCta : copy.servicesPage.section1Cta} <ArrowRight size={16} />
            </a>
          </div>
        </div>
        
        <div className="md:col-span-5 flex flex-col gap-8">
          <div className="bg-surface-container-low p-8 rounded-xl flex-1 flex flex-col justify-center">
            <span className="text-secondary text-xs tracking-widest uppercase mb-2 font-bold">{copy.servicesPage.cardUltherapy.subtitle}</span>
            <img
              src={IMG.derma}
              alt=""
              className="w-full h-36 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-headline text-on-surface mb-2">{copy.servicesPage.cardUltherapy.title}</h3>
            <p className="text-on-surface-variant text-sm mb-4 leading-relaxed">{copy.servicesPage.cardUltherapy.desc}</p>
            <div className="flex justify-between items-center mt-auto">
              <span className="text-primary font-bold text-sm">{copy.servicesPage.cardUltherapy.price}</span>
              <Sparkles className="text-outline-variant" size={20} />
            </div>
          </div>
          <div className="bg-primary-container/20 p-8 rounded-xl flex-1 border border-primary/10">
            <span className="text-primary text-xs tracking-widest uppercase mb-2 font-bold">{copy.servicesPage.cardOligio.subtitle}</span>
            <img
              src={IMG.skinBoosting}
              alt=""
              className="w-full h-36 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-headline text-primary mb-2">{copy.servicesPage.cardOligio.title}</h3>
            <p className="text-on-surface-variant text-sm mb-4 leading-relaxed">{copy.servicesPage.cardOligio.desc}</p>
            <span className="text-primary font-bold text-sm">{copy.servicesPage.cardOligio.price}</span>
          </div>
        </div>
      </div>
    </section>

    {/* Categories & Featured Services */}
    <section className="bg-surface-container-low py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl text-on-surface mb-4">{copy.servicesPage.categoriesTitle}</h2>
          <p className="text-on-surface-variant max-w-3xl mx-auto leading-relaxed">{copy.servicesPage.categoriesIntro}</p>
          <div className="w-16 h-1 bg-primary-container mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {copy.servicesPage.categories.map((cat) => {
            const items = isWinter() && cat.title === 'Skin Rejuvenation'
              ? cat.items.filter((i) => i !== 'Pico Laser')
              : cat.items;
            return (
            <div key={cat.title} className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100">
              <h3 className="text-xl font-headline text-primary mb-4">{cat.title}</h3>
              <ul className="space-y-2 text-on-surface-variant text-sm leading-relaxed">
                {items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[0.3rem] h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="mb-24 px-8 max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-primary to-primary-container rounded-2xl p-12 text-center text-on-primary shadow-2xl relative overflow-hidden">
        <img
          src={IMG.tattooRemoval}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-overlay"
          aria-hidden
        />
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-black/10 blur-3xl"></div>
        <h2 className="text-3xl md:text-4xl mb-6 relative z-10">{copy.servicesPage.seasonalCtaTitle}</h2>
        <p className="text-on-primary/90 mb-10 max-w-xl mx-auto leading-relaxed relative z-10">
          {copy.servicesPage.seasonalCtaBody}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
          <a
            href={copy.homeCta.phoneTel}
            className="bg-white text-primary px-10 py-4 rounded-md font-bold hover:bg-surface transition-colors shadow-lg inline-flex items-center justify-center gap-2"
          >
            <Phone size={18} /> {copy.homeCta.phoneDisplay}
          </a>
          <a
            href={copy.footer.mailto}
            className="border border-white/40 text-white px-10 py-4 rounded-md font-medium hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
          >
            <Mail size={18} /> Email us
          </a>
        </div>
      </div>
    </section>
  </motion.div>
);

const ClientDashboard: React.FC<{ user: FirebaseUser }> = ({ user }) => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'appointments' | 'profile'>('appointments');

  useEffect(() => {
    const unsubscribe = getClientBookings(user.uid, setBookings);
    return () => unsubscribe();
  }, [user.uid]);

  const upcoming = bookings.filter(b => b.status === 'pending' || b.status === 'confirmed');
  const past = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-headline mb-2">Welcome back, {user.displayName?.split(' ')[0]}</h1>
          <p className="text-on-surface-variant">Manage appointments and your treatment plan with Celine Medical Spa.</p>
        </div>
        <div className="flex bg-stone-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${
              activeTab === 'appointments' ? 'bg-white shadow-sm text-primary' : 'text-stone-400 hover:text-on-surface'
            }`}
          >
            Appointments
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${
              activeTab === 'profile' ? 'bg-white shadow-sm text-primary' : 'text-stone-400 hover:text-on-surface'
            }`}
          >
            Profile
          </button>
        </div>
      </div>

      {activeTab === 'appointments' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            <section>
              <h2 className="text-2xl mb-6 flex items-center gap-3">
                <Calendar className="text-primary" size={24} /> Upcoming Appointments
              </h2>
              {upcoming.length > 0 ? (
                <div className="space-y-4">
                  {upcoming.map((b) => (
                    <div key={b.id} className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex items-center gap-6 w-full md:w-auto">
                        <div className="bg-stone-50 p-4 rounded-lg text-center min-w-[80px]">
                          <p className="text-xs font-bold text-primary uppercase">{b.date.split('-')[1]}</p>
                          <p className="text-2xl font-bold">{b.date.split('-')[2]}</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{b.serviceName}</h4>
                          <p className="text-sm text-on-surface-variant flex items-center gap-1">
                            <User size={14} /> {b.specialistName}
                          </p>
                          <p className="text-sm text-on-surface-variant flex items-center gap-1">
                            <Clock size={14} /> {b.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          b.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {b.status}
                        </span>
                        {b.status !== 'cancelled' && (
                          <button 
                            onClick={() => updateBookingStatus(b.id, 'cancelled')}
                            className="text-red-500 text-sm font-bold hover:underline"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-stone-50 border-2 border-dashed border-stone-200 rounded-xl p-12 text-center">
                  <p className="text-on-surface-variant mb-4">No upcoming appointments found.</p>
                  {/* Book Now hidden per request
                  <button className="text-primary font-bold hover:underline">Book a Treatment</button>
                  */}
                </div>
              )}
            </section>

            <section>
              <h2 className="text-2xl mb-6 flex items-center gap-3">
                <ClipboardList className="text-stone-400" size={24} /> Past Treatments
              </h2>
              <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-stone-50 text-xs uppercase font-bold text-stone-400">
                    <tr>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Service</th>
                      <th className="px-6 py-4">Specialist</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {past.map((b) => (
                      <tr key={b.id}>
                        <td className="px-6 py-4 text-sm">{b.date}</td>
                        <td className="px-6 py-4 text-sm font-medium">{b.serviceName}</td>
                        <td className="px-6 py-4 text-sm text-on-surface-variant">{b.specialistName}</td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-bold uppercase ${
                            b.status === 'completed' ? 'text-green-600' : 'text-red-400'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-primary text-on-primary p-8 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl mb-4">Skin Health Score</h3>
                <div className="flex items-end gap-2 mb-6">
                  <span className="text-5xl font-headline">84</span>
                  <span className="text-primary-fixed opacity-70 mb-2">/100</span>
                </div>
                <p className="text-sm opacity-80 mb-6">Your skin hydration levels have improved by 12% since your last HydraFacial.</p>
                <button className="w-full bg-white text-primary py-3 rounded-lg font-bold text-sm">View Analysis</button>
              </div>
              <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
              <h3 className="text-lg mb-6 font-bold">Recommended for You</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <img src={IMG.acne} className="w-16 h-16 rounded-lg object-cover" alt="" />
                  <div>
                    <h4 className="text-sm font-bold">Vitamin C Serum</h4>
                    <p className="text-xs text-on-surface-variant">Daily antioxidant protection.</p>
                    <p className="text-primary font-bold text-sm mt-1">$85</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <img src={IMG.coolSculpt} className="w-16 h-16 rounded-lg object-cover" alt="" />
                  <div>
                    <h4 className="text-sm font-bold">Retinol Night Cream</h4>
                    <p className="text-xs text-on-surface-variant">Advanced cellular renewal.</p>
                    <p className="text-primary font-bold text-sm mt-1">$120</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
          <h2 className="text-2xl mb-8">Your Profile</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-6 pb-8 border-b border-stone-50">
              <img src={user.photoURL || ''} className="w-20 h-20 rounded-full" alt="" />
              <div>
                <button className="text-primary font-bold text-sm">Change Photo</button>
                <p className="text-xs text-stone-400 mt-1">JPG or PNG, max 2MB.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-stone-400">Full Name</label>
                <input defaultValue={user.displayName || ''} className="w-full p-3 rounded-lg border border-stone-200 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-stone-400">Email Address</label>
                <input disabled defaultValue={user.email || ''} className="w-full p-3 rounded-lg border border-stone-200 bg-stone-50 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-stone-400">Phone Number</label>
                <input placeholder="+1 (555) 000-0000" className="w-full p-3 rounded-lg border border-stone-200 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-stone-400">Date of Birth</label>
                <input type="date" className="w-full p-3 rounded-lg border border-stone-200 outline-none" />
              </div>
            </div>
            <button className="w-full bg-primary text-on-primary py-4 rounded-lg font-bold mt-8">Save Changes</button>
          </div>
        </div>
      )}
    </div>
  );
};

const MerchantDashboard = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [activeTab, setActiveTab] = useState<'bookings' | 'services' | 'specialists' | 'settings'>('bookings');
  const [isAddingService, setIsAddingService] = useState(false);
  const [isAddingSpecialist, setIsAddingSpecialist] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingSpecialist, setEditingSpecialist] = useState<Specialist | null>(null);

  useEffect(() => {
    const unsubscribe = getMerchantBookings(setBookings);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setServices(await getServices() || []);
      setSpecialists(await getSpecialists() || []);
    };
    fetchData();
  }, [isAddingService, isAddingSpecialist, editingService, editingSpecialist]);

  const pending = bookings.filter(b => b.status === 'pending');
  const confirmed = bookings.filter(b => b.status === 'confirmed');
  const revenue = bookings.reduce((acc, b) => acc + (b.status === 'completed' ? b.price : 0), 0);

  const handleAddService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const service = {
      name: formData.get('name') as string,
      duration: parseInt(formData.get('duration') as string),
      price: parseFloat(formData.get('price') as string),
      description: formData.get('description') as string,
      category: formData.get('category') as string
    };
    if (editingService) {
      await updateService(editingService.id, service);
      setEditingService(null);
    } else {
      await addService(service);
      setIsAddingService(false);
    }
  };

  const handleAddSpecialist = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const specialist = {
      name: formData.get('name') as string,
      role: formData.get('role') as string,
      image: formData.get('image') as string,
      bio: formData.get('bio') as string
    };
    if (editingSpecialist) {
      await updateSpecialist(editingSpecialist.id, specialist);
      setEditingSpecialist(null);
    } else {
      await addSpecialist(specialist);
      setIsAddingSpecialist(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-headline mb-2">Merchant Command</h1>
          <p className="text-on-surface-variant">Oversee your spa operations and growth.</p>
        </div>
        <div className="flex bg-stone-100 p-1 rounded-lg">
          {(['bookings', 'services', 'specialists', 'settings'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${
                activeTab === tab ? 'bg-white shadow-sm text-primary' : 'text-stone-400 hover:text-on-surface'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'bookings' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Total Revenue', value: `$${revenue.toLocaleString()}`, icon: <TrendingUp />, color: 'bg-green-50 text-green-600' },
              { label: 'Active Bookings', value: confirmed.length, icon: <Calendar />, color: 'bg-blue-50 text-blue-600' },
              { label: 'Pending Requests', value: pending.length, icon: <Clock />, color: 'bg-amber-50 text-amber-600' },
              { label: 'Client Retention', value: '78%', icon: <User />, color: 'bg-purple-50 text-purple-600' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.color}`}>
                  {stat.icon}
                </div>
                <p className="text-xs uppercase font-bold text-stone-400 mb-1">{stat.label}</p>
                <p className="text-3xl font-headline text-on-surface">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <section className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
                <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                  <h2 className="text-xl font-headline">Recent Booking Requests</h2>
                  <button className="text-primary text-sm font-bold">View All</button>
                </div>
                <div className="divide-y divide-stone-100">
                  {pending.length > 0 ? pending.map((b) => (
                    <div key={b.id} className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                          <User size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold">{b.serviceName}</h4>
                          <p className="text-sm text-on-surface-variant">Client ID: {b.clientId.slice(0, 8)}...</p>
                          <p className="text-xs text-stone-400 mt-1">{b.date} at {b.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 w-full md:w-auto">
                        <button 
                          onClick={() => updateBookingStatus(b.id, 'confirmed')}
                          className="flex-1 md:flex-none bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-bold"
                        >
                          Confirm
                        </button>
                        <button 
                          onClick={() => updateBookingStatus(b.id, 'cancelled')}
                          className="flex-1 md:flex-none border border-stone-200 px-4 py-2 rounded-lg text-sm font-bold text-on-surface-variant hover:bg-stone-50"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  )) : (
                    <div className="p-12 text-center text-on-surface-variant">
                      No pending requests at this time.
                    </div>
                  )}
                </div>
              </section>
            </div>

            <div className="lg:col-span-4">
              <section className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
                <h2 className="text-xl font-headline mb-6">Staff Availability</h2>
                <div className="space-y-6">
                  {specialists.map((staff, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <img src={staff.image || ''} className="w-10 h-10 rounded-full bg-stone-100 object-cover" alt="" />
                        <div>
                          <p className="text-sm font-bold">{staff.name}</p>
                          <p className="text-xs text-on-surface-variant">{staff.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full bg-green-500`}></div>
                        <span className="text-xs font-medium text-on-surface-variant">Available</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </>
      )}

      {activeTab === 'services' && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-headline">Manage Services</h2>
            <button 
              onClick={() => setIsAddingService(true)}
              className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold"
            >
              Add New Service
            </button>
          </div>

          {(isAddingService || editingService) && (
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-primary/10">
              <h3 className="text-xl mb-6">{editingService ? 'Edit Service' : 'Add New Service'}</h3>
              <form onSubmit={handleAddService} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-400">Service Name</label>
                  <input name="name" defaultValue={editingService?.name} required className="w-full p-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-400">Category</label>
                  <input name="category" defaultValue={editingService?.category} required className="w-full p-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-400">Duration (min)</label>
                  <input name="duration" type="number" defaultValue={editingService?.duration} required className="w-full p-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-400">Price ($)</label>
                  <input name="price" type="number" step="0.01" defaultValue={editingService?.price} required className="w-full p-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-400">Description</label>
                  <textarea name="description" defaultValue={editingService?.description} className="w-full p-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-primary outline-none h-24" />
                </div>
                <div className="md:col-span-2 flex justify-end gap-4">
                  <button type="button" onClick={() => { setIsAddingService(false); setEditingService(null); }} className="px-6 py-2 text-stone-400 font-bold">Cancel</button>
                  <button type="submit" className="bg-primary text-on-primary px-8 py-2 rounded-lg font-bold">Save Service</button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => (
              <div key={service.id} className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-lg">{service.name}</h4>
                    <p className="text-xs text-stone-400 uppercase tracking-widest">{service.category}</p>
                  </div>
                  <span className="font-bold text-primary">${service.price}</span>
                </div>
                <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">{service.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-stone-50">
                  <span className="text-xs text-stone-400">{service.duration} min</span>
                  <div className="flex gap-4">
                    <button onClick={() => setEditingService(service)} className="text-primary text-xs font-bold">Edit</button>
                    <button onClick={() => deleteService(service.id)} className="text-red-500 text-xs font-bold">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'specialists' && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-headline">Manage Specialists</h2>
            <button 
              onClick={() => setIsAddingSpecialist(true)}
              className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold"
            >
              Add New Specialist
            </button>
          </div>

          {(isAddingSpecialist || editingSpecialist) && (
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-primary/10">
              <h3 className="text-xl mb-6">{editingSpecialist ? 'Edit Specialist' : 'Add New Specialist'}</h3>
              <form onSubmit={handleAddSpecialist} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-400">Name</label>
                  <input name="name" defaultValue={editingSpecialist?.name} required className="w-full p-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-400">Role</label>
                  <input name="role" defaultValue={editingSpecialist?.role} required className="w-full p-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-400">Image URL</label>
                  <input name="image" defaultValue={editingSpecialist?.image} className="w-full p-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-400">Bio</label>
                  <textarea name="bio" defaultValue={editingSpecialist?.bio} className="w-full p-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-primary outline-none h-24" />
                </div>
                <div className="md:col-span-2 flex justify-end gap-4">
                  <button type="button" onClick={() => { setIsAddingSpecialist(false); setEditingSpecialist(null); }} className="px-6 py-2 text-stone-400 font-bold">Cancel</button>
                  <button type="submit" className="bg-primary text-on-primary px-8 py-2 rounded-lg font-bold">Save Specialist</button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {specialists.map(staff => (
              <div key={staff.id} className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 flex flex-col items-center text-center">
                <img src={staff.image || ''} className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-stone-50" alt="" />
                <h4 className="font-bold text-lg">{staff.name}</h4>
                <p className="text-xs text-primary uppercase tracking-widest mb-4">{staff.role}</p>
                <div className="flex gap-4 mt-auto pt-4 border-t border-stone-50 w-full justify-center">
                  <button onClick={() => setEditingSpecialist(staff)} className="text-primary text-xs font-bold">Edit</button>
                  <button onClick={() => deleteSpecialist(staff.id)} className="text-red-500 text-xs font-bold">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="max-w-2xl space-y-8">
          <h2 className="text-2xl font-headline">Booking Rules & Settings</h2>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 space-y-8">
            <div className="space-y-4">
              <h3 className="font-bold text-on-surface">General Rules</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-400">Lead Time (Hours)</label>
                  <input type="number" defaultValue={24} className="w-full p-3 rounded-lg border border-stone-200 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-400">Cancellation Window (Hours)</label>
                  <input type="number" defaultValue={48} className="w-full p-3 rounded-lg border border-stone-200 outline-none" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-on-surface">Business Hours</h3>
              <div className="space-y-3">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <div key={day} className="flex justify-between items-center p-3 bg-stone-50 rounded-lg">
                    <span className="text-sm font-medium">{day}</span>
                    <div className="flex items-center gap-3">
                      <input type="time" defaultValue="09:00" className="bg-transparent text-sm outline-none" />
                      <span className="text-stone-400">—</span>
                      <input type="time" defaultValue="18:00" className="bg-transparent text-sm outline-none" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full bg-primary text-on-primary py-4 rounded-lg font-bold">Save All Settings</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        }
      } else {
        setRole(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const seedIfEmpty = async () => {
      const s = await getServices();
      if (s && s.length === 0) {
        for (const service of copy.seedServices) {
          await setDoc(doc(collection(db, 'services')), { ...service });
        }
      }
      const sp = await getSpecialists();
      if (sp && sp.length === 0) {
        const initialSpecialists = [
          { name: 'Dr. Elena Rossi', role: 'Medical Director', image: IMG.microServices, bio: 'Board-certified guidance with a prevention-first approach to aesthetics.' },
          { name: 'Sarah Jenkins', role: 'Lead Aesthetician', image: IMG.skinTightening, bio: 'Specialist in device-based skin tightening and personalized treatment planning.' }
        ];
        for (const specialist of initialSpecialists) {
          await setDoc(doc(collection(db, 'specialists')), specialist);
        }
      }
    };
    seedIfEmpty();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-primary font-headline tracking-widest uppercase text-sm">{SITE_NAME}</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <Navbar currentPage={page} setPage={setPage} user={user} role={role} />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            {page === 'home' && <HomePage key="home" setPage={setPage} />}
            {page === 'services' && <ServicesPage key="services" />}
            {page === 'client-dashboard' && user && <ClientDashboard key="client-dashboard" user={user} />}
            {page === 'merchant-dashboard' && user && role === 'merchant' && <MerchantDashboard key="merchant-dashboard" />}
          </AnimatePresence>
        </main>
        <Footer setPage={setPage} />
      </div>
    </ErrorBoundary>
  );
}
