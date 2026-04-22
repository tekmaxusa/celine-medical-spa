/**
 * Marketing images served from /public (Vite BASE_URL for GitHub Pages, etc.).
 */
const pub = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const IMG = {
  logo: pub('/celine-logo.png'),
  logoProSvg: pub('/celine-logo-pro.svg'),
  wordmarkSvg: pub('/celine-wordmark.svg'),
  homeHero: pub('/images/home-hero-reception.webp'),
  homeHeroAlt: pub('/images/home-hero.png'),
  facility1: pub('/images/facility-1.png'),
  facility2: pub('/images/facility-2.png'),
  botox: pub('/images/botox.png'),
  acne: pub('/images/acne.png'),
  antiAging: pub('/images/anti-aging.png'),
  co2Laser: pub('/images/co2-laser.png'),
  coolSculpt: pub('/images/cool-sculpt.png'),
  hydrafacial: pub('/images/hydrafacial.png'),
  ipl: pub('/images/ipl.png'),
  laserHair: pub('/images/laser-hair.png'),
  derma: pub('/images/derma.png'),
  skinBoosting: pub('/images/skin-boosting.png'),
  plasma: pub('/images/plasma.png'),
  microServices: pub('/images/micro-services.png'),
  tattooRemoval: pub('/images/tattoo-removal.png'),
  skinTightening: pub('/images/skin-tightening.png'),
  pico: pub('/images/pico.png'),
} as const;
