import { Instagram, Facebook, Mail, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IMG } from '../siteImages';

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-line bg-ink text-pure overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-terracotta"></div>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/10">
          
          <div className="md:col-span-5 p-8 lg:p-16 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between">
            <div>
              <Link
                to="/"
                className="inline-block mb-10 rounded-md bg-pure p-3 shadow-sm ring-1 ring-ink/10 md:p-4"
              >
                <img
                  src={IMG.logo}
                  alt="Celine Medical Spa"
                  className="h-22 md:h-24 w-auto max-w-[380px] object-contain object-left"
                />
              </Link>
              <p className="text-pure/60 max-w-sm font-light text-base leading-relaxed mb-10">
                A modern minimalist medical spa providing the highest standard of care, serving the Dallas–Fort Worth Metro Area from our Plano location.
              </p>
            </div>
            
            <div className="flex flex-col gap-6">
              <a href="tel:9727506100" className="inline-flex items-center justify-center px-10 py-4 bg-terracotta text-pure text-[11px] uppercase tracking-widest font-bold rounded-[2px] hover:bg-sunset w-fit shadow-xl shadow-terracotta/20">
                (972) 750-6100
              </a>
              <div className="flex gap-6">
                <a href="#" className="text-pure/40 hover:text-terracotta">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-pure/40 hover:text-terracotta">
                  <Facebook size={20} />
                </a>
                <a href="mailto:info@celinemedicalspa.com" className="text-pure/40 hover:text-terracotta">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2">
            <div className="p-8 lg:p-16 border-b sm:border-b-0 sm:border-r border-white/10">
              <h6 className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-terracotta mb-10">Location & Hours</h6>
              <ul className="space-y-8">
                <li>
                  <span className="block text-sm font-bold text-pure mb-3 uppercase tracking-widest">Clinic Address</span>
                  <span className="text-base font-light leading-relaxed text-pure/60">
                    5168 Village Creek Drive<br/>
                    Suite 300<br/>
                    Plano, Texas 75093
                  </span>
                </li>
                <li className="pt-8 border-t border-white/10">
                  <span className="block text-sm font-bold text-pure mb-3 uppercase tracking-widest">Operating Hours</span>
                  <div className="flex justify-between items-center text-base font-light text-pure/60 mb-2">
                    <span>Mon – Fri</span>
                    <span>9:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-base font-light text-pure/60">
                    <span>Sat</span>
                    <span>10:00 AM – 5:00 PM</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="p-8 lg:p-16">
              <h6 className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-terracotta mb-10">Navigation</h6>
              <ul className="space-y-6">
                {[
                  { name: 'Services', path: '/services' },
                  { name: 'Philosophy', path: '/#philosophy' },
                  { name: 'Reviews', path: '/#reviews' },
                  { name: 'Privacy Policy', path: '/privacy' }
                ].map(item => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-base font-light text-pure/60 hover:text-terracotta flex items-center justify-between group">
                      <span>{item.name}</span>
                      <ArrowUpRight size={16} className="text-terracotta opacity-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="px-6 md:px-16 py-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-pure/30 font-bold">
          <span>© 2026 Celine Medical Spa.</span>
          <span className="text-center md:text-right max-w-lg leading-loose">
            Medical Disclaimer: Information on this site is for educational purposes. Consult a physician for professional medical advice.
          </span>
        </div>
      </div>
    </footer>
  );
}
