import React from 'react';
import { SITE_CONFIG } from '../config/site';
import { VENDOR_CATEGORIES } from '../data/partnership';
import { formatPrice } from '../lib/format';
import { ContactLines } from './ContactLines';
import { SectionHeading } from './SectionHeading';
import { VendorForm } from './VendorForm';

const { event } = SITE_CONFIG;

export const Vendors: React.FC = () => (
  <section id="vendors" aria-labelledby="vendors-title" className="page-container section">
    <SectionHeading
      id="vendors-title"
      title="Sell at the night"
      description={`Apply for a stall at ${event.title} on ${event.dateLabel}, ${event.venue}. About 3,000 people are expected.`}
    />

    <p className="mb-10 rounded-inner border border-brass px-5 py-4 text-sm leading-relaxed">
      <span className="font-semibold text-brass-text">Proposed fees.</span> Stall fees, numbers and sizes below are
      proposed and will be confirmed by the committee. Stalls are limited, and applying does not guarantee one.
    </p>

    <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        <ul className="space-y-4">
          {VENDOR_CATEGORIES.map((c) => (
            <li key={c.id} className="card p-5">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="heading-card">{c.name}</h3>
                <p className="shrink-0 font-display text-3xl leading-none tabular-nums">{formatPrice(c.fee)}</p>
              </div>
              <p className="mt-2 text-sm text-muted">{c.examples}</p>
              <p className="mt-3 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider">
                <span className="rounded-full border border-brass px-3 py-1">{c.space}</span>
                <span className="rounded-full border border-brass px-3 py-1">{c.stalls} stalls</span>
                <span className="rounded-full border border-brass px-3 py-1">Per stall</span>
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <p className="label mb-3">Questions about stalls</p>
          <ContactLines className="sm:grid-cols-1" />
        </div>
      </div>

      <div className="lg:col-span-7">
        <VendorForm />
      </div>
    </div>
  </section>
);
