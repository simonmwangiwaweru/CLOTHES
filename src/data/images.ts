// Imported (not string paths) so Vite bundles and fingerprints them for production.
import hero from '../assets/images/hero.jpeg';
import hoodieBrown from '../assets/images/look-hoodie-brown.jpeg';
import zipHoodieTree from '../assets/images/look-zip-hoodie-tree.jpeg';
import zipHoodieSteps from '../assets/images/look-zip-hoodie-steps.jpeg';
import poster from '../assets/images/poster-worship-night.jpg';
import heroVideo from '../assets/video/hero-loop.mp4';
import heroPoster from '../assets/video/hero-poster.jpg';
import teeWhite from '../assets/images/products/tee-white.jpg';
import teeNavy from '../assets/images/products/tee-navy.jpg';
import teeOlive from '../assets/images/products/tee-olive.jpg';
import teeGrey from '../assets/images/products/tee-grey.jpg';
import teeMaroon from '../assets/images/products/tee-maroon.jpg';
import poloWhite from '../assets/images/products/polo-white.jpg';
import sweatshirtBlack from '../assets/images/products/sweatshirt-black.jpg';
import capBlack from '../assets/images/products/cap-black.jpg';
import capWhite from '../assets/images/products/cap-white.jpg';
import toteOrange from '../assets/images/look-tote-orange.jpeg';

export const IMAGES = {
  /** Trio photoshoot, used in the "Wear the message" band. */
  hero,
  /** Brown pullover hoodie with black cap. */
  hoodieBrown,
  /** Navy zip hoodie, cap and jute tote. */
  zipHoodieTree,
  zipHoodieSteps,
  /** Jute tote carried on its own. */
  toteOrange,
  /** Product photos (one per colour). */
  teeWhite,
  teeNavy,
  teeOlive,
  teeGrey,
  teeMaroon,
  poloWhite,
  sweatshirtBlack,
  capBlack,
  capWhite,
  /** Official Worship Night 2026 event poster. */
  poster,
  /** Muted loop for the hero (portrait, 720×1280) and its still frame. */
  heroVideo,
  heroPoster,
} as const;
