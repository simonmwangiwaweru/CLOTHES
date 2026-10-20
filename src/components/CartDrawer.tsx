import React, { useRef, useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, generateOrderCode } from '../lib/format';
import { buildWhatsAppOrderMessage, getWhatsAppUrl, openWhatsApp } from '../lib/whatsapp';
import { useDialog } from '../lib/useDialog';
import { ProductImage } from './ProductImage';
import { CheckoutFormState } from '../types';
import { SITE_CONFIG } from '../config/site';

type FormErrors = Partial<Record<'fullName' | 'phone', string>>;

function validate(form: CheckoutFormState): FormErrors {
  const errors: FormErrors = {};
  if (form.fullName.trim().length < 2) errors.fullName = 'Enter your full name.';
  if (form.phone.replace(/\D/g, '').length < 9) errors.phone = 'Enter a phone number with at least 9 digits.';
  return errors;
}

export const CartDrawer: React.FC = () => {
  const { items, isCartOpen, closeCart, removeFromCart, updateQuantity, clearCart, subtotal, totalItems, addToast } =
    useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<CheckoutFormState>({
    fullName: '',
    phone: '',
    orderNote: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useDialog(isCartOpen, closeCart, drawerRef);

  if (!isCartOpen) return null;

  const setField = <K extends keyof CheckoutFormState>(key: K, value: CheckoutFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key in errors) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(`checkout-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    const orderCode = generateOrderCode();
    const message = buildWhatsAppOrderMessage(items, subtotal, form, orderCode);
    addToast('Opening WhatsApp', `Order #UND-${orderCode}. Send the message to confirm.`, 'whatsapp');
    openWhatsApp(getWhatsAppUrl(message));
  };

  const fieldProps = (key: keyof FormErrors) => ({
    id: `checkout-${key}`,
    'aria-invalid': errors[key] ? (true as const) : undefined,
    'aria-describedby': errors[key] ? `checkout-${key}-error` : undefined,
  });

  const renderError = (key: keyof FormErrors) =>
    errors[key] && (
      <span id={`checkout-${key}-error`} className="field-error">
        {errors[key]}
      </span>
    );

  return (
    <div className="fixed inset-0 z-50 flex animate-fade-in justify-end bg-black/75 backdrop-blur-xs" onClick={closeCart}>
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bag-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-lg animate-slide-in-right flex-col overflow-hidden border-l border-line bg-bg shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-line-soft p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <h2 id="bag-title" className="heading-card text-3xl">
              Your bag
            </h2>
            <span className="rounded-full border border-line-soft bg-surface px-2.5 py-0.5 text-xs font-semibold tabular-nums">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {items.length > 0 && (
              <button onClick={clearCart} className="text-sm text-muted underline underline-offset-2 hover:text-ink">
                Empty bag
              </button>
            )}
            <button onClick={closeCart} className="icon-btn" aria-label="Close bag">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <form onSubmit={handleCheckout} noValidate className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-6">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center space-y-4 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-line bg-surface">
                  <ShoppingBag className="h-7 w-7 text-muted" aria-hidden="true" />
                </div>
                <h3 className="heading-card text-3xl">Your bag is empty</h3>
                <p className="max-w-xs text-sm text-muted">Add a piece from the collection and it will show up here.</p>
                <button type="button" onClick={closeCart} className="btn-primary">
                  <span>Keep shopping</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <>
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="panel flex gap-4 p-3">
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-line-soft bg-surface">
                        <ProductImage src={item.product.images[0]} alt={item.product.name} caption={false} />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="line-clamp-1 text-sm font-semibold">{item.product.name}</h3>
                            <p className="mt-0.5 text-xs text-muted">
                              {item.selectedSize} · {item.selectedColor.name}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="rounded-full p-1.5 text-muted transition-colors hover:text-ink"
                            aria-label={`Remove ${item.product.name} from bag`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <div className="stepper">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label={`Decrease quantity of ${item.product.name}`}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-semibold tabular-nums">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label={`Increase quantity of ${item.product.name}`}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="text-sm font-bold tabular-nums">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <fieldset className="space-y-4 border-t border-line-soft pt-4">
                  <legend className="sr-only">Your details</legend>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="heading-card text-xl">Your details</h3>
                    <span className="text-xs text-muted">Name and phone are required</span>
                  </div>

                  <div>
                    <label htmlFor="checkout-fullName" className="mb-1 block text-sm font-medium">
                      Full name
                    </label>
                    <input
                      {...fieldProps('fullName')}
                      type="text"
                      autoComplete="name"
                      placeholder="Brian Ochieng"
                      value={form.fullName}
                      onChange={(e) => setField('fullName', e.target.value)}
                      className="field"
                    />
                    {renderError('fullName')}
                  </div>

                  <div>
                    <label htmlFor="checkout-phone" className="mb-1 block text-sm font-medium">
                      Phone number
                    </label>
                    <input
                      {...fieldProps('phone')}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="0712 345 678"
                      value={form.phone}
                      onChange={(e) => setField('phone', e.target.value)}
                      className="field"
                    />
                    {renderError('phone')}
                  </div>

                  <div>
                    <label htmlFor="checkout-orderNote" className="mb-1 block text-sm font-medium">
                      Note (optional)
                    </label>
                    <textarea
                      id="checkout-orderNote"
                      rows={2}
                      placeholder="Anything we should know about your order"
                      value={form.orderNote}
                      onChange={(e) => setField('orderNote', e.target.value)}
                      className="field"
                    />
                  </div>
                </fieldset>
              </>
            )}
          </div>

          {items.length > 0 && (
            <div className="space-y-3 border-t border-line-soft bg-surface p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted">Subtotal</span>
                <span className="text-xl font-bold tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-muted">
                You pay nothing now. We confirm your order on WhatsApp, then you pay by Paybill {SITE_CONFIG.payment.paybill}.
              </p>
              <button type="submit" className="btn-whatsapp w-full py-3.5">
                <MessageCircle className="h-4 w-4" />
                <span>Send order on WhatsApp</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
