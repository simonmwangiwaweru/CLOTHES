import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../lib/format';
import { useCart } from '../context/CartContext';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
  cardVariant?: 'normal' | 'tall' | 'compact';
  /** Give the card a DOM id so the header nav can jump to it. Use on one list only. */
  anchor?: boolean;
}

const ASPECT = {
  tall: 'aspect-[3/4] sm:aspect-[4/5]',
  compact: 'aspect-square',
  normal: 'aspect-[4/5]',
} as const;

export const ProductCard: React.FC<ProductCardProps> = ({ product, cardVariant = 'normal', anchor = false }) => {
  const { addToCart, openProductModal } = useCart();

  const handleQuickAdd = () => {
    addToCart(product, product.sizes[0] ?? 'M', product.colors[0] ?? { name: 'Standard', hex: '#000000' }, 1);
  };

  return (
    <article
      id={anchor ? `product-${product.id}` : undefined}
      className="card card-interactive group relative flex scroll-mt-28 flex-col rounded-card p-4"
    >
      <div className={`relative w-full overflow-hidden rounded-inner bg-surface ${ASPECT[cardVariant]}`}>
        <button
          onClick={() => openProductModal(product)}
          className="block h-full w-full"
          aria-label={`View details for ${product.name}`}
        >
          <ProductImage
            src={product.images[0]}
            alt={product.name}
            className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </button>

        {product.isNew && (
          <span className="pointer-events-none absolute left-2.5 top-2.5 rounded-full border border-line-soft bg-bg px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider">
            New
          </span>
        )}

        {/* Always visible on touch; revealed on hover or keyboard focus on larger screens. */}
        <div className="absolute inset-x-2 bottom-2 z-10 opacity-100 transition-opacity duration-200 sm:opacity-0 sm:focus-within:opacity-100 sm:group-hover:opacity-100">
          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className="btn-primary btn-sm w-full normal-case tracking-normal shadow-sm disabled:bg-muted"
            aria-label={`Add ${product.name} to bag`}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>{product.inStock ? 'Add to bag' : 'Sold out'}</span>
          </button>
        </div>
      </div>

      <div className="pb-1 pt-3">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="line-clamp-1 text-base font-bold">
            <button onClick={() => openProductModal(product)} className="text-left underline-offset-4 hover:underline">
              {product.name}
            </button>
          </h3>
          <p className="flex shrink-0 items-baseline gap-1.5 text-base font-bold tabular-nums">
            {product.compareAtPrice && (
              <s className="text-xs font-normal text-muted">
                <span className="sr-only">Was </span>
                {formatPrice(product.compareAtPrice)}
              </s>
            )}
            <span>
              <span className="sr-only">Now </span>
              {formatPrice(product.price)}
            </span>
          </p>
        </div>

        <div className="mt-1 flex items-center justify-between text-xs text-muted">
          <span>{product.category}</span>
          <span className="uppercase tracking-wide">{product.inStock ? 'In stock' : 'Sold out'}</span>
        </div>
      </div>
    </article>
  );
};
