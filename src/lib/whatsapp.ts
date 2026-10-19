import { SITE_CONFIG } from '../config/site';
import { CartItem, CheckoutFormState, Product } from '../types';
import { formatPrice, generateOrderCode } from './format';

/**
 * Builds the WhatsApp direct order message conforming strictly to the brand template.
 */
export function buildWhatsAppOrderMessage(
  cartItems: CartItem[],
  subtotal: number,
  form: CheckoutFormState,
  orderCode: string
): string {
  const lines: string[] = [];

  lines.push('Hello UNDIGNIFIED, I would like to place an order.');
  lines.push('');
  lines.push(`ORDER #UND-${orderCode}`);

  cartItems.forEach((item, index) => {
    const lineTotal = item.product.price * item.quantity;
    lines.push(
      `${index + 1}. ${item.product.name} | Size ${item.selectedSize} | Color ${item.selectedColor.name} | Qty ${item.quantity} | ${formatPrice(lineTotal)}`
    );
  });

  lines.push(`Subtotal: ${formatPrice(subtotal)}`);
  lines.push(`Delivery: ${form.deliveryMethod}`);
  lines.push('');
  lines.push(`Name: ${form.fullName.trim()}`);
  lines.push(`Phone: ${form.phone.trim()}`);
  lines.push(`Address: ${form.deliveryArea.trim()}`);
  lines.push(`Note: ${form.orderNote.trim() ? form.orderNote.trim() : 'None'}`);
  lines.push('');
  lines.push('Please confirm availability and payment details.');

  return lines.join('\n');
}

/**
 * Builds a quick single-item WhatsApp direct order message.
 */
export function buildQuickOrderMessage(
  product: Product,
  size: string,
  color: string,
  quantity: number
): string {
  const orderCode = generateOrderCode();
  const lineTotal = product.price * quantity;
  const lines: string[] = [
    'Hello UNDIGNIFIED, I would like to place a quick order.',
    '',
    `ORDER #UND-${orderCode}`,
    `1. ${product.name} | Size ${size} | Color ${color} | Qty ${quantity} | ${formatPrice(lineTotal)}`,
    `Subtotal: ${formatPrice(lineTotal)}`,
    '',
    'Please confirm availability, delivery options, and payment details.',
  ];

  return lines.join('\n');
}

/**
 * Generates the full WhatsApp URL with encoded message payload.
 */
export function getWhatsAppUrl(message: string): string {
  const number = SITE_CONFIG.whatsapp.number;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

/**
 * Generates the general inquiry WhatsApp URL.
 */
export function getGeneralInquiryUrl(customMessage?: string): string {
  const message = customMessage || SITE_CONFIG.whatsapp.defaultInquiryMessage;
  return getWhatsAppUrl(message);
}

/**
 * Opens WhatsApp in a new tab so the shopper keeps their bag and place on the page.
 * Falls back to same-tab navigation if the browser blocks the popup.
 */
export function openWhatsApp(url: string): void {
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  if (!win) window.location.href = url;
}
