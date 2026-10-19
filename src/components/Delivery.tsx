import React from 'react';
import { Truck, MapPin, Wallet } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { SectionHeading } from './SectionHeading';

// One icon per card in SITE_CONFIG.deliveryCards: Nairobi, countrywide, payment.
const ICONS = [Truck, MapPin, Wallet];

export const Delivery: React.FC = () => (
  <section id="delivery" aria-labelledby="delivery-title" className="page-container section">
    <SectionHeading
      id="delivery-title"
      title="Delivery & payment"
      description="How your order reaches you, and when you pay."
    />

    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {SITE_CONFIG.deliveryCards.map((card, idx) => {
        const Icon = ICONS[idx] ?? Truck;
        return (
          <div key={card.title} className="card card-interactive flex flex-col p-6 sm:p-7">
            <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="heading-card mb-1">{card.title}</h3>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider">
              {card.timeframe} <span className="text-muted">· {card.cost}</span>
            </p>
            <p className="text-sm leading-relaxed text-muted">{card.description}</p>
          </div>
        );
      })}
    </div>
  </section>
);
