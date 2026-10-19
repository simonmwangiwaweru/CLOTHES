import React, { useState, useMemo } from 'react';
import { ArrowDownUp, Filter, RotateCcw, Search } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { useCart } from '../context/CartContext';

interface CategoryTile {
  name: ProductCategory;
  label: string;
  image: string;
  count: number;
}

export const Collections: React.FC = () => {
  const { searchQuery, setSearchQuery } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');

  const categories: CategoryTile[] = useMemo(() => {
    const list: ProductCategory[] = [
      'Hoodies',
      'Sweatshirts',
      'Polo Shirts',
      'T-Shirts',
      'Caps',
      'Bags',
      'Accessories',
    ];
    return list.map((cat) => {
      const prods = PRODUCTS.filter((p) => p.category === cat);
      const img = prods[0]?.images[0] || '/src/assets/images/hero_streetwear_trio_1792442224149.jpg';
      return {
        name: cat,
        label: cat.toUpperCase(),
        image: img,
        count: prods.length,
      };
    });
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const handleTileClick = (category: ProductCategory) => {
    setSelectedCategory((prev) => (prev === category ? 'All' : category));
    // Smooth scroll down to products grid
    const gridElem = document.getElementById('products-grid');
    if (gridElem) {
      gridElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="collections" aria-label="Collections and Catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Title */}
      <div className="mb-10 sm:mb-12">
        <h2 className="font-['Bebas_Neue',Anton,sans-serif] text-5xl sm:text-6xl md:text-7xl uppercase text-[#0A0A0A] tracking-tight leading-none">
          COLLECTIONS
        </h2>
        <p className="mt-2 text-sm text-[#6B645D]">
          Structured proportions in premium natural fabrics. Select a category to explore.
        </p>
      </div>

      {/* Grid of Category Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-16">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => handleTileClick(cat.name)}
              className={`group text-left rounded-[20px] border p-3 flex flex-col justify-between transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#0A0A0A] ${
                isSelected
                  ? 'border-[#0A0A0A] bg-[#0A0A0A] text-[#F2EEE9]'
                  : 'border-[rgba(26,26,26,0.7)] bg-[#EBE5DE]/60 hover:bg-[#EBE5DE] text-[#0A0A0A]'
              }`}
            >
              <div className="relative w-full aspect-square rounded-[14px] overflow-hidden bg-[#F2EEE9]/80 mb-3">
                <img
                  src={cat.image}
                  alt={cat.label}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="font-['Bebas_Neue',Anton,sans-serif] text-xl tracking-wide uppercase">
                  {cat.label}
                </span>
                <span
                  className={`text-xs tabular-nums font-medium ${
                    isSelected ? 'text-[#F2EEE9]/70' : 'text-[#6B645D]'
                  }`}
                >
                  {cat.count}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Product Catalog Filter & Sort Bar */}
      <div id="products-grid" className="pt-4 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(26,26,26,0.4)] pb-4">
        
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#0A0A0A] ${
              selectedCategory === 'All'
                ? 'bg-[#0A0A0A] text-[#F2EEE9]'
                : 'border border-[rgba(26,26,26,0.6)] text-[#0A0A0A] hover:bg-[#EBE5DE]'
            }`}
          >
            All Pieces ({PRODUCTS.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#0A0A0A] ${
                selectedCategory === cat.name
                  ? 'bg-[#0A0A0A] text-[#F2EEE9]'
                  : 'border border-[rgba(26,26,26,0.6)] text-[#0A0A0A] hover:bg-[#EBE5DE]'
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* Sort & Search Indicator */}
        <div className="flex items-center gap-3 shrink-0">
          {searchQuery && (
            <div className="flex items-center gap-1.5 text-xs text-[#0A0A0A] bg-[#EBE5DE] px-3 py-1 rounded-full border border-[rgba(26,26,26,0.3)]">
              <Search className="w-3 h-3 text-[#6B645D]" />
              <span>"{searchQuery}"</span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#6B645D] hover:text-[#0A0A0A] ml-1 font-bold"
                aria-label="Clear search"
              >
                ×
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <ArrowDownUp className="w-3.5 h-3.5 text-[#6B645D]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-[#EBE5DE] border border-[rgba(26,26,26,0.6)] rounded-full px-3 py-1.5 text-[#0A0A0A] outline-none cursor-pointer focus-visible:ring-1 focus-visible:ring-[#0A0A0A]"
              aria-label="Sort products"
            >
              <option value="newest">Featured / Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

      </div>

      {/* Full Products Grid: 3 columns desktop, 2 tablet, 1-2 mobile */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} cardVariant="normal" />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center rounded-[20px] border border-dashed border-[rgba(26,26,26,0.5)] p-8">
          <p className="font-['Bebas_Neue',Anton,sans-serif] text-3xl uppercase text-[#0A0A0A] mb-2">
            No pieces found
          </p>
          <p className="text-sm text-[#6B645D] max-w-sm mx-auto mb-6">
            We couldn't find any products matching your current search or category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0A0A0A] text-[#F2EEE9] text-xs font-semibold uppercase tracking-wider hover:bg-[#2A2927] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        </div>
      )}
    </section>
  );
};
