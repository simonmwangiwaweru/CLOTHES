import React from 'react';
import { Check, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { SPONSOR_TIERS, SPONSORSHIP_NOTE } from '../data/partnership';
import { formatPrice } from '../lib/format';
import { buildSponsorEnquiryMessage, getWhatsAppUrl, handleWhatsAppLinkClick } from '../lib/whatsapp';
import { ContactLines } from './ContactLines';
import { SectionHeading } from './SectionHeading';

const PARTNERSHIPS_NUMBER = SITE_CONFIG.contacts.partnerships.number;

export const Sponsors: React.FC = () => (
  <section id="sponsors" aria-labelledby="sponsors-title" className="page-container section">
    <SectionHeading
      id="sponsors-title"
      title="Sponsorship packages"
      description="15th edition. 3,000 in the room, more online, and Essence of Worship live. Choose the level that suits your organisation."
    />

    <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {SPONSOR_TIERS.map((tier) => {
        const message = buildSponsorEnquiryMessage(tier.name, tier.price);
        return (
          <li key={tier.id} className="card flex flex-col p-6">
            <p className="eyebrow text-brass-text">{tier.name}</p>
            <p className="mt-2 font-display text-5xl leading-none tracking-wide tabular-nums">
              {formatPrice(tier.price)}
            </p>

            <p className="mt-6 border-t border-brass-line pt-4 text-xs font-semibold uppercase tracking-wider text-muted">
              {tier.lead}
            </p>
            <ul className="mt-3 flex-1 space-y-2.5">
              {tier.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5 text-sm leading-snug">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass-text" aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <a
              href={getWhatsAppUrl(message, PARTNERSHIPS_NUMBER)}
              onClick={(e) => handleWhatsAppLinkClick(e, message, PARTNERSHIPS_NUMBER)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline btn-sm mt-6 w-full"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Enquire about {tier.name}</span>
            </a>
          </li>
        );
      })}
    </ul>

    <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">{SPONSORSHIP_NOTE}</p>

    <div className="mt-8">
      <p className="label mb-3">To partner with us</p>
      <ContactLines />
    </div>
  </section>
);
