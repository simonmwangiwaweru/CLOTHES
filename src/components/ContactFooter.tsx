import React from 'react';
import { MessageCircle, MapPin, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { Logo } from './Logo';
import { getGeneralInquiryUrl } from '../lib/whatsapp';

const { event } = SITE_CONFIG;

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About us', href: '#about' },
  { label: 'Partner with us', href: '#partner' },
  { label: 'Featured', href: '#popular' },
  { label: 'Collections', href: '#collections' },
  { label: 'How to pay', href: '#payment' },
  { label: 'Contact', href: '#contact' },
];

export const ContactFooter: React.FC = () => (
  <footer id="contact" className="mt-20 border-t border-brass bg-surface/50">
    <div className="page-container py-16 sm:py-20">
      <div className="grid grid-cols-1 gap-12 border-b border-brass-line pb-16 lg:grid-cols-12">
        <div className="flex flex-col justify-between gap-6 lg:col-span-7">
          <div>
            <span className="eyebrow text-brass-text">Contact</span>
            <h2 className="mt-2 font-display text-6xl uppercase leading-none tracking-tight sm:text-7xl md:text-8xl">
              Let’s talk
            </h2>
            <p className="mt-4 max-w-lg text-base text-muted">
              Questions about an order, sizing, or partnering with {event.title}? Message us on WhatsApp.
            </p>
          </div>

          <div>
            <a href={getGeneralInquiryUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp gap-3 px-8 py-4 shadow-md">
              <MessageCircle className="h-5 w-5" />
              <span>Chat on WhatsApp</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-5">
          <dl>
            <dt className="label flex items-center gap-1.5 text-brass-text">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Location
            </dt>
            <dd className="mt-2 font-display text-4xl uppercase leading-none tracking-wide">
              {SITE_CONFIG.brand.location}
            </dd>
          </dl>

          <figure className="panel p-5">
            <blockquote className="text-base leading-relaxed text-ink-soft">“{event.verse.text}”</blockquote>
            <figcaption className="mt-2 text-xs font-semibold uppercase tracking-widest text-brass-text">
              {event.verse.reference}
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-6 pt-8 md:flex-row">
        <Logo size="sm" />

        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-muted">© {new Date().getFullYear()} UNDIGNIFIED MERCH. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
