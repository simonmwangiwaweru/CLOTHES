import React, { useEffect, useRef, useState } from 'react';
import { ShoppingBag, Search, Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { useCart } from '../context/CartContext';
import { SITE_CONFIG } from '../config/site';
import { useDialog } from '../lib/useDialog';
import { ProductCategory } from '../types';

// Each entry filters the catalog to that category and scrolls to it.
const NAV_CATEGORIES: { label: string; category: ProductCategory }[] = [
  { label: 'Hoodies', category: 'Hoodies' },
  { label: 'Sweatshirts', category: 'Sweatshirts' },
  { label: 'Polo shirts', category: 'Polo Shirts' },
  { label: 'T-shirts', category: 'T-Shirts' },
  { label: 'Caps', category: 'Caps' },
  { label: 'Jute bags', category: 'Bags' },
];

export const Header: React.FC = () => {
  const { totalItems, openCart, searchQuery, setSearchQuery, setActiveCategory } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useDialog(mobileMenuOpen, () => setMobileMenuOpen(false), menuRef);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const scrollToCatalog = () =>
    document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const handleNavClick = (category: ProductCategory) => {
    setMobileMenuOpen(false);
    setSearchQuery('');
    setActiveCategory(category);
    requestAnimationFrame(scrollToCatalog);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full border-b border-brass-line transition-[padding,background-color] duration-300 ${
          scrolled ? 'bg-bg/95 py-2 shadow-xs backdrop-blur-md' : 'bg-bg py-3.5'
        }`}
      >
        <div className="page-container">
          <div className="flex h-12 items-center justify-between gap-3">
            <a href="#hero" className="shrink-0 rounded-md" aria-label="UNDIGNIFIED MERCH — back to top">
              <Logo size="sm" />
            </a>

            <nav
              aria-label="Shop by category"
              className="no-scrollbar hidden min-w-0 max-w-[680px] items-center gap-1 overflow-x-auto rounded-full border border-brass bg-bg/70 px-3 py-1 backdrop-blur-xs lg:flex xl:max-w-none"
            >
              {NAV_CATEGORIES.map((item) => (
                <button
                  key={item.category}
                  onClick={() => handleNavClick(item.category)}
                  className="whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-ink transition-colors hover:text-brass-text"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-2">
              <a href="#partner" className="btn-primary btn-sm hidden 2xl:inline-flex">
                Partner with us
              </a>
              {searchOpen ? (
                <form
                  role="search"
                  onSubmit={(e) => {
                    e.preventDefault();
                    scrollToCatalog();
                  }}
                  className="flex h-9 w-40 items-center rounded-full border border-line bg-bg pl-3 pr-1 sm:w-56"
                >
                  <Search className="mr-2 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Search pieces"
                    aria-label="Search pieces"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Escape' && closeSearch()}
                    className="w-full min-w-0 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
                  />
                  <button
                    type="button"
                    onClick={closeSearch}
                    className="rounded-full p-1.5 text-muted hover:text-ink"
                    aria-label="Close search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </form>
              ) : (
                <button onClick={() => setSearchOpen(true)} className="icon-btn" aria-label="Search pieces">
                  <Search className="h-4 w-4" />
                </button>
              )}

              <button
                onClick={openCart}
                className="icon-btn relative border-gold bg-gold text-on-accent hover:bg-gold-strong"
                aria-label={`Open bag, ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
              >
                <ShoppingBag className="h-4 w-4" />
                {totalItems > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-whatsapp px-1 text-xs font-bold leading-none text-ink"
                  >
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="icon-btn lg:hidden"
                aria-label="Open menu"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          tabIndex={-1}
          className="fixed inset-0 z-50 flex animate-fade-in flex-col justify-between overflow-y-auto bg-bg p-6"
        >
          <div className="flex items-center justify-between border-b border-line-soft pb-4">
            <Logo size="md" />
            <button onClick={() => setMobileMenuOpen(false)} className="icon-btn h-10 w-10" aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Shop by category" className="my-auto flex flex-col gap-1 py-6">
            <a
              href="#partner"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary mb-5 self-start"
            >
              Partner with us
            </a>
            <div className="mb-6 flex gap-5 text-sm font-semibold underline underline-offset-4">
              <a href="#sponsors" onClick={() => setMobileMenuOpen(false)}>Sponsors</a>
              <a href="#vendors" onClick={() => setMobileMenuOpen(false)}>Sell at the night</a>
            </div>
            <span className="eyebrow mb-2">Shop by category</span>
            {NAV_CATEGORIES.map((item) => (
              <button
                key={item.category}
                onClick={() => handleNavClick(item.category)}
                className="py-1.5 text-left font-display text-3xl uppercase tracking-wide text-ink transition-transform hover:translate-x-2"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="border-t border-line-soft pt-4">
            <p className="eyebrow mb-2">{SITE_CONFIG.brand.tagline}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm">{SITE_CONFIG.brand.location}</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCart();
                }}
                className="inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4"
              >
                Open bag ({totalItems}) <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
