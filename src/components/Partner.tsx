import React from 'react';
import { MapPin } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { IMAGES } from '../data/images';
import { PaymentDetails } from './PaymentDetails';

const { event } = SITE_CONFIG;

export const Partner: React.FC = () => (
  <section id="partner" aria-labelledby="partner-title" className="page-container section">
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="mx-auto w-full max-w-sm overflow-hidden rounded-card border border-line shadow-[0_0_90px_-30px_rgb(224_176_76/0.45)] lg:col-span-4 lg:max-w-none">
        <img
          src={IMAGES.poster}
          alt={`Undignified ${event.title} poster: ${event.dateLabel}, ${event.timeLabel.toLowerCase()}, ${event.entry.toLowerCase()}, at ${event.venue}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="lg:col-span-8">
        <p className="eyebrow mb-3 text-gold">Partner with us</p>
        <h2 id="partner-title" className="heading-section">
          Help us make this night happen
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
          Every lyric sung, every prayer answered and every life transformed at {event.title} is fuelled by generosity
          like yours. Your giving does more than fund an event. It creates a space for people to encounter God.
        </p>

        <p className="mt-6 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-line px-5 py-2 text-sm font-semibold">
          <span className="text-gold">{event.dateLabel}</span>
          <span aria-hidden="true" className="text-muted">·</span>
          <span>{event.timeLabel}</span>
          <span aria-hidden="true" className="text-muted">·</span>
          <span>{event.entry}</span>
        </p>
        <p className="mt-3 flex items-start gap-2 text-sm text-muted">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
          <span>{event.venue}</span>
        </p>

        <div className="mt-8">
          <PaymentDetails />
        </div>
      </div>
    </div>
  </section>
);
