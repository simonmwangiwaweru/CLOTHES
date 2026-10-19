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
