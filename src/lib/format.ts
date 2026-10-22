/**
 * Format currency in KES using en-KE locale with thousands separator
 */
const kesFormatter = new Intl.NumberFormat('en-KE', {
  style: 'currency',
  currency: 'KES',
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  // Format as "KES 4,800"
  try {
    const formatted = kesFormatter.format(amount);
    // Ensure clean KES spacing
    return formatted.replace(/Ksh\s*/i, 'KES ').replace(/^KES\s*/i, 'KES ');
  } catch {
    return `KES ${amount.toLocaleString('en-KE')}`;
  }
}

/**
 * Generate a short random 6-character alphanumeric order code
 */
export function generateOrderCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/** "254704514466" -> "0704 514 466". Falls back to "+digits" for non-Kenyan numbers. */
export function formatPhoneDisplay(number: string): string {
  const digits = number.replace(/\D/g, '');
  if (digits.startsWith('254') && digits.length === 12) {
    const national = `0${digits.slice(3)}`;
    return `${national.slice(0, 4)} ${national.slice(4, 7)} ${national.slice(7)}`;
  }
  return digits ? `+${digits}` : number;
}
