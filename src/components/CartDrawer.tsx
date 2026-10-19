import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, generateOrderCode } from '../lib/format';
import { buildWhatsAppOrderMessage, getWhatsAppUrl } from '../lib/whatsapp';
import { CheckoutFormState } from '../types';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    totalItems,
    addToast,
  } = useCart();

  const [form, setForm] = useState<CheckoutFormState>({
    fullName: '',
    phone: '',
    deliveryArea: '',
    deliveryMethod: 'Doorstep Delivery',
    orderNote: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const isFormValid =
    form.fullName.trim().length >= 2 &&
    form.phone.trim().length >= 7 &&
    form.deliveryArea.trim().length >= 3;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.deliveryArea.trim()) newErrors.deliveryArea = 'Delivery address is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const orderCode = generateOrderCode();
    const message = buildWhatsAppOrderMessage(items, subtotal, form, orderCode);
    const whatsappUrl = getWhatsAppUrl(message);

    addToast('Opening WhatsApp...', `Order #UND-${orderCode} ready for dispatch`, 'whatsapp');

    // Open WhatsApp link
    window.location.href = whatsappUrl;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Your Shopping Bag"
      className="fixed inset-0 z-50 flex justify-end bg-[#0A0A0A]/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={closeCart}
    >
      {/* Drawer Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg h-full bg-[#F2EEE9] text-[#0A0A0A] border-l border-[rgba(26,26,26,0.7)] flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 overflow-hidden"
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-[rgba(26,26,26,0.5)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-['Bebas_Neue',Anton,sans-serif] text-2xl uppercase tracking-wider">
              YOUR BAG
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#EBE5DE] border border-[rgba(26,26,26,0.3)] tabular-nums">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-[#6B645D] hover:text-[#0A0A0A] underline underline-offset-2"
              >
                Clear all
              </button>
            )}
            <button
              onClick={closeCart}
              className="w-8 h-8 rounded-full border border-[rgba(26,26,26,0.7)] flex items-center justify-center text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F2EEE9] transition-colors focus-visible:outline-2 focus-visible:outline-[#0A0A0A]"
              aria-label="Close cart drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {items.length === 0 ? (
            /* Empty Cart State */
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full border border-[rgba(26,26,26,0.7)] bg-[#EBE5DE] flex items-center justify-center">
                <ShoppingBag className="w-7 h-7 text-[#6B645D]" />
              </div>
              <h3 className="font-['Bebas_Neue',Anton,sans-serif] text-3xl uppercase tracking-wide">
                Your bag is empty
              </h3>
              <p className="text-xs sm:text-sm text-[#6B645D] max-w-xs">
                Browse our latest drops and heavyweight streetwear collection.
              </p>
              <button
                onClick={closeCart}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0A0A0A] text-[#F2EEE9] text-xs font-semibold uppercase tracking-wider hover:bg-[#2A2927] transition-colors"
              >
                <span>Continue shopping</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 rounded-[16px] border border-[rgba(26,26,26,0.4)] bg-[#EBE5DE]/50"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 shrink-0 rounded-[12px] overflow-hidden border border-[rgba(26,26,26,0.3)] bg-[#EBE5DE]">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain p-1"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs sm:text-sm font-semibold text-[#0A0A0A] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <p className="text-[11px] text-[#6B645D] mt-0.5">
                            Size: <span className="text-[#0A0A0A] font-medium">{item.selectedSize}</span> · Color: <span className="text-[#0A0A0A] font-medium">{item.selectedColor.name}</span>
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#6B645D] hover:text-[#0A0A0A] p-1 transition-colors"
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Stepper */}
                        <div className="flex items-center rounded-full border border-[rgba(26,26,26,0.5)] bg-[#F2EEE9] px-2 py-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-[#6B645D]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-[#6B645D]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-xs font-bold tabular-nums text-[#0A0A0A]">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Details Form */}
              <div className="pt-4 border-t border-[rgba(26,26,26,0.4)] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-['Bebas_Neue',Anton,sans-serif] text-xl uppercase tracking-wider">
                    DELIVERY & CONTACT DETAILS
                  </h3>
                  <span className="text-[10px] text-[#6B645D]">Required for WhatsApp order</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#0A0A0A] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Brian Ochieng"
                      value={form.fullName}
                      onChange={(e) => {
                        setForm({ ...form, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: '' });
                      }}
                      className="w-full px-3.5 py-2 text-xs rounded-full border border-[rgba(26,26,26,0.6)] bg-white text-[#0A0A0A] placeholder-[#6B645D] outline-none focus:border-[#0A0A0A]"
                    />
                    {errors.fullName && (
                      <span className="text-[10px] text-red-600 mt-0.5 block">{errors.fullName}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#0A0A0A] mb-1">
                      Phone Number (for WhatsApp & Delivery) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0712 345 678"
                      value={form.phone}
                      onChange={(e) => {
                        setForm({ ...form, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      className="w-full px-3.5 py-2 text-xs rounded-full border border-[rgba(26,26,26,0.6)] bg-white text-[#0A0A0A] placeholder-[#6B645D] outline-none focus:border-[#0A0A0A]"
                    />
                    {errors.phone && (
                      <span className="text-[10px] text-red-600 mt-0.5 block">{errors.phone}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#0A0A0A] mb-1">
                      Delivery Address / Estate / Pickup Location *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kilimani, Wood Avenue, Apt 4B"
                      value={form.deliveryArea}
                      onChange={(e) => {
                        setForm({ ...form, deliveryArea: e.target.value });
                        if (errors.deliveryArea) setErrors({ ...errors, deliveryArea: '' });
                      }}
                      className="w-full px-3.5 py-2 text-xs rounded-full border border-[rgba(26,26,26,0.6)] bg-white text-[#0A0A0A] placeholder-[#6B645D] outline-none focus:border-[#0A0A0A]"
                    />
                    {errors.deliveryArea && (
                      <span className="text-[10px] text-red-600 mt-0.5 block">{errors.deliveryArea}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#0A0A0A] mb-1">
                      Delivery Method
                    </label>
                    <select
                      value={form.deliveryMethod}
                      onChange={(e) => setForm({ ...form, deliveryMethod: e.target.value as any })}
                      className="w-full px-3.5 py-2 text-xs rounded-full border border-[rgba(26,26,26,0.6)] bg-white text-[#0A0A0A] outline-none focus:border-[#0A0A0A] cursor-pointer"
                    >
                      <option value="Doorstep Delivery">Doorstep Delivery (Nairobi Metro)</option>
                      <option value="Pickup (Nairobi CBD)">Pickup (Nairobi CBD Point)</option>
                      <option value="Countrywide Parcel Transit">Countrywide Parcel Transit (Fargo / G4S)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#0A0A0A] mb-1">
                      Order Note / Special Instructions (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Please deliver after 4 PM, call on arrival"
                      value={form.orderNote}
                      onChange={(e) => setForm({ ...form, orderNote: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-[14px] border border-[rgba(26,26,26,0.6)] bg-white text-[#0A0A0A] placeholder-[#6B645D] outline-none focus:border-[#0A0A0A] resize-none"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer with Subtotal & WhatsApp CTA */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-[rgba(26,26,26,0.5)] bg-[#EBE5DE] space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6B645D] font-medium">Subtotal</span>
              <span className="text-xl font-bold tabular-nums text-[#0A0A0A]">
                {formatPrice(subtotal)}
              </span>
            </div>
            
            <p className="text-[11px] text-[#6B645D]">
              No card required now. Delivery fee and final payment (M-Pesa / Cash) will be confirmed with our team via WhatsApp.
            </p>

            <button
              onClick={handleCheckout}
              disabled={!isFormValid}
              className={`w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                isFormValid
                  ? 'bg-[#25D366] text-white hover:bg-[#20ba59] shadow-md cursor-pointer'
                  : 'bg-[#6B645D]/40 text-white/80 cursor-not-allowed'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Complete Order on WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
