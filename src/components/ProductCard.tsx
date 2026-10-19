import React from 'react';
import { ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../lib/format';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  cardVariant?: 'normal' | 'tall' | 'compact';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, cardVariant = 'normal' }) => {
  const { addToCart, openProductModal } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 'M';
    const defaultColor = product.colors[0] || { name: 'Standard', hex: '#000000' };
    addToCart(product, defaultSize, defaultColor, 1);
  };

  const aspectClass = {
    tall: 'aspect-3/4 sm:aspect-4/5',
    compact: 'aspect-square',
    normal: 'aspect-4/5',
  }[cardVariant];

  return (
    <div
      id={`product-${product.id}`}
      onClick={() => openProductModal(product)}
      className="group relative cursor-pointer flex flex-col justify-between rounded-[20px] border border-[rgba(26,26,26,0.7)] bg-[#EBE5DE]/40 hover:bg-[#EBE5DE] transition-all duration-300 p-4 select-none scroll-mt-28"
    >
      {/* Top Image Showcase */}
      <div className={`relative w-full overflow-hidden rounded-[16px] bg-[#EBE5DE] ${aspectClass}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain p-2 sm:p-3 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />

        {/* Hover Quick Add Overlay (Desktop) / Visible Bar (Mobile) */}
        <div className="absolute inset-x-2 bottom-2 z-10 flex items-center justify-between gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickAdd}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-[#0A0A0A] text-[#F2EEE9] text-xs font-medium hover:bg-[#2A2927] transition-colors shadow-sm"
            aria-label={`Quick add ${product.name} to cart`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Add to Cart</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              openProductModal(product);
            }}
            className="w-8 h-8 rounded-full bg-[#F2EEE9] border border-[rgba(26,26,26,0.5)] flex items-center justify-center text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F2EEE9] transition-colors"
            aria-label={`View details for ${product.name}`}
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Status indicator tag */}
        {product.isNew && (
          <span className="absolute top-2.5 left-2.5 text-[10px] font-medium uppercase tracking-wider text-[#0A0A0A] bg-[#F2EEE9] px-2 py-0.5 rounded-full border border-[rgba(26,26,26,0.3)]">
            New
          </span>
        )}
      </div>

      {/* Product Title and Price right next to it */}
      <div className="pt-3 pb-1 flex flex-col justify-between">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-sm sm:text-base font-bold text-[#0A0A0A] line-clamp-1 group-hover:underline underline-offset-4">
            {product.name}
          </h3>
          {/* Price displayed prominently next to the headline on the product page */}
          <div className="flex items-baseline gap-1.5 font-bold tabular-nums text-sm sm:text-base text-[#0A0A0A] shrink-0">
            {product.compareAtPrice && (
              <span className="text-[#6B645D] line-through text-xs font-normal">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            <span>{formatPrice(product.price)}</span>
          </div>
        </div>

        <div className="mt-1 flex items-center justify-between text-xs text-[#6B645D]">
          <span>{product.category}</span>
          <span className="text-[11px] uppercase tracking-wide">In Stock</span>
        </div>
      </div>
    </div>
  );
};
