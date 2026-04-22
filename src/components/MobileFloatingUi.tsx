import { ChevronUp, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

const SCROLL_THRESHOLD = 320;

export default function MobileFloatingUi() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {showBackToTop && (
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo(0, 0)}
          className="fixed z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-line bg-pure text-ink shadow-lg hover:bg-warm-sand max-md:bottom-[calc(5.25rem+env(safe-area-inset-bottom,0px))] bottom-6 right-[max(1rem,env(safe-area-inset-right,0px))]"
        >
          <ChevronUp size={22} strokeWidth={2} className="text-terracotta" aria-hidden />
        </button>
      )}

      <a
        href="tel:9727506100"
        className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden min-h-[3.75rem] items-center justify-center gap-2.5 bg-terracotta text-pure px-4 text-sm font-bold uppercase tracking-[0.15em] shadow-[0_-4px_24px_rgba(0,0,0,0.12)] border-t border-ink/10 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]"
      >
        <Phone size={20} className="shrink-0" strokeWidth={2} aria-hidden />
        Call Us · (972) 750-6100
      </a>
    </>
  );
}
