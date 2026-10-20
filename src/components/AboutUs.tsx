import React from 'react';
import { SectionHeading } from './SectionHeading';
import { IMAGES } from '../data/images';
import { SITE_CONFIG } from '../config/site';

const { event } = SITE_CONFIG;

// Five facts about the fundraiser. Order is not meaningful, so they are not numbered.
const POINTS = [
  {
    title: 'Buy a piece, fund the night',
    body: `Every item sold on this site raises funds for Undignified ${event.title}.`,
  },
  {
    title: 'The night is free to enter',
    body: 'Nobody pays at the door, so sales and gifts are what make the night possible.',
  },
  {
    title: 'A space to encounter God',
    body: 'Your support creates room for people to worship, pray and meet God.',
  },
  {
    title: 'Wear the verse',
    body: `Each design carries ${event.verse.reference}: “${event.verse.text}”`,
  },
  {
    title: 'Give without buying',
    body: 'Prefer to give directly? The Paybill details are under Partner with us.',
  },
];

export const AboutUs: React.FC = () => (
  <section id="about" aria-labelledby="about-title" className="page-container section">
    <SectionHeading id="about-title" title="About us" />

    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <p className="max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
          UNDIGNIFIED is the clothing line raising funds for {event.title}, hosted by {event.host} on{' '}
          {event.dateLabel}. We sell it here, and what you spend helps put the night on.
        </p>

        <ul className="mt-10 divide-y divide-line-soft border-y border-line-soft">
          {POINTS.map((point) => (
            <li key={point.title} className="grid gap-1 py-5 sm:grid-cols-12 sm:gap-6">
              <h3 className="font-display text-2xl uppercase leading-none tracking-wide text-gold sm:col-span-5">
                {point.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted sm:col-span-7">{point.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="aspect-[3/4] overflow-hidden rounded-card border border-line bg-surface sm:aspect-[4/5] lg:col-span-5 lg:aspect-[3/4]">
        <img
          src={IMAGES.hoodieBrown}
          alt="A man in a chocolate brown UNDIGNIFIED hoodie and black cap, with the 2 Samuel 6:22 chest print"
          loading="lazy"
          className="h-full w-full object-cover object-[center_60%] transition-transform duration-500 ease-out hover:scale-[1.03]"
        />
      </div>
    </div>
  </section>
);
