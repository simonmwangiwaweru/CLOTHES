// Imported (not string paths) so Vite bundles and fingerprints them for production.
import hero from '../assets/images/hero.jpeg';
import hoodieBrown from '../assets/images/look-hoodie-brown.jpeg';
import zipHoodieTree from '../assets/images/look-zip-hoodie-tree.jpeg';
import zipHoodieSteps from '../assets/images/look-zip-hoodie-steps.jpeg';
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
} as const;
