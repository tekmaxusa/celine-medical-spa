import { Tag, Calendar } from 'lucide-react';

export default function Specials() {
  const specials = [
    {
      title: "New Patient Consultation",
      offer: "Complimentary Skin Assessment",
      desc: "Start your journey with a detailed facial analysis and professional treatment plan guided by medical expertise.",
      valid: "Ongoing"
    },
    {
      title: "Seasonal Highlight: Pico Laser",
      offer: "Winter Rejuvenation Package",
      desc: "Optimize your healing during the low-UV season. Includes post-treatment care kit.",
      valid: "Until February 28"
    }
  ];

  return (
    <div className="pt-[5.5rem] sm:pt-28 min-h-screen bg-warm-light p-6">
      <div className="max-w-[1400px] mx-auto py-20">
        <div className="text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-terracotta mb-6 block">Exclusive Offers</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-ink mb-8">Current <span className="italic text-terracotta">Specials</span></h1>
          <p className="text-slate text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Thoughtfully curated packages designed to support your skin&apos;s natural vitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {specials.map((s, i) => (
            <div
              key={i}
              className="bg-pure p-12 border border-line shadow-sm hover:shadow-xl hover:shadow-terracotta/5 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta/5 rounded-full -mr-16 -mt-16"></div>
              <Tag size={24} className="text-terracotta mb-8" />
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate mb-2">{s.title}</h2>
              <h3 className="text-3xl font-bold text-ink mb-6">{s.offer}</h3>
              <p className="text-slate font-light leading-relaxed mb-10">{s.desc}</p>
              <div className="flex items-center gap-3 text-terracotta font-bold text-[10px] uppercase tracking-widest pt-8 border-t border-line">
                <Calendar size={14} />
                <span>Valid: {s.valid}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
