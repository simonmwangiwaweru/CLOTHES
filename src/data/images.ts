// Imported (not string paths) so Vite bundles and fingerprints them for production.
import hero from '../assets/images/hero.jpeg';
import hoodieBrown from '../assets/images/look-hoodie-brown.jpeg';
import zipHoodieTree from '../assets/images/look-zip-hoodie-tree.jpeg';
import zipHoodieSteps from '../assets/images/look-zip-hoodie-steps.jpeg';
import poster from '../assets/images/poster-worship-night.jpg';
import heroVideo from '../assets/video/hero-loop.mp4';
import heroPoster from '../assets/video/hero-poster.jpg';
import toteOrange from '../assets/images/look-tote-orange.jpeg';

export const IMAGES = {
  /** Trio photoshoot: hero banner, and the only shot of the crewneck sweatshirt. */
  hero,
  /** Brown pullover hoodie with black cap. */
  hoodieBrown,
  /** Navy zip hoodie, cap and jute tote. */
  zipHoodieTree,
  zipHoodieSteps,
  /** Jute tote carried on its own. */
  toteOrange,
  /** Official Worship Night 2026 event poster. */
  poster,
  /** Muted loop for the hero (portrait, 720×1280) and its still frame. */
  heroVideo,
  heroPoster,
} as const;
