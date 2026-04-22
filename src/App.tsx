import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileFloatingUi from './components/MobileFloatingUi';
import Home from './pages/Home';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import Location from './pages/Location';
import Specials from './pages/Specials';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="relative min-h-screen bg-warm-light font-sans text-ink selection:bg-terracotta selection:text-pure overflow-x-hidden flex flex-col pb-[calc(4rem+env(safe-area-inset-bottom,0px))] md:pb-0">
        <ScrollToTop />
        <Navbar />
        <MobileFloatingUi />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/location" element={<Location />} />
            <Route path="/specials" element={<Specials />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
