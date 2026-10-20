import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { SectionHeading } from './SectionHeading';

// Varying card heights gives the row an editorial rhythm.
const CARD_VARIANTS = ['tall', 'normal', 'compact'] as const;

export const PopularGoods: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const popularProducts = PRODUCTS.filter((p) => p.isPopular);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollTo({ left: direction === 'left' ? el.scrollLeft - amount : el.scrollLeft + amount, behavior: 'smooth' });
  };

  return (
    <section id="popular" aria-labelledby="popular-title" className="page-container section">
      <SectionHeading
        id="popular-title"
        title="Popular goods"
        description="The pieces our supporters are buying most."
        aside={
          <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
            <button onClick={() => scroll('left')} className="icon-btn h-9 w-9" aria-label="Scroll popular goods left">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={() => scroll('right')} className="icon-btn h-9 w-9" aria-label="Scroll popular goods right">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        }
      />

      <div
        ref={scrollRef}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 py-2 sm:mx-0 sm:gap-6 sm:px-0"
      >
        {popularProducts.map((product, index) => (
          <div key={product.id} className="w-[240px] shrink-0 snap-start sm:w-[280px] md:w-[310px]">
            <ProductCard product={product} cardVariant={CARD_VARIANTS[index % CARD_VARIANTS.length]} />
          </div>
        ))}
      </div>
    </section>
  );
};
