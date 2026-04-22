import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Location() {
  return (
    <div className="pt-20 min-h-screen bg-warm-light p-6">
      <div className="max-w-[1400px] mx-auto py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-terracotta mb-6 block">Visit Our Clinic</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-ink mb-8">Conveniently Located in <span className="italic text-terracotta">Plano</span></h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-pure p-10 border border-line shadow-sm rounded-[2px]">
            <h2 className="text-2xl font-bold text-ink mb-10">Contact Details</h2>
            <ul className="space-y-8">
              <li className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-warm-sand flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-terracotta" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-slate mb-2">Address</h3>
                  <p className="text-ink font-light text-lg">5168 Village Creek Drive, Suite 300<br/>Plano, Texas 75093</p>
                </div>
              </li>
              <li className="flex items-start gap-6 pt-8 border-t border-line">
                <div className="w-12 h-12 rounded-full bg-warm-sand flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-terracotta" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-slate mb-2">Phone</h3>
                  <a href="tel:9727506100" className="text-ink font-light text-lg hover:text-terracotta transition-colors">(972) 750-6100</a>
                </div>
              </li>
              <li className="flex items-start gap-6 pt-8 border-t border-line">
                <div className="w-12 h-12 rounded-full bg-warm-sand flex items-center justify-center shrink-0">
                  <Clock size={20} className="text-terracotta" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-slate mb-2">Hours</h3>
                  <div className="space-y-1 text-ink font-light text-lg">
                    <p className="flex justify-between w-64"><span>Mon – Fri:</span> <span>9:00 AM – 6:00 PM</span></p>
                    <p className="flex justify-between w-64"><span>Sat:</span> <span>10:00 AM – 5:00 PM</span></p>
                    <p className="flex justify-between w-64"><span>Sun:</span> <span>Closed</span></p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="aspect-square bg-warm-sand border border-line rounded-[2px] overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3345.541366914561!2d-96.8228514!3d33.0157973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c2174cc829871%3A0xe54cb8e515dbe888!2s5168%20Village%20Creek%20Dr%2C%20Plano%2C%20TX%2075093!5e0!3m2!1sen!2sus!4v1713781234567!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
