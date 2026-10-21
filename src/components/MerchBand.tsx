import React from 'react';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '../data/images';
import { PRODUCTS } from '../data/products';
import { formatPrice } from '../lib/format';

const LOWEST_PRICE = Math.min(...PRODUCTS.map((p) => p.price));

/** Bridges the event hero to the shop: the collection, worn. */
export const MerchBand: React.FC = () => (
  <section id="merch" aria-labelledby="merch-title" className="page-container pt-16">
    <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="aspect-[5/4] overflow-hidden rounded-card border border-line bg-surface lg:col-span-7">
        <img
          src={IMAGES.hero}
          alt="Three UNDIGNIFIED models seated on steps in hoodies and sweatshirts, with printed jute bags in front of them"
          loading="lazy"
          className="h-full w-full object-cover object-[center_35%]"
        />
      </div>

      <div className="lg:col-span-5">
        <p className="eyebrow mb-3 text-brass-text">The collection</p>
        <h2 id="merch-title" className="heading-section">
          Wear the message
        </h2>
        <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
          Hoodies, sweatshirts, polos, tees, caps and jute bags. Every piece you buy raises funds for
          Worship Night 2026.
        </p>
        <p className="mt-3 text-sm font-semibold text-brass-text">Prices start at {formatPrice(LOWEST_PRICE)}</p>
        <a href="#collections" className="btn-primary group mt-8 px-8 py-3.5">
          <span>Shop the collection</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  </section>
);
