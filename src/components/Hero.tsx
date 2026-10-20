import React, { useRef, useState } from 'react';
import { ArrowRight, CalendarDays, Clock, MapPin, Pause, Play, Ticket } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { IMAGES } from '../data/images';

const { event } = SITE_CONFIG;

const FACTS = [
  { icon: CalendarDays, label: event.dateLabel },
  { icon: Clock, label: event.timeLabel },
  { icon: Ticket, label: event.entry },
];

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  // People who ask their system for less motion get a still photo, not a moving loop.
  const [reduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden border-b border-line-soft"
    >
      {/* Soft wash behind the headline. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-surface to-bg"
      />

      <div className="page-container grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-5 text-gold">{event.host} presents</p>

          <h1 id="hero-title" className="font-display uppercase">
            <span
              className="text-gold-metal block leading-[0.82] tracking-tight"
              style={{ fontSize: 'clamp(3.4rem, 8.6vw, 8rem)' }}
            >
              Undignified
            </span>
            <span
              className="mt-2 block leading-none tracking-wide text-ink"
              style={{ fontSize: 'clamp(1.9rem, 5.2vw, 3.75rem)' }}
            >
              {event.title}
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            “{event.verse.text}” <span className="whitespace-nowrap text-muted">{event.verse.reference}</span>
          </p>

          <ul className="mt-7 flex flex-wrap gap-2.5">
            {FACTS.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold"
              >
                <Icon className="h-4 w-4 text-gold" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-start gap-2 text-sm text-muted">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            <span>{event.venue}</span>
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#partner" className="btn-primary group px-8 py-3.5">
              <span>Partner with us</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#collections" className="btn-outline px-8 py-3.5">
              Shop the collection
            </a>
          </div>
        </div>

        <figure className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px] lg:col-span-5 lg:mr-0 lg:max-w-[400px] lg:justify-self-end">
          <div className="relative aspect-[9/16] overflow-hidden rounded-card border border-line bg-surface shadow-xl">
            {reduceMotion ? (
              <img
                src={IMAGES.heroPoster}
                alt="A model in a navy UNDIGNIFIED hoodie and cap, carrying a printed jute bag"
                className="h-full w-full object-cover"
              />
            ) : (
              <>
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={IMAGES.heroPoster}
                  aria-label="Models wearing UNDIGNIFIED hoodies, sweatshirts and jute bags outside RGC Ruiru"
                >
                  <source src={IMAGES.heroVideo} type="video/mp4" />
                </video>
                <button
                  onClick={togglePlayback}
                  className="icon-btn absolute bottom-3 right-3 border-white/50 bg-black/60 text-white backdrop-blur-xs hover:border-white hover:bg-white hover:text-black"
                  aria-label={playing ? 'Pause video' : 'Play video'}
                >
                  {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
              </>
            )}
          </div>
        </figure>
      </div>
    </section>
  );
};
