import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag, MessageCircle, Check, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/format';
import { buildQuickOrderMessage, getWhatsAppUrl } from '../lib/whatsapp';

export const ProductModal: React.FC = () => {
  const { selectedProductForModal, closeProductModal, addToCart, addToast } = useCart();
  const product = selectedProductForModal;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Initialize selected size and color whenever product opens
  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setSelectedSize(product.sizes[0] || 'M');
      setSelectedColor(product.colors[0] || { name: 'Standard', hex: '#000000' });
      setQuantity(1);
    }
  }, [product]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeProductModal();
      }
    };
    if (product) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [product, closeProductModal]);

  if (!product || !selectedColor) return null;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    closeProductModal();
  };

  const handleWhatsAppQuickOrder = () => {
    const msg = buildQuickOrderMessage(product, selectedSize, selectedColor.name, quantity);
    const url = getWhatsAppUrl(msg);
    addToast('Opening WhatsApp...', 'Preparing your quick order inquiry', 'whatsapp');
    window.location.href = url;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0A0A0A]/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={closeProductModal}
    >
      {/* Modal Dialog Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[20px] border border-[rgba(26,26,26,0.7)] bg-[#F2EEE9] text-[#0A0A0A] shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={closeProductModal}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full border border-[rgba(26,26,26,0.7)] flex items-center justify-center text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F2EEE9] transition-colors focus-visible:outline-2 focus-visible:outline-[#0A0A0A] z-10"
          aria-label="Close product modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Image Gallery (Span 6) */}
          <div className="md:col-span-6 space-y-4">
            {/* Main Stage Image */}
            <div className="relative w-full aspect-4/5 rounded-[16px] overflow-hidden border border-[rgba(26,26,26,0.6)] bg-[#EBE5DE] flex items-center justify-center">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain p-4"
              />
            </div>

            {/* Thumbnails if multiple images exist */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-[12px] overflow-hidden border transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#0A0A0A] ring-1 ring-[#0A0A0A]'
                        : 'border-[rgba(26,26,26,0.4)] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Contiguous Purchase Module (Span 6) */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-6">
            
            {/* Header info with price right next to headline */}
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#6B645D] mb-1">
                <span>{product.category}</span>
                <span>·</span>
                <span className="text-[#0A0A0A] font-medium">In Stock</span>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2
                  id="product-title"
                  className="font-['Bebas_Neue',Anton,sans-serif] text-3xl sm:text-4xl uppercase tracking-wide leading-none text-[#0A0A0A]"
                >
                  {product.name}
                </h2>
                
                <div className="flex items-baseline gap-2 shrink-0">
                  <span className="text-2xl sm:text-3xl font-bold tabular-nums text-[#0A0A0A]">
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-xs sm:text-sm line-through text-[#6B645D] tabular-nums">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#0A0A0A] leading-relaxed">
              {product.description}
            </p>

            {/* Color Swatches */}
            <div>
              <span className="block text-xs uppercase tracking-wider font-semibold text-[#0A0A0A] mb-2">
                Color: <span className="font-normal text-[#6B645D]">{selectedColor.name}</span>
              </span>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    className={`relative w-7 h-7 rounded-full border border-[rgba(26,26,26,0.6)] flex items-center justify-center transition-all ${
                      selectedColor.name === color.name
                        ? 'ring-2 ring-offset-2 ring-[#0A0A0A]'
                        : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {selectedColor.name === color.name && (
                      <Check
                        className={`w-3.5 h-3.5 ${
                          color.hex.toLowerCase() === '#f2eee9' || color.hex.toLowerCase() === '#eae5dd'
                            ? 'text-[#0A0A0A]'
                            : 'text-white'
                        }`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#0A0A0A]">
                  Size: <span className="font-normal text-[#6B645D]">{selectedSize}</span>
                </span>
                <span className="text-[11px] text-[#6B645D]">Oversized streetwear cut</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-10 px-3 py-1.5 rounded-full text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#0A0A0A] ${
                      selectedSize === size
                        ? 'bg-[#0A0A0A] text-[#F2EEE9]'
                        : 'border border-[rgba(26,26,26,0.6)] text-[#0A0A0A] hover:bg-[#EBE5DE]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#0A0A0A]">
                Quantity:
              </span>
              <div className="flex items-center rounded-full border border-[rgba(26,26,26,0.7)] bg-[#EBE5DE] px-3 py-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1 hover:text-[#6B645D] focus-visible:outline-none"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-bold tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1 hover:text-[#6B645D] focus-visible:outline-none"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Actions: Add to Cart + WhatsApp Quick Order */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#0A0A0A] text-[#F2EEE9] text-xs font-semibold uppercase tracking-wider hover:bg-[#2A2927] transition-colors focus-visible:outline-2 focus-visible:outline-[#0A0A0A]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart · {formatPrice(product.price * quantity)}</span>
              </button>

              <button
                onClick={handleWhatsAppQuickOrder}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#20ba59] transition-colors focus-visible:outline-2 focus-visible:outline-[#25D366]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp (Instant)</span>
              </button>
            </div>

            {/* Specifications list */}
            {product.details && product.details.length > 0 && (
              <div className="border-t border-[rgba(26,26,26,0.3)] pt-4">
                <span className="block text-xs uppercase tracking-wider font-semibold text-[#0A0A0A] mb-2">
                  Garment Specifications
                </span>
                <ul className="text-xs text-[#6B645D] space-y-1">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#0A0A0A]" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Trust Badges */}
            <div className="flex items-center justify-between text-[11px] text-[#6B645D] pt-2 border-t border-[rgba(26,26,26,0.2)]">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#0A0A0A]" /> Nairobi same-day available
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0A0A0A]" /> 100% natural fabrics
              </span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
