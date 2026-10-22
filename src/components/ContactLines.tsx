import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { formatPhoneDisplay } from '../lib/format';
import { getWhatsAppUrl, handleWhatsAppLinkClick } from '../lib/whatsapp';

const CONTACTS = Object.values(SITE_CONFIG.contacts);

/** Both contact numbers, each with a call link and a WhatsApp link. Use wherever a contact is needed. */
export const ContactLines: React.FC<{ className?: string }> = ({ className = '' }) => (
  <ul className={`grid gap-4 sm:grid-cols-2 ${className}`}>
    {CONTACTS.map((contact) => (
      <li key={contact.id} className="rounded-inner border border-brass px-4 py-3">
        <p className="eyebrow">{contact.label}</p>
        <p className="mt-1 text-sm font-semibold">{contact.name}</p>
        <p className="mt-0.5 text-lg font-bold tabular-nums">{formatPhoneDisplay(contact.number)}</p>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm font-semibold">
          <a
            href={`tel:+${contact.number}`}
            className="inline-flex items-center gap-1.5 underline underline-offset-4 hover:text-brass-text"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" /> Call
          </a>
          <a
            href={getWhatsAppUrl(contact.greeting, contact.number)}
            onClick={(e) => handleWhatsAppLinkClick(e, contact.greeting, contact.number)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 underline underline-offset-4 hover:text-brass-text"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" /> WhatsApp
          </a>
        </div>
      </li>
    ))}
  </ul>
);
