import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { IMAGES } from '../data/images';

export const Hero: React.FC = () => (
  <section id="hero" aria-label="New collection" className="page-container pb-14 pt-2">
    <div className="relative flex min-h-[640px] flex-col justify-between overflow-hidden rounded-card border border-line bg-surface p-6 sm:min-h-[720px] sm:p-10 md:min-h-[820px]">
      <div className="relative z-30 flex items-center justify-between gap-4">
        <span className="inline-flex items-center rounded-full border border-line-soft bg-bg px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider">
          {SITE_CONFIG.brand.discountNotice}
        </span>
        <span className="eyebrow hidden sm:block">{SITE_CONFIG.brand.location}</span>
      </div>

      {/* The headline sits behind the photo, so the models overlap the letters. */}
      <div className="pointer-events-none absolute inset-x-0 top-12 z-10 select-none overflow-hidden px-2 text-center sm:top-14 md:top-16">
        <h1
          className="whitespace-nowrap font-display font-normal uppercase text-ink"
          style={{ fontSize: 'clamp(3.6rem, 13vw, 11.5rem)', lineHeight: 0.85, letterSpacing: '-0.035em' }}
        >
          New collection
        </h1>
      </div>

      <div className="relative z-20 flex flex-1 items-end justify-center pb-2 pt-24 sm:pt-32 md:pt-40">
        <figure className="relative h-[380px] w-full max-w-4xl overflow-hidden rounded-inner border border-line bg-bg shadow-xl sm:h-[480px] md:h-[560px]">
          <img
            src={IMAGES.hero}
            alt="Three UNDIGNIFIED models seated on steps in hoodies and sweatshirts, with printed jute bags in front of them"
            fetchPriority="high"
            className="h-full w-full object-cover object-[center_35%]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink/70 to-transparent" />
          <figcaption className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 text-xs font-semibold uppercase tracking-wider text-white sm:inset-x-6">
            <span>100% natural streetwear</span>
            <span className="hidden sm:block">2 Samuel 6:22</span>
          </figcaption>
        </figure>
      </div>

      <div className="relative z-30 flex flex-col items-center justify-between gap-5 border-t border-line-soft pt-6 sm:flex-row sm:pt-8">
        <div className="max-w-md text-center sm:text-left">
          <p className="font-display text-2xl uppercase leading-none tracking-wide">{SITE_CONFIG.brand.tagline}</p>
          <p className="mt-1.5 text-sm text-muted">
            Hoodies, sweatshirts, polos, tees, caps, jute bags and wrist bands. Based in Nairobi.
          </p>
        </div>

        <a href="#collections" className="btn-primary group px-8 py-3.5 shadow-md">
          <span>Shop the collection</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  </section>
);
