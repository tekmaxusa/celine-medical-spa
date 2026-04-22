import { motion } from 'motion/react';
import { Phone, Award, ShieldCheck, HeartPulse, UserCheck } from 'lucide-react';
import { IMG } from '../siteImages';

export default function AboutUs() {
  return (
    <div className="pt-20 bg-pure min-h-screen">
      {/* Header Section */}
      <section className="bg-warm-light py-24 md:py-32 border-b border-line">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-terracotta mb-6 block">
              The Story of Celine
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-ink mb-8 leading-[1.1]">
              Thoughtful Aesthetics. <br />
              <span className="italic text-terracotta text-4xl md:text-6xl">Medical Integrity. Long-Term Care.</span>
            </h1>
            <p className="text-slate text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              At Celine Medical Spa, we believe aesthetic care should feel calm, informed, and deeply personal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-24 md:py-40">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-warm-sand aspect-[4/5] relative overflow-hidden rounded-[2px]">
                <img 
                  src={IMG.facility1} 
                  alt="Celine Medical Spa clinic interior" 
                  className="absolute inset-0 w-full h-full object-cover object-center grayscale contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-ink/10 mix-blend-multiply"></div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-10">About Celine Medical Spa</h2>
              <div className="space-y-8 text-slate text-base md:text-lg font-light leading-relaxed">
                <p>
                  Our approach is not built on trends or aggressive treatments—but on medical expertise, ethical planning, and long-term skin health.
                </p>
                <p>
                  Founded with inspiration from <strong className="text-ink font-medium underline decoration-terracotta/30 underline-offset-4">Korean K-beauty philosophy</strong>, Celine Medical Spa brings a preventative, skin-respecting mindset into a professional medical environment.
                </p>
                <p>
                  Every treatment we offer is guided by safety, intention, and respect for your natural features. We focus on results that look like you, simply more rested.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 md:py-40 bg-ink text-pure relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 flex">
           <div className="w-px h-full bg-white ml-auto"></div>
           <div className="w-px h-full bg-white ml-24"></div>
           <div className="w-px h-full bg-white ml-24"></div>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="max-w-3xl mb-24">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-terracotta mb-6 block">Our Philosophy</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-10">Prevention <span className="italic text-terracotta">Over</span> Correction</h2>
            <p className="text-white/60 text-lg font-light leading-relaxed italic">
              "K-beauty emphasizes something often overlooked in modern aesthetics—gentle consistency over dramatic change."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <ShieldCheck size={32} className="text-terracotta" />, 
                title: "Skin Integrity", 
                desc: "We pair K-beauty philosophy with medical technology to support your skin as it evolves over time, maintaining balance and harmony." 
              },
              { 
                icon: <HeartPulse size={32} className="text-terracotta" />, 
                title: "Gradual Health", 
                desc: "Supporting collagen production gradually rather than through aggressive measures. We avoid overcorrection or unnecessary procedures." 
              },
              { 
                icon: <Award size={32} className="text-terracotta" />, 
                title: "Ethical Planning", 
                desc: "We don't chase trends. We build plans that age well, focusing on judgment, restraint, and experience with no shortcuts." 
              }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="mb-8">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-white/50 text-sm md:text-base font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Oversight */}
      <section className="py-24 md:py-40 bg-warm-sand border-y border-line">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-10 leading-tight">A Medically Guided <br />Standard of Care</h2>
              <div className="space-y-6 text-slate text-base md:text-lg font-light leading-relaxed">
                <p>
                  Celine Medical Spa operates under licensed medical oversight with physician involvement on-site. This ensures every treatment decision is made with safety, anatomy, and evidence-based protocols in mind.
                </p>
                <p>
                  Medical aesthetics requires more than devices—it requires judgment, restraint, and experience. That is the standard we hold ourselves to.
                </p>
              </div>
            </div>
            <div className="bg-pure p-10 md:p-16 border border-line shadow-2xl relative">
              <div className="absolute top-0 right-0 w-2 h-full bg-terracotta/20"></div>
              <h3 className="text-xl font-bold text-ink mb-10 flex items-center gap-4">
                <UserCheck className="text-terracotta" />
                Who We Serve
              </h3>
              <p className="text-slate mb-8 font-light italic">Our patients are individuals who value:</p>
              <ul className="space-y-6">
                {[
                  "Natural-looking, refined results",
                  "Education and transparency",
                  "A long-term relationship with their provider"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-ink font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-terracotta"></div>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-12 text-slate font-light leading-relaxed pt-8 border-t border-line">
                If you’re seeking thoughtful guidance rather than pressure-driven treatments, you’ll feel at home here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call */}
      <section className="py-32 text-center bg-pure">
        <div className="max-w-3xl mx-auto px-6">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-terracotta mb-8 block font-bold">The Journey</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-ink mb-12 italic">
            Let Your Journey <span className="text-terracotta">Begin</span>
          </h2>
          <p className="text-slate text-lg font-light mb-12">
            With professional skincare aestheticians at Celine Medical Spa TODAY!
          </p>
          <a href="tel:9727506100" className="inline-flex items-center gap-4 px-12 py-5 bg-terracotta text-pure text-xs uppercase tracking-widest font-bold rounded-[2px] hover:bg-sunset shadow-2xl transition-all">
            <Phone size={14} />
            Schedule a Consultation
          </a>
        </div>
      </section>
    </div>
  );
}
