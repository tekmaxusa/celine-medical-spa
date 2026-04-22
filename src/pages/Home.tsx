import { motion } from 'motion/react';
import { ArrowUpRight, Phone, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IMG } from '../siteImages';

const SERVICES = [
  {
    id: 'pico-laser',
    title: 'Pico Laser',
    description: 'Precision laser treatment for pigmentation, sun spots, acne scars, and tattoo removal.',
    tags: ['Tone', 'Pigment', 'Tattoos'],
    benefits: ['Clearer tone and brighter skin', 'Targeted spot removal', 'Seasonally smart planning']
  },
  {
    id: 'ultherapy',
    title: 'Ultherapy',
    description: 'Focused ultrasound technology that supports collagen at deeper layers for non-surgical lifting.',
    tags: ['Lift', 'Tighten'],
    benefits: ['Natural tightening', 'Jawline/neck support', 'Collagen stimulation']
  },
  {
    id: 'pixel8-rf',
    title: 'Pixel8 RF',
    description: 'RF microneedling booster for skin tightening, texture refinement, and collagen.',
    tags: ['Texture', 'Firmness'],
    benefits: ['Improves texture', 'Supports firmness', 'Collagen renewal']
  },
  {
    id: 'oligio-rf',
    title: 'Oligio RF',
    description: 'Radiofrequency skin tightening designed for refined, gradual improvement over time.',
    tags: ['Tighten', 'Maintain'],
    benefits: ['Elasticity support', 'Low-disruption care', 'Long-term planning']
  },
  {
    id: 'fracsono',
    title: 'Fracsono',
    description: 'Advanced facial treatment to support skin vitality, firmness, and overall glow.',
    tags: ['Rejuvenation'],
    benefits: ['Improves vitality', 'Maintenance-focused', 'Gentle approach']
  },
  {
    id: 'airjet',
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

const HERO_IMAGES = [IMG.homeHero, IMG.facility1, IMG.facility2, IMG.homeHeroAlt];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-20">
      {/* Refined Hero Section - Full Half Split */}
      <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-line bg-pure lg:min-h-[600px]">
        {/* Image Half */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="order-1 lg:order-2 relative w-full aspect-[4/3] lg:aspect-auto min-h-[300px] lg:min-h-full overflow-hidden bg-warm-sand"
        >
          {HERO_IMAGES.map((img, idx) => (
            <motion.img
              key={img}
              src={img}
              initial={{ opacity: 0 }}
              animate={{ opacity: idx === currentImageIndex ? 1 : 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 w-full h-full object-cover grayscale-[0.1] contrast-[1.05]"
            />
          ))}
          
          <div className="absolute inset-0 bg-ink/5 mix-blend-multiply"></div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {HERO_IMAGES.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentImageIndex(idx)}
                className={`h-1 rounded-full transition-all ${idx === currentImageIndex ? 'bg-pure w-8' : 'bg-pure/40 w-4 hover:bg-pure/60'}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Text Half */}
        <div className="order-2 lg:order-1 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-pure">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-[540px] w-full"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate/60 mb-6 block">
              Physician-Supervised Aesthetics in Plano
            </span>
            
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.1] mb-6">
                Luxury Aesthetic <br />Care for <br />
                <span className="text-terracotta italic">Long Term Skin Health</span>
              </h1>
              <a href="tel:9727506100" className="inline-flex items-center gap-3 px-12 py-4 bg-[#5F7A7D] text-pure text-xs uppercase tracking-widest font-bold rounded-[4px] hover:bg-sunset transition-all shadow-lg shadow-ink/10">
                <Phone size={14} />
                Call Us
              </a>
            </div>

            <div className="pt-12 border-t border-line">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-ink mb-6">
                The New Standard of Self-Care
              </h2>
              <p className="text-slate text-sm md:text-base font-light leading-relaxed mb-10">
                Inspired by Korean K‑beauty and grounded in medical‑grade expertise, we help you refine, restore, and maintain your skin without pressure, shortcuts, or chasing every trend.
              </p>
              <Link to="/services" className="inline-block px-8 py-4 border border-line text-ink text-xs uppercase tracking-widest font-bold rounded-[4px] hover:border-terracotta hover:text-terracotta transition-all bg-pure">
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-24 md:py-32 border-t border-line bg-warm-sand">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="w-px h-10 bg-terracotta mb-6"></div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-terracotta mb-4">Med-Aesthetic Ethos</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-8">
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
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-y border-line divide-y md:divide-y-0 md:divide-x divide-line bg-pure shadow-sm">
            {[
              { title: "Gentle Consistency", desc: "We treat skin as a lifelong investment. Our methods prioritize the long-term health of your barrier." },
              { title: "Deeper Integrity", desc: "Targeting structural layers with medically-supervised techniques that protect collagen." },
              { title: "The Balanced Look", desc: "The best work is invisible. You should leave our clinic feeling like yourself, simply more rested." }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="p-10 md:p-16 group hover:bg-warm-sand/50 transition-colors cursor-default"
              >
                <div className="text-[11px] font-mono text-terracotta/40 mb-12 block font-bold">Section — 0{idx + 1}</div>
                <h3 className="text-3xl font-bold tracking-tight text-ink mb-6 group-hover:text-terracotta transition-colors">{item.title}</h3>
                <p className="text-slate font-light leading-relaxed text-sm md:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-24 md:py-40 bg-warm-light border-t border-line">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-terracotta mb-4 block">What to Expect</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-ink">A Calm, Unrushed Experience</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {[
              { title: "Consultations are conversations", badge: "No pressure", desc: "We start by listening—your concerns, your timeline, and the results you want to see. Then we explain options clearly, including what's appropriate, what's not, and why." },
              { title: "Medical-grade care, not shortcuts", badge: "Safety first", desc: "Every plan is guided by medical oversight and ethical decision-making. Our goal is long-term skin health, not quick trends." },
              { title: "Plans designed for longevity", badge: "Predictable results", desc: "We focus on treatments that age well, preserve facial harmony, and support your skin over time—so outcomes stay refined." },
              { title: "Clear guidance on timing", badge: "Seasonal logic", desc: "Some treatments perform best at specific times of year. We'll guide you on when to schedule for the safest, most effective results." }
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-pure p-10 md:p-14 rounded-tl-[100px] rounded-br-[100px] rounded-tr-[5px] rounded-bl-[5px] border border-line shadow-[0_30px_60px_rgba(200,121,65,0.05)] hover:shadow-[0_30px_60px_rgba(200,121,65,0.12)] transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold italic tracking-tight text-ink max-w-[280px]">{card.title}</h3>
                  <span className="shrink-0 px-5 py-2 bg-warm-sand text-terracotta text-[10px] uppercase tracking-widest font-bold rounded-full border border-terracotta/10">{card.badge}</span>
                </div>
                <p className="text-slate text-sm md:text-base font-light leading-relaxed relative z-10">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Small Services Preview */}
      <section id="services" className="py-24 md:py-32 border-t border-line bg-warm-sand">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold tracking-tight">Services</h2>
            </div>
            <div className="lg:col-span-3">
              <h3 className="text-2xl font-medium tracking-tight max-w-2xl text-ink leading-snug">
                Anti-aging, clarity, and firmness—without turning care into a device catalog.
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-24">
            {SERVICES.map((service) => (
              <div key={service.id} className="group bg-pure border border-line p-8 md:p-10 hover:border-terracotta/30 transition-all shadow-sm hover:shadow-xl hover:shadow-terracotta/5">
                <div className="flex gap-2 mb-6">
                  {service.tags.map(tag => (
                    <span key={tag} className="text-[9px] uppercase tracking-widest font-bold text-terracotta bg-terracotta/5 border border-terracotta/10 px-2.5 py-1 rounded-sm">{tag}</span>
                  ))}
                </div>
                <h4 className="text-xl font-bold tracking-tight mb-3 flex items-center justify-between group-hover:text-terracotta transition-colors">
                  {service.title}
                  <ArrowUpRight size={18} className="text-terracotta transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </h4>
                <p className="text-sm text-slate leading-relaxed font-light mb-6">{service.description}</p>
                <div className="pt-6 border-t border-line">
                  <span className="text-[10px] uppercase tracking-widest text-terracotta mb-3 block font-bold">Key Benefits</span>
                  <ul className="space-y-2">
                    {service.benefits.map((b, i) => (
                      <li key={i} className="text-xs text-ink/80 flex items-start gap-2 font-light">
                        <span className="text-terracotta mt-[2px] shrink-0 text-xs">●</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/services" className="inline-block px-12 py-5 bg-terracotta text-pure text-xs uppercase tracking-widest font-bold rounded-[2px] hover:bg-sunset shadow-lg shadow-terracotta/20 transition-all">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 md:py-40 border-t border-line bg-warm-light">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-terracotta mb-4 block">Voices of Confidence</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-ink">Patient Feedback</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {TESTIMONIALS.map((t, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 border border-line bg-pure shadow-sm hover:shadow-2xl hover:shadow-terracotta/5 transition-all"
              >
                <div className="text-terracotta mb-8">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 11H6C6 8.79086 7.79086 7 10 7V5C6.68629 5 4 7.68629 4 11V19H10V11ZM20 11H16C16 8.79086 17.79086 7 20 7V5C16.68629 5 14 7.68629 14 11V19H20V11Z" fill="currentColor"/>
                  </svg>
                </div>
                <p className="text-sm leading-relaxed text-ink mb-10 font-light italic">&quot;{t.text}&quot;</p>
                <div className="pt-8 border-t border-line flex justify-between items-center">
                  <div>
                    <div className="font-bold text-sm mb-0.5 text-ink">{t.name}</div>
                    <div className="text-[10px] uppercase tracking-widest text-terracotta font-bold">{t.treatment}</div>
                  </div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(star => <Star key={star} size={10} fill="var(--color-terracotta)" stroke="none" />)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Consultation First Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 bg-pure border border-line rounded-[2px] overflow-hidden shadow-2xl shadow-terracotta/5"
          >
            <div className="p-8 md:p-20 flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-terracotta mb-8 block">Consultation First</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-ink mb-8 leading-[1.1]">
                Start With Clarity— <br/>
                <span className="italic text-terracotta">Not Guesswork</span>
              </h2>
              <p className="text-slate text-base md:text-lg font-light leading-relaxed mb-12 max-w-xl">
                If you’re not sure what you need, you’re in the right place. Your consultation is designed to be educational and pressure-free. We’ll discuss goals, evaluate your skin, and explain options—including what we recommend and what we don’t.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a href="tel:9727506100" className="px-10 py-5 bg-terracotta text-pure text-[11px] uppercase tracking-widest font-bold rounded-[2px] hover:bg-sunset shadow-lg shadow-terracotta/20 transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                  <Phone size={14} />
                  Call to Schedule Consultation
                </a>
              </div>
            </div>
            <div className="relative min-h-[400px] lg:min-h-full bg-warm-sand">
              <div className="absolute inset-0 p-8 lg:p-12">
                <div className="w-full h-full rounded-[40px] overflow-hidden relative group">
                  <img 
                    src={IMG.derma} 
                    alt="Consultation at Celine Medical Spa" 
                    className="absolute inset-0 w-full h-full object-cover object-center grayscale-[0.15] contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-terracotta/10 mix-blend-multiply"></div>
                  
                  <motion.div 
                    initial={{ x: 40, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="absolute top-8 right-8 bg-pure/95 backdrop-blur shadow-2xl p-8 rounded-[20px] border border-line max-w-[280px]"
                  >
                    <span className="inline-block px-3 py-1.5 bg-terracotta text-pure text-[9px] uppercase tracking-widest font-bold rounded-full mb-6">
                      ● What you can expect
                    </span>
                    <ul className="space-y-4">
                      {["Unrushed conversation about your goals", "Skin and facial assessment", "Clear recommendations and timing", "No obligation to book treatment"].map((item, i) => (
                        <li key={i} className="text-[11px] text-ink font-bold flex items-start gap-3">
                          <span className="text-terracotta mt-[2px]">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
