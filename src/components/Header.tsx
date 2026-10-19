import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { useCart } from '../context/CartContext';
import { SITE_CONFIG } from '../config/site';

export const Header: React.FC = () => {
  const { totalItems, openCart, searchQuery, setSearchQuery } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // The 8 exclusive headlines for the navigation bar (without pricing, as prices belong on the product page only)
  const navProducts = [
    { label: 'Hoodie', targetId: 'hoodie' },
    { label: 'Sweatshirts', targetId: 'sweatshirts' },
    { label: 'Polo shirts', targetId: 'polo-shirts' },
    { label: 'Round neck t-shirts', targetId: 'round-neck-t-shirts' },
    { label: 'Caps', targetId: 'caps' },
    { label: 'Jute bags A4', targetId: 'jute-bags-a4' },
    { label: 'Jute bags A3', targetId: 'jute-bags-a3' },
    { label: 'Wrist bands', targetId: 'wrist-bands' },
  ];

  const handleNavClick = (targetId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(`product-${targetId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add a subtle flash highlight effect
      element.classList.add('ring-2', 'ring-[#0A0A0A]');
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-[#0A0A0A]');
      }, 2000);
    } else {
      // Fallback scroll to collections
      const collections = document.getElementById('collections');
      if (collections) collections.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled ? 'py-2 bg-[#F2EEE9]/95 backdrop-blur-md shadow-xs' : 'py-3.5 bg-[#F2EEE9]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4 h-12">
            
            {/* Zone 1: Logo */}
            <a
              href="#hero"
              className="flex items-center gap-1.5 shrink-0 focus-visible:outline-2 focus-visible:outline-[#0A0A0A] rounded-md"
            >
              <Logo size="sm" />
            </a>

            {/* Zone 2: Navigation Bar with the 8 exclusive headlines (Scrollable pill) */}
            <nav
              aria-label="Products Navigation"
              className="hidden lg:flex items-center gap-1 px-3 py-1 rounded-full border border-[rgba(26,26,26,0.7)] bg-[#F2EEE9]/70 backdrop-blur-xs max-w-[680px] xl:max-w-none overflow-x-auto no-scrollbar"
            >
              {navProducts.map((item) => (
                <button
                  key={item.targetId}
                  onClick={() => handleNavClick(item.targetId)}
                  className="px-2.5 py-1 text-[11px] xl:text-xs font-semibold tracking-wide uppercase text-[#0A0A0A] hover:text-[#6B645D] transition-colors whitespace-nowrap rounded-full focus-visible:outline-2 focus-visible:outline-[#0A0A0A]"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Zone 3: Search Pill & Cart */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Expandable Search Pill */}
              <div
                className={`relative flex items-center transition-all duration-300 rounded-full border border-[rgba(26,26,26,0.7)] bg-[#F2EEE9] ${
                  searchOpen ? 'w-40 sm:w-56 px-3 py-1.5' : 'w-9 h-9 justify-center'
                }`}
              >
                {searchOpen ? (
                  <>
                    <Search className="w-3.5 h-3.5 text-[#0A0A0A] shrink-0 mr-2" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-full text-xs bg-transparent border-none outline-none text-[#0A0A0A] placeholder-[#6B645D]"
                    />
                    <button
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="text-[#6B645D] hover:text-[#0A0A0A] p-0.5 ml-1"
                      aria-label="Close search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="w-full h-full flex items-center justify-center text-[#0A0A0A] hover:text-[#6B645D] transition-colors focus-visible:outline-2 focus-visible:outline-[#0A0A0A] rounded-full"
                    aria-label="Open search input"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Cart Button */}
              <button
                onClick={openCart}
                className="relative flex items-center justify-center w-9 h-9 rounded-full border border-[rgba(26,26,26,0.7)] bg-[#0A0A0A] text-[#F2EEE9] hover:bg-[#2A2927] transition-colors focus-visible:outline-2 focus-visible:outline-[#0A0A0A]"
                aria-label={`Shopping cart with ${totalItems} items`}
              >
                <ShoppingBag className="w-4 h-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-[#25D366] text-[#0A0A0A] text-[10px] font-bold leading-none">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile / Tablet Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full border border-[rgba(26,26,26,0.7)] text-[#0A0A0A] focus-visible:outline-2 focus-visible:outline-[#0A0A0A]"
                aria-label="Open navigation menu"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu with ONLY the 8 headlines */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Product Navigation"
          className="fixed inset-0 z-50 bg-[#F2EEE9] flex flex-col justify-between p-6 animate-in fade-in duration-200 overflow-y-auto"
        >
          {/* Top Bar inside menu */}
          <div className="flex items-center justify-between pb-4 border-b border-[rgba(26,26,26,0.4)]">
            <Logo size="md" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-[rgba(26,26,26,0.7)] text-[#0A0A0A]"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links: ONLY the 8 product headlines */}
          <div className="flex flex-col gap-3 py-6 my-auto">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#6B645D] mb-1">
              Select Piece
            </span>
            {navProducts.map((item, idx) => (
              <button
                key={item.targetId}
                onClick={() => handleNavClick(item.targetId)}
                className="group flex items-center justify-between text-left text-2xl sm:text-3xl font-['Bebas_Neue',Anton,sans-serif] uppercase tracking-wide text-[#0A0A0A] hover:translate-x-2 transition-transform py-1"
              >
                <span>{item.label}</span>
                <span className="text-xs font-sans text-[#6B645D]">0{idx + 1}</span>
              </button>
            ))}
          </div>

          {/* Footer info in menu */}
          <div className="pt-4 border-t border-[rgba(26,26,26,0.5)]">
            <p className="text-xs uppercase tracking-widest text-[#6B645D] mb-2">{SITE_CONFIG.brand.tagline}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#0A0A0A]">{SITE_CONFIG.brand.location}</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCart();
                }}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#0A0A0A] underline underline-offset-4"
              >
                Open Bag ({totalItems}) <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
