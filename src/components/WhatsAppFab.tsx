import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getGeneralInquiryUrl } from '../lib/whatsapp';

export const WhatsAppFab: React.FC = () => (
  <a
    href={getGeneralInquiryUrl()}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with UNDIGNIFIED MERCH on WhatsApp"
    className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border-2 border-bg bg-whatsapp text-ink shadow-xl transition-transform duration-300 hover:scale-110 active:scale-95"
  >
    <MessageCircle className="h-7 w-7" aria-hidden="true" />
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-16 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-on-accent opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      Chat with us
    </span>
  </a>
);
