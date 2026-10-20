import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { useCart } from '../context/CartContext';

const { payment } = SITE_CONFIG;

const CopyButton: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  const { addToast } = useCart();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      addToast('Copied', `${label}: ${value}`);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      addToast('Could not copy', `Select the ${label.toLowerCase()} and copy it by hand.`);
    }
  };

  return (
    <button onClick={copy} className="icon-btn h-8 w-8" aria-label={`Copy ${label.toLowerCase()}`}>
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
};

/** Paybill details, shown under both "Partner with us" and "How to pay". */
export const PaymentDetails: React.FC<{ heading?: string }> = ({ heading = 'Giving details' }) => (
  <div className="rounded-card border border-brass bg-surface/80 p-6 sm:p-7">
    <h3 className="heading-card mb-5 text-brass-text">{heading}</h3>

    <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
      <div>
        <dt className="eyebrow">Paybill number</dt>
        <dd className="mt-1 flex items-center gap-3">
          <span className="font-display text-5xl leading-none tracking-wide tabular-nums">{payment.paybill}</span>
          <CopyButton value={payment.paybill} label="Paybill number" />
        </dd>
      </div>
      <div>
        <dt className="eyebrow">Account number</dt>
        <dd className="mt-1 flex items-center gap-3">
          <span className="font-display text-5xl leading-none tracking-wide tabular-nums">{payment.accountNumber}</span>
          <CopyButton value={payment.accountNumber} label="Account number" />
        </dd>
      </div>
      <div>
        <dt className="eyebrow">Bank</dt>
        <dd className="mt-1 text-base font-semibold">{payment.bank}</dd>
      </div>
      <div>
        <dt className="eyebrow">Account title</dt>
        <dd className="mt-1 text-base font-semibold">{payment.accountTitle}</dd>
      </div>
    </dl>
  </div>
);
