import React from 'react';
import { MessageCircle, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { Logo } from './Logo';
import { getGeneralInquiryUrl } from '../lib/whatsapp';

const NAV_LINKS = [
  { label: 'New collection', href: '#hero' },
  { label: 'About us', href: '#about' },
  { label: 'Popular goods', href: '#popular' },
  { label: 'Collections', href: '#collections' },
  { label: 'Delivery', href: '#delivery' },
  { label: 'Contact', href: '#contact' },
];

const SOCIALS = [
  { label: 'Instagram', href: SITE_CONFIG.socials.instagram, handle: '@undignified.ke' },
  { label: 'TikTok', href: SITE_CONFIG.socials.tiktok, handle: '@undignified.ke' },
];

export const ContactFooter: React.FC = () => (
  <footer id="contact" className="mt-20 border-t border-line bg-surface/30">
    <div className="page-container py-16 sm:py-20">
      <div className="grid grid-cols-1 gap-12 border-b border-line-soft pb-16 lg:grid-cols-12">
        <div className="flex flex-col justify-between gap-6 lg:col-span-7">
          <div>
            <span className="eyebrow">Contact</span>
            <h2 className="mt-2 font-display text-6xl uppercase leading-none tracking-tight sm:text-7xl md:text-8xl">
              Let’s talk
            </h2>
            <p className="mt-4 max-w-lg text-base text-muted">
              Questions about sizing, bulk orders or a collaboration? Message us on WhatsApp.
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
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-1.5">
              <dt className="label flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Location
              </dt>
              <dd className="text-sm text-muted">{SITE_CONFIG.brand.location}</dd>
            </div>

            <div className="space-y-1.5">
              <dt className="label flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" /> Hours
              </dt>
              <dd className="text-sm text-muted">{SITE_CONFIG.brand.businessHours}</dd>
            </div>

            <div className="space-y-1.5">
              <dt className="label flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" aria-hidden="true" /> Email
              </dt>
              <dd>
                <a href={`mailto:${SITE_CONFIG.brand.email}`} className="text-sm text-muted underline underline-offset-2 hover:text-ink">
                  {SITE_CONFIG.brand.email}
                </a>
              </dd>
            </div>

            <div className="space-y-1.5">
              <dt className="label">Follow us</dt>
              <dd className="flex flex-col gap-1 text-sm">
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink">
                    {s.label} <span className="text-ink">{s.handle}</span>
                  </a>
                ))}
              </dd>
            </div>
          </dl>

          <div className="panel p-4">
            <p className="mb-1 text-sm font-medium">{SITE_CONFIG.brand.tagline}</p>
            <p className="text-xs text-muted">{SITE_CONFIG.brand.tone}</p>
          </div>
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

        <p className="text-xs text-muted">© {new Date().getFullYear()} UNDIGNIFIED. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
