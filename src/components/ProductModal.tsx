import React, { useEffect, useRef, useState } from 'react';
import { X, Minus, Plus, ShoppingBag, MessageCircle, Check, ShieldCheck, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/format';
import { buildQuickOrderMessage, getWhatsAppUrl, openWhatsApp } from '../lib/whatsapp';
import { useDialog } from '../lib/useDialog';
import { ProductImage } from './ProductImage';
import { ProductColor } from '../types';

/** True when white text would be hard to read on this swatch. */
function isLightColor(hex: string): boolean {
  const n = parseInt(hex.replace('#', ''), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

export const ProductModal: React.FC = () => {
  const { selectedProductForModal: product, closeProductModal, addToCart, addToast } = useCart();
  const dialogRef = useRef<HTMLDivElement>(null);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product) return;
    setActiveImageIndex(0);
    setSelectedSize(product.sizes[0] ?? 'M');
    setSelectedColor(product.colors[0] ?? { name: 'Standard', hex: '#000000' });
    setQuantity(1);
  }, [product]);

  // The dialog only mounts once the default colour is set, so wait for it before trapping focus.
  const isOpen = !!product && !!selectedColor;
  useDialog(isOpen, closeProductModal, dialogRef);

  if (!product || !selectedColor) return null;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    closeProductModal();
  };

  const handleWhatsAppOrder = () => {
    const message = buildQuickOrderMessage(product, selectedSize, selectedColor.name, quantity);
    addToast('Opening WhatsApp', `${product.name} · ${selectedSize} · ${selectedColor.name}`, 'whatsapp');
    openWhatsApp(getWhatsAppUrl(message));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black/75 p-4 backdrop-blur-xs sm:p-6"
      onClick={closeProductModal}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-4xl animate-pop-in overflow-y-auto rounded-card border border-line bg-bg p-6 shadow-2xl sm:p-8"
      >
        <button onClick={closeProductModal} className="icon-btn absolute right-4 top-4 z-10 bg-bg sm:right-6 sm:top-6" aria-label="Close">
          <X className="h-4 w-4" />
        </button>

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
          <div className="space-y-4 md:col-span-6">
            <div className="aspect-[4/5] overflow-hidden rounded-inner border border-line-soft bg-surface">
              <ProductImage
                src={product.images[activeImageIndex] ?? product.images[0]}
                alt={product.name}
                loading="eager"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex flex-wrap items-center gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={img}
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`Show photo ${idx + 1} of ${product.images.length}`}
                    aria-pressed={activeImageIndex === idx}
                    className={`h-16 w-16 overflow-hidden rounded-xl border transition-opacity ${
                      activeImageIndex === idx ? 'border-gold ring-1 ring-gold' : 'border-line-soft opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-6 md:col-span-6">
            <div>
              <p className="eyebrow mb-1">
                {product.category} · <span className="text-ink">{product.inStock ? 'In stock' : 'Sold out'}</span>
              </p>
              <div className="flex flex-wrap items-baseline justify-between gap-3 pr-12">
                <h2 id="product-title" className="font-display text-3xl uppercase leading-none tracking-wide sm:text-4xl">
                  {product.name}
                </h2>
                <p className="shrink-0 text-2xl font-bold tabular-nums sm:text-3xl">{formatPrice(product.price)}</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed">{product.description}</p>

            <div role="group" aria-label="Colour">
              <span className="label mb-2">
                Colour: <span className="font-normal normal-case tracking-normal text-muted">{selectedColor.name}</span>
              </span>
              <div className="flex flex-wrap items-center gap-3">
                {product.colors.map((color) => {
                  const selected = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => {
                        setSelectedColor(color);
                        if (color.imageIndex !== undefined) setActiveImageIndex(color.imageIndex);
                      }}
                      aria-label={color.name}
                      aria-pressed={selected}
                      className={`flex h-8 w-8 items-center justify-center rounded-full border border-line transition-transform ${
                        selected ? 'ring-2 ring-gold ring-offset-2 ring-offset-bg' : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selected && <Check className={`h-3.5 w-3.5 ${isLightColor(color.hex) ? 'text-ink' : 'text-white'}`} />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div role="group" aria-label="Size">
              <span className="label mb-2">
                Size: <span className="font-normal normal-case tracking-normal text-muted">{selectedSize}</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button key={size} className="chip min-w-10" aria-pressed={selectedSize === size} onClick={() => setSelectedSize(size)}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="label">Quantity</span>
              <div className="stepper">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-bold tabular-nums" aria-live="polite">
                  {quantity}
                </span>
                <button onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <button onClick={handleAddToCart} disabled={!product.inStock} className="btn-primary w-full disabled:bg-muted">
                <ShoppingBag className="h-4 w-4" />
                <span>Add to bag · {formatPrice(product.price * quantity)}</span>
              </button>
              <button onClick={handleWhatsAppOrder} disabled={!product.inStock} className="btn-whatsapp w-full disabled:opacity-50">
                <MessageCircle className="h-4 w-4" />
                <span>Order on WhatsApp</span>
              </button>
            </div>

            {product.details.length > 0 && (
              <div className="border-t border-line-soft pt-4">
                <span className="label mb-2">Details</span>
                <ul className="space-y-1 text-sm text-muted">
                  {product.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-2">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-ink" aria-hidden="true" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line-soft pt-3 text-xs text-muted">
              <span className="flex items-center gap-1.5">
                <Heart className="h-3.5 w-3.5 text-gold" aria-hidden="true" /> Funds Worship Night 2026
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-gold" aria-hidden="true" /> Natural fabrics
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
