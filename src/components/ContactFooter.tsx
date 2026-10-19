import React from 'react';
import { MessageCircle, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { Logo } from './Logo';
import { getGeneralInquiryUrl } from '../lib/whatsapp';

export const ContactFooter: React.FC = () => {
  const whatsappUrl = getGeneralInquiryUrl();

  const navLinks = [
    { label: 'New Collection', href: '#hero' },
    { label: 'About Us', href: '#about' },
    { label: 'Popular Goods', href: '#popular' },
    { label: 'Collections', href: '#collections' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer id="contact" aria-label="Contact and Brand Information" className="mt-20 border-t border-[rgba(26,26,26,0.7)] bg-[#EBE5DE]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        
        {/* Let's Talk Hero Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[rgba(26,26,26,0.5)]">
          
          {/* Big Heading & WhatsApp CTA (Span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#6B645D]">
                Get in Touch
              </span>
              <h2 className="font-['Bebas_Neue',Anton,sans-serif] text-6xl sm:text-7xl md:text-8xl uppercase tracking-tight text-[#0A0A0A] leading-none mt-2">
                LET'S TALK
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#6B645D] max-w-lg">
                Have questions about sizing, custom wholesale orders, or looking to collaborate? Drop us a direct message on WhatsApp.
              </p>
            </div>

            <div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#20ba59] transition-all shadow-md focus-visible:outline-2 focus-visible:outline-[#25D366]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat with us on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact Details & Socials (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#0A0A0A]">
                  <MapPin className="w-3.5 h-3.5" /> Studio Location
                </div>
                <p className="text-xs text-[#6B645D] leading-relaxed">
                  {SITE_CONFIG.brand.location}<br />
                  Kilimani / CBD Showroom (By Appointment)
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#0A0A0A]">
                  <Clock className="w-3.5 h-3.5" /> Hours
                </div>
                <p className="text-xs text-[#6B645D] leading-relaxed">
                  {SITE_CONFIG.brand.businessHours}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#0A0A0A]">
                  <Mail className="w-3.5 h-3.5" /> Email
                </div>
                <a
                  href={`mailto:${SITE_CONFIG.brand.email}`}
                  className="text-xs text-[#6B645D] hover:text-[#0A0A0A] underline underline-offset-2"
                >
                  {SITE_CONFIG.brand.email}
                </a>
              </div>

              <div className="space-y-1.5">
                <span className="block text-xs uppercase tracking-wider font-semibold text-[#0A0A0A]">
                  Social Channels
                </span>
                <div className="flex flex-col space-y-1 text-xs">
                  <a
                    href={SITE_CONFIG.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6B645D] hover:text-[#0A0A0A] flex items-center gap-1"
                  >
                    Instagram <span>@undignified.ke</span>
                  </a>
                  <a
                    href={SITE_CONFIG.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6B645D] hover:text-[#0A0A0A] flex items-center gap-1"
                  >
                    TikTok <span>@undignified.ke</span>
                  </a>
                </div>
              </div>

            </div>

            <div className="p-4 rounded-[16px] border border-[rgba(26,26,26,0.4)] bg-[#EBE5DE]/60">
              <p className="text-xs font-medium text-[#0A0A0A] mb-1">
                {SITE_CONFIG.brand.tagline}
              </p>
              <p className="text-[11px] text-[#6B645D]">
                {SITE_CONFIG.brand.tone}
              </p>
            </div>
          </div>

        </div>

        {/* Lower Footer Nav & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo size="sm" />

          {/* Quick links */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#6B645D]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#0A0A0A] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="text-xs text-[#6B645D]">
            © {new Date().getFullYear()} UNDIGNIFIED. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};
