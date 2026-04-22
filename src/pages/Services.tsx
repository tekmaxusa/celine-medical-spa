import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { IMG } from '../siteImages';

/** URL hash for deep links from the home page (e.g. /services#pico-laser). */
function serviceAnchorId(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s*&\s*/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const SERVICE_GROUPS = [
  {
    title: "Advanced Face Treatments",
    badge: "Safer · Better · Faster",
    description: "A Curated Approach to Aesthetic Care. At Celine Medical Spa, our services are not presented as a menu to browse—but as tools we use thoughtfully, based on what your skin truly needs.",
    intro: "Every treatment is selected for safety, effectiveness, and long-term skin health. We take the time to explain what each option does, who it’s best for, and when it’s most appropriate—so you can make informed decisions with confidence.",
    items: [
      {
        name: "Dermal Fillers",
        description: "Fillers restore lost volume in the cheeks, lips, and under the eyes while also enhancing contours. They instantly lift and refresh your face, giving a more youthful, balanced appearance without surgery.",
        image: IMG.botox
      },
      {
        name: "Skin Boosters",
        subtitle: "(Profhilo, SkinVive, Juvelook)",
        description: "Unlike fillers, skin boosters hydrate and rejuvenate the skin from within. They improve elasticity, reduce dryness, and add a radiant glow. Perfect for dull or tired skin.",
        image: IMG.skinBoosting
      },
      {
        name: "PRP Therapy",
        subtitle: "for Facial Rejuvenation",
        description: "This natural treatment uses your own blood plasma, rich in growth factors, to repair and rejuvenate the skin. Helps improve texture, reduce acne scars, and restore a youthful glow over time.",
        image: IMG.plasma
      },
      {
        name: "Botox & Injectables",
        description: "Quick, non-surgical injections that relax facial muscles to smooth out fine lines and wrinkles. Popular areas include the forehead, frown lines, and around the eyes.",
        image: IMG.botox
      }
    ]
  },
  {
    title: "Skin Rejuvenation",
    description: "Medically advanced treatments targeting deep skin layers to restore texture, tone, and vitality.",
    items: [
      {
        name: "Microneedling",
        subtitle: "(RF / Pixel8 / Morpheus8)",
        description: "Tiny needles stimulate collagen and elastin production, tightening the skin and reducing scars, wrinkles, and uneven texture. Advanced RF microneedling combines radiofrequency energy for deeper results.",
        image: IMG.microServices
      },
      {
        name: "Laser Skin Resurfacing",
        subtitle: "(CO2 Laser)",
        description: "A powerful treatment that removes damaged outer skin layers and promotes new collagen growth. It improves wrinkles, pigmentation, sun damage, and scars, leaving skin smoother and tighter.",
        image: IMG.co2Laser
      },
      {
        name: "Oligio Skin Tightening",
        description: "Oligio is a non-invasive treatment that uses advanced radio-frequency technology to gently heat the deeper layers of the skin for refined, gradual improvement over time.",
        image: IMG.skinTightening
      },
      {
        name: "Hydrafacial",
        description: "A celebrity-favorite facial that cleanses, exfoliates, extracts impurities, and infuses hydration in one session. Painless, refreshing, and leaves your skin glowing instantly.",
        image: IMG.hydrafacial
      },
      {
        name: "Pico Laser",
        description: "The Pico laser stands out with its top-tier power, four distinct emission modes, a distinctive handpiece design, and three authentic laser wavelengths for maximum operational performance.",
        image: IMG.pico
      }
    ]
  },
  {
    title: "Acne & Specialty Care",
    description: "Targeted protocols for persistent skin conditions and comprehensive age management.",
    items: [
      {
        name: "Acne Treatments",
        description: "Personalized care using medical facials, laser, or chemical peels to clear acne, control oil, and reduce breakouts. Also helps prevent scarring for long-term skin health.",
        image: IMG.acne
      },
      {
        name: "Anti-Aging Programs",
        description: "Customized treatment plans combining injectables, lasers, and facials designed to maintain youthful, healthy skin for years to come.",
        image: IMG.antiAging
      },
      {
        name: "Ultratherapy Lift",
        description: "Ultratherapy uses focused ultrasound energy to lift and tighten skin naturally. It targets deep layers to improve sagging on the face, neck, and brow without surgery or downtime.",
        image: IMG.derma
      }
    ]
  },
  {
    title: "Body Treatments",
    description: "Clinical solutions for hair reduction, body contouring, and skin firming beyond the face.",
    items: [
      {
        name: "Laser Hair Removal",
        description: "Safe and long-term reduction of unwanted hair using advanced lasers. Effective for face, arms, legs, bikini line, and more. Results are smooth, stubble-free skin.",
        image: IMG.laserHair
      },
      {
        name: "Body Contouring",
        subtitle: "(CoolSculpting)",
        description: "Freeze away stubborn fat cells that don’t respond to diet and exercise. A non-surgical alternative to liposuction that helps sculpt a more toned body.",
        image: IMG.coolSculpt
      },
      {
        name: "RF Skin Tightening",
        description: "Non-invasive treatment that uses radiofrequency energy to firm loose or sagging skin. Great for tightening the jawline, neck, arms, abdomen, and thighs.",
        image: IMG.skinTightening
      },
      {
        name: "Tattoo Removal",
        description: "Advanced laser technology that safely fades or removes unwanted tattoos, no matter the size or color using high-precision laser wavelengths.",
        image: IMG.tattooRemoval
      }
    ]
  }
];

const FAQS = [
  {
    q: "Do I need a consultation before treatment?",
    a: "Yes, every new client begins with a consultation. This allows our providers to understand your skin concerns, medical history, and goals, so we can recommend the safest and most effective treatments."
  },
  {
    q: "Are the treatments painful?",
    a: "Most treatments involve little to no discomfort. For procedures like microneedling or injectables, we use numbing creams to ensure your comfort throughout the session."
  },
  {
    q: "How many sessions will I need?",
    a: "It depends on the treatment and your individual goals. Some results, like fillers, are immediate, while others such as laser hair removal or microneedling may require multiple sessions for best results."
  },
  {
    q: "Can I book online?",
    a: "Absolutely. You can book your appointment anytime using our online booking system. You’ll receive reminders and can easily reschedule if needed."
  },
  {
    q: "What if I have more questions?",
    a: "Our team is always available! You can contact us by phone, email, or WhatsApp — we’re happy to answer any questions before or after your visit."
  },
  {
    q: "Is it safe?",
    a: "Yes. All our treatments are performed by licensed professionals using FDA-cleared equipment and medical-grade products. Safety and hygiene are our top priorities."
  }
];

export default function Services() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="pt-[5.5rem] sm:pt-28 bg-pure min-h-screen font-sans">
      {/* Services Hero Header */}
      <section className="bg-warm-light py-24 md:py-32 border-b border-line">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="max-w-4xl">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-terracotta mb-6 block">
              Physician-Supervised Aesthetics in Plano
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-ink mb-10 leading-[1.1]">
              Our <span className="italic text-terracotta underline decoration-terracotta/20 underline-offset-8">Services</span>
            </h1>
            <div className="space-y-6 max-w-2xl">
              <p className="text-slate text-xl md:text-2xl font-light leading-relaxed italic">
                Advanced Face Treatments: Safer, Better, Faster.
              </p>
              <p className="text-slate text-base md:text-lg font-light leading-relaxed">
                At Celine Medical Spa, our services are not presented as a menu to browse—but as tools we use thoughtfully, based on what your skin truly needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Context */}
      <section className="py-20 bg-pure border-b border-line">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-8">A Curated Approach to Aesthetic Care</h2>
            <p className="text-slate text-lg md:text-xl font-light leading-relaxed">
              Every treatment is selected for safety, effectiveness, and long-term skin health. We take the time to explain what each option does, who it’s best for, and when it’s most appropriate—so you can make informed decisions with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Services Content - Vertical Ledger Pattern */}
      <div className="bg-pure">
        {SERVICE_GROUPS.map((group, groupIdx) => (
          <section key={group.title} className="border-b border-line overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 py-24 md:py-32">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                {/* Section Info */}
                <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[10px] font-mono text-terracotta font-bold px-2 py-1 bg-terracotta/5 rounded">0{groupIdx + 1}</span>
                    {group.badge && (
                      <span className="text-[10px] uppercase tracking-widest font-bold text-slate bg-warm-sand px-3 py-1 rounded-full border border-line">
                        {group.badge}
                      </span>
                    )}
                  </div>
                  <h2 className="text-4xl font-bold tracking-tight text-ink mb-8 uppercase leading-tight">{group.title}</h2>
                  <p className="text-slate text-lg font-light leading-relaxed mb-12 italic border-l-2 border-terracotta/20 pl-6">
                    {group.description}
                  </p>
                  
                  <div className="flex flex-col gap-4">
                    <a href="tel:9727506100" className="inline-flex items-center justify-center px-8 py-5 bg-terracotta text-pure text-xs uppercase tracking-widest font-bold rounded-[2px] hover:bg-sunset shadow-lg shadow-terracotta/10">
                      Call to Discuss
                    </a>
                  </div>
                </div>

                {/* Cards Grid */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      id={serviceAnchorId(item.name)}
                      className="flex flex-col group bg-warm-light/30 border border-line hover:border-terracotta/20 rounded-[2px] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-terracotta/5 scroll-mt-28 sm:scroll-mt-32"
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-8 md:p-10 flex-grow flex flex-col">
                        <h3 className="text-2xl font-bold text-ink mb-2 group-hover:text-terracotta">
                          {item.name}
                        </h3>
                        {item.subtitle && (
                          <span className="text-xs uppercase tracking-widest font-bold text-terracotta/60 mb-6 block">
                            {item.subtitle}
                          </span>
                        )}
                        <p className="text-slate text-base md:text-lg font-light leading-relaxed flex-grow">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* FAQ Section */}
      <section className="bg-warm-sand py-24 md:py-40">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-terracotta mb-4 block font-bold">Knowledge Base</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-ink">Get Clear Solutions</h2>
          </div>

          <div className="space-y-6">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-pure border border-line overflow-hidden shadow-sm rounded-[2px] hover:border-terracotta/20">
                <button 
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-10 flex items-center justify-between text-left hover:bg-warm-light/10"
                >
                  <span className="text-xl md:text-2xl font-bold text-ink pr-8">{faq.q}</span>
                  <ChevronDown
                    size={24}
                    className={`text-terracotta shrink-0 ${openFaq === i ? 'rotate-180' : ''}`}
                    aria-hidden
                  />
                </button>
                {openFaq === i && (
                  <div className="px-10 pb-10">
                    <p className="text-slate text-lg font-light leading-relaxed border-t border-line pt-8">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call */}
      <section className="py-40 text-center bg-pure border-t border-line">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-ink mb-12 italic leading-tight">
            Not sure what you need? <br />
            We start with a <span className="text-terracotta underline decoration-terracotta/20 underline-offset-8">discussion</span>.
          </h2>
          <p className="text-slate text-lg font-light mb-12 max-w-xl mx-auto">
            Book your professional assessment today and discover the new standard of self-care.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="tel:9727506100" className="inline-flex items-center justify-center px-12 py-5 bg-terracotta text-pure text-xs uppercase tracking-widest font-bold rounded-[2px] hover:bg-sunset shadow-2xl w-full sm:w-auto text-center">
              (972) 750-6100
            </a>
            <a href="tel:9727506100" className="inline-flex items-center gap-4 px-12 py-5 border border-line text-ink text-xs uppercase tracking-widest font-bold rounded-[2px] hover:bg-warm-sand w-full sm:w-auto text-center justify-center">
              Visit Our Clinic
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
