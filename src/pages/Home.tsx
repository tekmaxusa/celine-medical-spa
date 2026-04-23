import { ArrowUpRight, ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IMG } from '../siteImages';

/** Hash targets `Services` page cards (`serviceAnchorId` must match). */
const SERVICES = [
  {
    id: 'pico-laser',
    servicesHash: 'pico-laser',
    title: 'Pico Laser',
    description: 'Precision laser treatment for pigmentation, sun spots, acne scars, and tattoo removal.',
    tags: ['Tone', 'Pigment', 'Tattoos'],
    benefits: ['Clearer tone and brighter skin', 'Targeted spot removal', 'Seasonally smart planning']
  },
  {
    id: 'ultherapy',
    servicesHash: 'ultratherapy-lift',
    title: 'Ultherapy',
    description: 'Focused ultrasound technology that supports collagen at deeper layers for non-surgical lifting.',
    tags: ['Lift', 'Tighten'],
    benefits: ['Natural tightening', 'Jawline/neck support', 'Collagen stimulation']
  },
  {
    id: 'pixel8-rf',
    servicesHash: 'microneedling',
    title: 'Pixel8 RF',
    description: 'RF microneedling booster for skin tightening, texture refinement, and collagen.',
    tags: ['Texture', 'Firmness'],
    benefits: ['Improves texture', 'Supports firmness', 'Collagen renewal']
  },
  {
    id: 'oligio-rf',
    servicesHash: 'oligio-skin-tightening',
    title: 'Oligio RF',
    description: 'Radiofrequency skin tightening designed for refined, gradual improvement over time.',
    tags: ['Tighten', 'Maintain'],
    benefits: ['Elasticity support', 'Low-disruption care', 'Long-term planning']
  },
  {
    id: 'fracsono',
    servicesHash: 'laser-skin-resurfacing',
    title: 'Fracsono',
    description: 'Advanced facial treatment to support skin vitality, firmness, and overall glow.',
    tags: ['Rejuvenation'],
    benefits: ['Improves vitality', 'Maintenance-focused', 'Gentle approach']
  },
  {
    id: 'airjet',
    servicesHash: 'hydrafacial',
    title: 'Airjet Facial',
    description: 'Skin facial tightening and rejuvenation that supports hydration and a refreshed appearance.',
    tags: ['Lift', 'Tighten'],
    benefits: ['Hydration support', 'Comfort-forward', 'Great for upkeep']
  }
];

const TESTIMONIALS = [
  {
    name: "Jiwon Chun",
    treatment: "Consultation & Care",
    text: "Everyone here is so welcoming and kind, Dr. Chae really takes his time to understand what you’re wanting and gives personalized recommendations. I had an amazing experience.",
  },
  {
    name: "Jill Feldberg",
    treatment: "Facial Treatment",
    text: "Rachel is amazing! Gave me the best facial treatment ever! I highly recommend her & Celine Medical Spa. Outstanding service.",
  },
  {
    name: "Jennifer Myers",
    treatment: "Skin Revision",
    text: "I had a wonderful experience at Celine Med Spa. Jennifer was attentive and helped me with all of my needs. The spa was relaxing and beautiful!",
  }
];

const HERO_SLIDES = [
  {
    src: IMG.heroReceptionPortrait,
    alt: 'Reception desk and Celine Medical Spa signage on a modern slatted wall.',
  },
  {
    src: IMG.heroConsultation,
    alt: 'Physician examining a client during a medical spa consultation in a bright, modern clinic.',
  },
  {
    src: IMG.heroTreatmentSuite,
    alt: 'Luxury treatment room with illuminated arch, treatment bed, and professional skincare display.',
  },
  {
    src: IMG.heroTreatmentRoom,
    alt: 'Medical spa treatment room with professional chair, equipment, and clean white finishes.',
  },
] as const;

function useHorizontalDrag(ref: React.RefObject<HTMLElement | null>) {
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onDown = (e: MouseEvent) => {
      isDragging.current = true;
      startX.current = e.pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
      el.style.cursor = 'grabbing';
    };
    const onUp = () => { isDragging.current = false; el.style.cursor = 'grab'; };
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      el.scrollLeft = scrollLeft.current - (e.pageX - el.offsetLeft - startX.current);
    };
    el.addEventListener('mousedown', onDown);
    el.addEventListener('mouseup', onUp);
    el.addEventListener('mouseleave', onUp);
    el.addEventListener('mousemove', onMove);
    return () => {
      el.removeEventListener('mousedown', onDown);
      el.removeEventListener('mouseup', onUp);
      el.removeEventListener('mouseleave', onUp);
      el.removeEventListener('mousemove', onMove);
    };
  }, [ref]);
}

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const expectSliderRef = useRef<HTMLDivElement>(null);
  const servicesSliderRef = useRef<HTMLDivElement>(null);
  const reviewsSliderRef = useRef<HTMLDivElement>(null);
  const heroTouchStart = useRef<number | null>(null);
  useHorizontalDrag(expectSliderRef);
  useHorizontalDrag(servicesSliderRef);
  useHorizontalDrag(reviewsSliderRef);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleHeroTouchStart = (e: React.TouchEvent) => {
    heroTouchStart.current = e.touches[0].clientX;
  };

  const handleHeroTouchEnd = (e: React.TouchEvent) => {
    if (heroTouchStart.current === null) return;
    const delta = heroTouchStart.current - e.changedTouches[0].clientX;
    heroTouchStart.current = null;
    if (Math.abs(delta) < 30) return; // ignore tiny taps
    setCurrentImageIndex((prev) =>
      delta > 0
        ? (prev + 1) % HERO_SLIDES.length
        : (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
    );
  };

  return (
    <div className="pt-[5rem] md:pt-[3.75rem] lg:pt-[4.75rem]">
      {/* Refined Hero Section - Full Half Split */}
      <section className="grid grid-cols-1 border-b border-line bg-pure lg:h-[min(840px,calc(100svh-4.75rem))] lg:min-h-0 lg:grid-cols-2" >
        {/* Image Half */}
        <div 
          className="order-1 lg:order-2 relative w-full aspect-video max-lg:max-h-[min(240px,52vw)] lg:aspect-auto lg:max-h-none min-h-0 lg:min-h-0 lg:h-full overflow-hidden bg-warm-sand"
          aria-roledescription="carousel"
          aria-label="Photos of Celine Medical Spa"
          onTouchStart={handleHeroTouchStart}
          onTouchEnd={handleHeroTouchEnd}
        >
          {HERO_SLIDES.map((slide, idx) => (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              aria-hidden={idx !== currentImageIndex}
              className={`absolute inset-0 w-full h-full object-cover ${idx === currentImageIndex ? 'opacity-100 z-[1]' : 'opacity-0 z-0'}`}
            />
          ))}

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {HERO_SLIDES.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentImageIndex(idx)}
                className={`h-1 rounded-full ${idx === currentImageIndex ? 'bg-pure w-8' : 'bg-pure/40 w-4 hover:bg-pure/60'}`}
              />
            ))}
          </div>
        </div>

        {/* Text Half */}
        <div className="order-2 lg:order-1 flex items-center justify-center p-8 md:p-14 lg:py-12 lg:px-16 min-h-0 lg:h-full lg:overflow-y-auto bg-pure">
          <div className="max-w-[540px] w-full">
            <span className="text-[10px] uppercase tracking-[0.3em] font-light text-slate/60 mb-5 block">
              Physician-Supervised Aesthetics in Plano
            </span>
            
            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-ink leading-[1.1] mb-5">
                Luxury Aesthetic <br />Care for <br />
                <span className="text-terracotta italic">Long Term Skin Health</span>
              </h1>
              <a href="tel:9727506100" className="inline-flex items-center justify-center px-12 py-4 bg-terracotta text-pure text-xs uppercase tracking-widest font-medium rounded-[4px] hover:bg-sunset shadow-lg shadow-ink/10">
                Call Us
              </a>
            </div>

            <div className="pt-10 border-t border-line">
              <h2 className="text-2xl md:text-3xl font-light tracking-tight text-ink mb-5">
                The New Standard of Self-Care
              </h2>
              <p className="text-slate text-sm md:text-base font-light leading-relaxed mb-8">
                Inspired by Korean K‑beauty and grounded in medical‑grade expertise, we help you refine, restore, and maintain your skin without pressure, shortcuts, or chasing every trend.
              </p>
              <a href="tel:9727506100" className="inline-block px-8 py-4 border border-line text-ink text-xs uppercase tracking-widest font-light rounded-[4px] hover:border-terracotta hover:text-terracotta bg-pure">
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-24 md:py-32 border-t border-line bg-warm-sand">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16 md:mb-24">
            <div className="flex flex-col items-center">
              <div className="w-px h-10 bg-terracotta mb-6"></div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-light text-terracotta mb-4">Med-Aesthetic Ethos</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-ink mb-8">
                Prevention <span className="italic text-terracotta">Over</span> Correction
              </h2>
              <div className="max-w-2xl text-slate text-sm md:text-base font-light leading-relaxed space-y-4">
                <p>
                  The best aesthetic outcomes are rarely the most dramatic—they&apos;re the most intentional. Our philosophy blends gentle, preventative K‑beauty principles with medically guided treatments to support collagen, skin integrity, and facial harmony over time.
                </p>
                <p>
                  We don&apos;t rush decisions. We build plans that make sense for your goals, your skin, and your lifestyle.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-y border-line divide-y md:divide-y-0 md:divide-x divide-line bg-pure shadow-sm">
            {[
              { title: "Gentle Consistency", desc: "We treat skin as a lifelong investment. Our methods prioritize the long-term health of your barrier." },
              { title: "Deeper Integrity", desc: "Targeting structural layers with medically-supervised techniques that protect collagen." },
              { title: "The Balanced Look", desc: "The best work is invisible. You should leave our clinic feeling like yourself, simply more rested." }
            ].map((item, idx) => (
              <div
                key={item.title}
                className="p-10 md:p-16 group hover:bg-warm-sand/50 cursor-default"
              >
                <h3 className="text-3xl font-light tracking-tight text-ink mb-6 group-hover:text-terracotta flex items-baseline gap-3">
                  <span className="text-3xl text-terracotta/40 shrink-0">0{idx + 1}</span>
                  {item.title}
                </h3>
                <p className="text-slate font-light leading-relaxed text-sm md:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-24 md:py-40 bg-warm-light border-t border-line">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <span className="text-[10px] uppercase tracking-[0.3em] font-light text-terracotta mb-4 block">What to Expect</span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-ink">A Calm, Unrushed Experience</h2>
          </div>

          <div ref={expectSliderRef} className="overflow-x-auto scrollbar-hide -mx-6 cursor-grab" style={{ scrollbarWidth: 'none' }}>
            <div
              className="flex gap-6 pb-4 select-none snap-x snap-mandatory w-max mx-auto px-6"
            >
              {[
                { title: "Consultations are conversations", badge: "No pressure", desc: "We start by listening—your concerns, your timeline, and the results you want to see. Then we explain options clearly, including what's appropriate, what's not, and why." },
                { title: "Medical-grade care, not shortcuts", badge: "Safety first", desc: "Every plan is guided by medical oversight and ethical decision-making. Our goal is long-term skin health, not quick trends." },
                { title: "Plans designed for longevity", badge: "Predictable results", desc: "We focus on treatments that age well, preserve facial harmony, and support your skin over time—so outcomes stay refined." },
                { title: "Clear guidance on timing", badge: "Seasonal logic", desc: "Some treatments perform best at specific times of year. We'll guide you on when to schedule for the safest, most effective results." }
              ].map((card) => (
                <div
                  key={card.title}
                  className="bg-pure p-10 rounded-tl-[100px] rounded-br-[100px] rounded-tr-[5px] rounded-bl-[5px] border border-line shadow-[0_30px_60px_rgba(200,121,65,0.05)] hover:shadow-[0_30px_60px_rgba(200,121,65,0.12)] group relative overflow-hidden shrink-0 w-[min(85vw,360px)] snap-start"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta/5 rounded-full -mr-16 -mt-16"></div>
                  <div className="flex flex-col gap-4 mb-8 relative z-10">
                    <h3 className="text-xl font-light italic tracking-tight text-ink">{card.title}</h3>
                    <span className="w-fit px-4 py-1.5 bg-warm-sand text-terracotta text-[10px] uppercase tracking-widest font-light rounded-full border border-terracotta/10">{card.badge}</span>
                  </div>
                  <p className="text-slate text-sm font-light leading-relaxed relative z-10">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-3 mt-6">
            <button onClick={() => expectSliderRef.current?.scrollBy({ left: -380, behavior: 'smooth' })} aria-label="Previous" className="flex items-center justify-center w-10 h-10 border border-line rounded-full hover:border-terracotta hover:text-terracotta text-ink/50 transition-colors">
              <ArrowLeft size={16} strokeWidth={1.5} />
            </button>
            <button onClick={() => expectSliderRef.current?.scrollBy({ left: 380, behavior: 'smooth' })} aria-label="Next" className="flex items-center justify-center w-10 h-10 border border-line rounded-full hover:border-terracotta hover:text-terracotta text-ink/50 transition-colors">
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </section>

      {/* Small Services Preview */}
      <section id="services" className="py-24 md:py-32 border-t border-line bg-warm-sand">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-4xl font-light tracking-tight mb-4">Services</h2>
            <h3 className="text-2xl md:text-3xl font-light tracking-tight max-w-2xl text-ink leading-snug">
              Anti-aging, clarity, and firmness—without turning care into a device catalog.
            </h3>
          </div>

          <div ref={servicesSliderRef} className="overflow-x-auto scrollbar-hide -mx-6 cursor-grab" style={{ scrollbarWidth: 'none' }}>
            <div
              className="flex gap-6 pb-4 select-none snap-x snap-mandatory w-max mx-auto px-6"
            >
              {SERVICES.map((service) => (
                <Link
                  key={service.id}
                  to={`/services#${service.servicesHash}`}
                  className="group block bg-pure border border-line p-8 hover:border-terracotta/30 shadow-sm hover:shadow-xl hover:shadow-terracotta/5 text-left no-underline text-inherit rounded-[2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta shrink-0 w-[min(85vw,320px)] snap-start"
                >
                  <div className="flex gap-2 mb-6">
                    {service.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-widest font-light text-terracotta bg-terracotta/5 border border-terracotta/10 px-2.5 py-1 rounded-sm">{tag}</span>
                    ))}
                  </div>
                  <h4 className="text-2xl font-light tracking-tight mb-3 flex items-center justify-between group-hover:text-terracotta">
                    {service.title}
                    <ArrowUpRight size={20} className="text-terracotta shrink-0" aria-hidden />
                  </h4>
                  <p className="text-base text-slate leading-relaxed font-light mb-6">{service.description}</p>
                  <div className="pt-6 border-t border-line">
                    <span className="text-[11px] uppercase tracking-widest text-terracotta mb-3 block font-light">Key Benefits</span>
                    <ul className="space-y-2">
                      {service.benefits.map((b, i) => (
                        <li key={i} className="text-sm text-ink/80 flex items-start gap-2 font-light">
                          <span className="text-terracotta mt-[2px] shrink-0 text-sm">●</span> {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-3 mt-6 mb-16">
            <button onClick={() => servicesSliderRef.current?.scrollBy({ left: -340, behavior: 'smooth' })} aria-label="Previous" className="flex items-center justify-center w-10 h-10 border border-line rounded-full hover:border-terracotta hover:text-terracotta text-ink/50 transition-colors">
              <ArrowLeft size={16} strokeWidth={1.5} />
            </button>
            <button onClick={() => servicesSliderRef.current?.scrollBy({ left: 340, behavior: 'smooth' })} aria-label="Next" className="flex items-center justify-center w-10 h-10 border border-line rounded-full hover:border-terracotta hover:text-terracotta text-ink/50 transition-colors">
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </div>
          <div className="text-center">
            <Link
              to="/services"
              className="inline-block px-12 py-5 bg-terracotta text-pure text-sm uppercase tracking-widest font-light rounded-[2px] hover:bg-sunset shadow-lg shadow-terracotta/20"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 md:py-40 border-t border-line bg-warm-light">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <span className="text-[10px] uppercase tracking-[0.3em] font-light text-terracotta mb-4 block">Voices of Confidence</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-ink">Patient Feedback</h2>
          </div>

          <div ref={reviewsSliderRef} className="overflow-x-auto scrollbar-hide -mx-6 cursor-grab" style={{ scrollbarWidth: 'none' }}>
            <div className="flex gap-6 pb-4 select-none snap-x snap-mandatory w-max mx-auto px-6">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  className="p-10 border border-line bg-pure shadow-sm hover:shadow-2xl hover:shadow-terracotta/5 shrink-0 w-[min(85vw,380px)] snap-start flex flex-col"
                >
                  <div className="text-terracotta mb-8">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 11H6C6 8.79086 7.79086 7 10 7V5C6.68629 5 4 7.68629 4 11V19H10V11ZM20 11H16C16 8.79086 17.79086 7 20 7V5C16.68629 5 14 7.68629 14 11V19H20V11Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <p className="text-sm leading-relaxed text-ink mb-10 font-light italic flex-grow">&quot;{t.text}&quot;</p>
                  <div className="pt-8 border-t border-line flex justify-between items-center">
                    <div>
                      <div className="font-light text-sm mb-0.5 text-ink">{t.name}</div>
                      <div className="text-[10px] uppercase tracking-widest text-terracotta font-light">{t.treatment}</div>
                    </div>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(star => <Star key={star} size={10} fill="var(--color-terracotta)" stroke="none" />)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-3 mt-6 mb-32">
            <button onClick={() => reviewsSliderRef.current?.scrollBy({ left: -400, behavior: 'smooth' })} aria-label="Previous" className="flex items-center justify-center w-10 h-10 border border-line rounded-full hover:border-terracotta hover:text-terracotta text-ink/50 transition-colors">
              <ArrowLeft size={16} strokeWidth={1.5} />
            </button>
            <button onClick={() => reviewsSliderRef.current?.scrollBy({ left: 400, behavior: 'smooth' })} aria-label="Next" className="flex items-center justify-center w-10 h-10 border border-line rounded-full hover:border-terracotta hover:text-terracotta text-ink/50 transition-colors">
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </div>

          {/* Consultation First Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 bg-pure border border-line rounded-[2px] overflow-hidden shadow-2xl shadow-terracotta/5">
            <div className="p-8 md:p-20 flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-[0.3em] font-light text-terracotta mb-8 block">Consultation First</span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-ink mb-8 leading-[1.1]">
                Start With Clarity— <br/>
                <span className="italic text-terracotta">Not Guesswork</span>
              </h2>
              <p className="text-slate text-base md:text-lg font-light leading-relaxed mb-12 max-w-xl">
                If you’re not sure what you need, you’re in the right place. Your consultation is designed to be educational and pressure-free. We’ll discuss goals, evaluate your skin, and explain options—including what we recommend and what we don’t.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a href="tel:9727506100" className="px-10 py-5 bg-terracotta text-pure text-[11px] uppercase tracking-widest font-light rounded-[2px] hover:bg-sunset shadow-lg shadow-terracotta/20 flex items-center justify-center w-full sm:w-auto">
                  Call to Schedule Consultation
                </a>
              </div>
            </div>
            <div className="relative bg-warm-sand lg:h-auto lg:min-h-full">
              <div className="flex flex-col p-0 lg:absolute lg:inset-0 lg:p-12">
                <div className="flex flex-col overflow-hidden rounded-b-[24px] lg:relative lg:h-full lg:rounded-[40px]">
                  <div className="relative overflow-hidden rounded-t-[24px] aspect-[4/3] lg:absolute lg:inset-0 lg:rounded-[40px] lg:aspect-auto">
                    <img
                      src={IMG.heroConsultation}
                      alt="Physician examining a client during a medical spa consultation in a bright, modern clinic."
                      className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex-none bg-warm-sand px-6 py-6 sm:px-8 sm:py-8 lg:absolute lg:left-auto lg:right-8 lg:top-8 lg:z-10 lg:max-w-[300px] lg:bg-transparent lg:px-0 lg:py-0">
                    <div className="flex flex-col lg:rounded-[20px] lg:border lg:border-line lg:bg-pure/95 lg:p-8 lg:shadow-2xl lg:backdrop-blur">
                      <span className="mb-3 block text-sm font-light uppercase tracking-[0.2em] text-terracotta sm:text-base">
                        What you can expect
                      </span>
                      <ul className="flex flex-col gap-1.5 lg:block lg:space-y-1.5">
                        {[
                          'Unrushed conversation about your goals',
                          'Skin and facial assessment',
                          'Clear recommendations and timing',
                          'No obligation to book treatment',
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm font-light leading-snug text-slate">
                            <span className="mt-[2px] shrink-0 text-sm text-terracotta" aria-hidden>
                              ●
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
