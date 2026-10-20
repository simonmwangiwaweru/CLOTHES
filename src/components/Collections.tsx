import React, { useMemo, useState } from 'react';
import { ArrowDownUp, RotateCcw, Search, X } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { ProductImage } from './ProductImage';
import { SectionHeading } from './SectionHeading';
import { useCart } from '../context/CartContext';

type SortKey = 'newest' | 'price-asc' | 'price-desc';

const CATEGORIES: ProductCategory[] = ['Hoodies', 'Sweatshirts', 'Polo Shirts', 'T-Shirts', 'Caps', 'Bags', 'Accessories'];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
];

export const Collections: React.FC = () => {
  const { searchQuery, setSearchQuery, activeCategory, setActiveCategory } = useCart();
  const [sortBy, setSortBy] = useState<SortKey>('newest');

  const categories = useMemo(
    () =>
      CATEGORIES.map((name) => {
        const products = PRODUCTS.filter((p) => p.category === name);
        return { name, count: products.length, image: products.find((p) => p.images.length > 0)?.images[0] };
      }),
    []
  );

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch =
        q === '' ||
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.tags.some((t) => t.toLowerCase().includes(q)) ||
        product.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return Number(b.isNew ?? false) - Number(a.isNew ?? false);
    });
  }, [activeCategory, searchQuery, sortBy]);

  const handleTileClick = (category: ProductCategory) => {
    setActiveCategory(activeCategory === category ? 'All' : category);
    document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const resetFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
  };

  return (
    <section id="collections" aria-labelledby="collections-title" className="page-container section">
      <SectionHeading
        id="collections-title"
        title="Collections"
        description="Every piece raises funds for Worship Night 2026. Pick a category to browse."
      />

      <div className="mb-16 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
        {categories.map((cat) => {
          const selected = activeCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => handleTileClick(cat.name)}
              aria-pressed={selected}
              className={`group card rounded-card p-3 text-left ${
                selected ? 'border-gold bg-gold text-on-accent' : 'card-interactive'
              }`}
            >
              <div className="mb-3 aspect-square overflow-hidden rounded-inner bg-surface">
                <ProductImage
                  src={cat.image}
                  alt={cat.name}
                  caption={false}
                  className="transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
              </div>
              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="font-display text-xl uppercase leading-none tracking-wide">{cat.name}</span>
                <span className={`text-xs font-medium tabular-nums ${selected ? 'text-on-accent/70' : 'text-muted'}`}>
                  {cat.count}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div
        id="products-grid"
        className="mb-8 flex scroll-mt-24 flex-col justify-between gap-4 border-b border-line-soft pb-4 md:flex-row md:items-center"
      >
        <div className="no-scrollbar -mx-1 flex items-center gap-1.5 overflow-x-auto px-1 py-1" role="group" aria-label="Filter by category">
          <button className="chip" aria-pressed={activeCategory === 'All'} onClick={() => setActiveCategory('All')}>
            All pieces ({PRODUCTS.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              className="chip"
              aria-pressed={activeCategory === cat.name}
              onClick={() => setActiveCategory(cat.name)}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {searchQuery && (
            <div className="flex items-center gap-1.5 rounded-full border border-line-soft bg-surface py-1 pl-3 pr-1 text-xs">
              <Search className="h-3 w-3 text-muted" aria-hidden="true" />
              <span>“{searchQuery}”</span>
              <button
                onClick={() => setSearchQuery('')}
                className="rounded-full p-1 text-muted hover:text-ink"
                aria-label="Clear search"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          <label className="flex items-center gap-2">
            <ArrowDownUp className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
            <span className="sr-only">Sort pieces</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="cursor-pointer rounded-full border border-line bg-surface px-3 py-1.5 text-xs"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <p className="sr-only" role="status">
        {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'} shown
      </p>

      {filteredProducts.length > 0 ? (
        // Re-keying on the filters replays the entrance, so changing category or sort feels like a transition.
        <div
          key={`${activeCategory}|${sortBy}|${searchQuery}`}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProducts.map((product, index) => (
            <div key={product.id} className="stagger-item" style={{ '--i': Math.min(index, 8) } as React.CSSProperties}>
              <ProductCard product={product} anchor />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-card border border-dashed border-line px-8 py-20 text-center">
          <p className="heading-card mb-2 text-3xl">No pieces found</p>
          <p className="mx-auto mb-6 max-w-sm text-sm text-muted">
            Nothing matches your search and category. Clear the filters to see every piece.
          </p>
          <button onClick={resetFilters} className="btn-primary btn-sm">
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Clear filters</span>
          </button>
        </div>
      )}
    </section>
  );
};
