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
          className="fixed z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-line bg-pure text-ink shadow-lg hover:bg-warm-sand max-md:bottom-[calc(5.75rem+env(safe-area-inset-bottom,0px))] bottom-6 right-[max(1rem,env(safe-area-inset-right,0px))]"
        >
          <ChevronUp size={22} strokeWidth={2} className="text-sunset" aria-hidden />
        </button>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-transparent pt-3 md:hidden pb-[max(0.75rem,env(safe-area-inset-bottom,0px))]">
        <div className="flex justify-center px-4">
          <a
            href="tel:9727506100"
            className="flex items-center justify-center gap-2.5 rounded-full px-8 text-sm font-light uppercase tracking-[0.15em] text-pure shadow-md transition hover:brightness-110 active:brightness-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink/40" style={{ height: '56px', backgroundColor: '#5c3e29' }}
          >
            <Phone size={20} className="shrink-0" strokeWidth={2} aria-hidden />
            Call Us · (972) 750-6100
          </a>
        </div>
      </div>
    </>
  );
}
