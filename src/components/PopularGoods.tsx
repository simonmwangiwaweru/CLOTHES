import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';

export const PopularGoods: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const popularProducts = PRODUCTS.filter((p) => p.isPopular);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth * 0.75;
    scrollRef.current.scrollTo({
      left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
      behavior: 'smooth',
    });
  };

  // Vary card heights slightly for editorial rhythm as specified in the prompt
  const cardVariants: Array<'tall' | 'compact' | 'normal'> = [
    'tall',
    'normal',
    'compact',
    'tall',
    'normal',
    'compact',
    'tall',
  ];

  return (
    <section id="popular" aria-label="Popular Streetwear Goods" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-['Bebas_Neue',Anton,sans-serif] text-5xl sm:text-6xl md:text-7xl uppercase text-[#0A0A0A] tracking-tight leading-none">
            POPULAR GOODS
          </h2>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4">
          <p className="text-xs sm:text-sm text-[#6B645D] font-normal">
            Frequently purchased products this season
          </p>

          {/* Desktop Arrow Controls */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => scroll('left')}
              className="w-8 h-8 rounded-full border border-[rgba(26,26,26,0.7)] bg-[#F2EEE9] flex items-center justify-center text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F2EEE9] transition-colors focus-visible:outline-2 focus-visible:outline-[#0A0A0A]"
              aria-label="Scroll popular items left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-8 h-8 rounded-full border border-[rgba(26,26,26,0.7)] bg-[#F2EEE9] flex items-center justify-center text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F2EEE9] transition-colors focus-visible:outline-2 focus-visible:outline-[#0A0A0A]"
              aria-label="Scroll popular items right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontally scrollable row with scroll-snap and peeking next card */}
      <div
        ref={scrollRef}
        className="flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {popularProducts.map((product, index) => {
          const variant = cardVariants[index % cardVariants.length];
          return (
            <div
              key={product.id}
              className="snap-start shrink-0 w-[240px] sm:w-[280px] md:w-[310px]"
            >
              <ProductCard product={product} cardVariant={variant} />
            </div>
          );
        })}
      </div>
    </section>
  );
};
