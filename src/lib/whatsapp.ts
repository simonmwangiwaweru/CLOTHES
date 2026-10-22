import type React from 'react';
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

  lines.push('Hello UNDIGNIFIED MERCH, I would like to order from the Worship Night 2026 collection.');
  lines.push('');
  lines.push(`ORDER #UND-${orderCode}`);

  cartItems.forEach((item, index) => {
    const lineTotal = item.product.price * item.quantity;
    lines.push(
      `${index + 1}. ${item.product.name} | Size ${item.selectedSize} | Color ${item.selectedColor.name} | Qty ${item.quantity} | ${formatPrice(lineTotal)}`
    );
  });

  lines.push(`Subtotal: ${formatPrice(subtotal)}`);
  lines.push('');
  lines.push(`Name: ${form.fullName.trim()}`);
  lines.push(`Phone: ${form.phone.trim()}`);
  lines.push(`Note: ${form.orderNote.trim() ? form.orderNote.trim() : 'None'}`);
  lines.push('');
  lines.push('Please confirm availability, how I will collect my order, and payment details.');

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
    'Hello UNDIGNIFIED MERCH, I would like to order from the Worship Night 2026 collection.',
    '',
    `ORDER #UND-${orderCode}`,
    `1. ${product.name} | Size ${size} | Color ${color} | Qty ${quantity} | ${formatPrice(lineTotal)}`,
    `Subtotal: ${formatPrice(lineTotal)}`,
    '',
    'Please confirm availability, how I will collect my order, and payment details.',
  ];

  return lines.join('\n');
}

/**
 * Generates the full WhatsApp URL with encoded message payload.
 */
export function getWhatsAppUrl(message: string, number: string = SITE_CONFIG.whatsapp.number): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

/**
 * Generates the general inquiry WhatsApp URL.
 */
export function getGeneralInquiryUrl(customMessage?: string, number?: string): string {
  const message = customMessage || SITE_CONFIG.whatsapp.defaultInquiryMessage;
  return getWhatsAppUrl(message, number);
}

const isMobileDevice = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

/**
 * Opens a WhatsApp chat as directly as the device allows.
 * - Phones: the wa.me link hands straight to the WhatsApp app.
 * - Computers: wa.me always shows an "Open app / Continue to WhatsApp Web" page first, so we
 *   launch the WhatsApp desktop app through its whatsapp:// link instead. Nothing happens if the
 *   app is not installed, which is why callers also offer a "open in browser" link.
 */
export function openWhatsAppChat(message: string, number: string = SITE_CONFIG.whatsapp.number): void {
  if (isMobileDevice()) {
    window.location.href = getWhatsAppUrl(message, number);
    return;
  }
  window.location.href = `whatsapp://send?phone=${number}&text=${encodeURIComponent(message)}`;
}

/** Click handler for plain WhatsApp links: opens the app directly, keeps the href as a fallback. */
export function handleWhatsAppLinkClick(
  e: React.MouseEvent,
  message: string,
  number: string = SITE_CONFIG.whatsapp.number
): void {
  // Let Ctrl/Cmd/middle-click open the normal link in a new tab.
  if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
  e.preventDefault();
  openWhatsAppChat(message, number);
}

/** Message for a sponsorship enquiry, sent to the partnerships contact. */
export function buildSponsorEnquiryMessage(tierName: string, price: number): string {
  return [
    `Hello Godfrey, I would like to sponsor Undignified Worship Night 2026 at the ${tierName} level (${formatPrice(price)}).`,
    '',
    'Please tell me the next steps.',
  ].join('\n');
}

export interface VendorApplication {
  businessName: string;
  contactName: string;
  phone: string;
  email: string;
  location: string;
  categoryName: string;
  space: string;
  stalls: number;
  estimatedFee: number;
  offering: string;
  equipment: string[];
  electricity: string;
  certificate?: string;
  experience?: string;
  pageLink?: string;
}

/** Message for a vendor stall application, sent to the partnerships contact. */
export function buildVendorApplicationMessage(a: VendorApplication): string {
  const lines = [
    'Hello Godfrey, I would like to apply for a stall at Undignified Worship Night 2026.',
    '',
    'VENDOR APPLICATION',
    `Business: ${a.businessName.trim()}`,
    `Contact person: ${a.contactName.trim()}`,
    `Phone: ${a.phone.trim()}`,
    `Email: ${a.email.trim() || 'None'}`,
    `Location: ${a.location.trim()}`,
    `Stall category: ${a.categoryName} (${a.space})`,
    `Stalls needed: ${a.stalls}`,
    `Proposed fee: ${formatPrice(a.estimatedFee)}`,
    `Selling or displaying: ${a.offering.trim()}`,
    `Bringing: ${a.equipment.length > 0 ? a.equipment.join(', ') : 'Nothing listed'}`,
    `Electricity needed: ${a.electricity}`,
  ];
  if (a.certificate) lines.push(`Food handler certificate: ${a.certificate}`);
  if (a.experience) lines.push(`Vendor at an event before: ${a.experience}`);
  if (a.pageLink?.trim()) lines.push(`Business page: ${a.pageLink.trim()}`);
  lines.push(
    '',
    'I agree to the stall fee and understand my stall is allocated only after the committee confirms my application.',
    'I agree to keep to the event rules and my allocated space.',
    'I consent to RGC Ruiru using these details for vendor coordination for Undignified Worship Night 2026.'
  );
  return lines.join('\n');
}
