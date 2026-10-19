import React, { useId, useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { IMAGES } from '../data/images';

export const AboutUs: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();

  return (
    <section id="about" aria-labelledby="about-title" className="page-container section">
      <SectionHeading id="about-title" title="About us" />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="flex flex-col space-y-10 sm:space-y-12 lg:col-span-7">
          <p className="max-w-md pr-4 text-base leading-relaxed sm:ml-auto sm:pr-8 sm:text-lg">
            Our clothing brand helps people create a comfortable and stylish image in the modern world.
          </p>
          <p className="max-w-md text-base leading-relaxed sm:pl-4 sm:text-lg">
            Our clothes are made from natural materials, so you get comfort that lasts all day.
          </p>

          <div className="aspect-[16/10] overflow-hidden rounded-card border border-line bg-surface sm:aspect-video">
            <img
              src={IMAGES.zipHoodieSteps}
              alt="A man in a navy UNDIGNIFIED zip hoodie and cap, carrying a printed jute bag on a staircase"
              loading="lazy"
              className="h-full w-full object-cover object-[center_45%] transition-transform duration-500 ease-out hover:scale-[1.03]"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-6 lg:col-span-5">
          <div className="aspect-[3/4] overflow-hidden rounded-card border border-line bg-surface sm:aspect-[4/5] lg:aspect-[3/4]">
            <img
              src={IMAGES.hoodieBrown}
              alt="Close-up of the chocolate brown UNDIGNIFIED hoodie with 2 Samuel 6:22 chest print"
              loading="lazy"
              className="h-full w-full object-cover object-[center_60%] transition-transform duration-500 ease-out hover:scale-[1.03]"
            />
          </div>

          <div className="flex flex-col items-end pt-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className="group inline-flex items-center gap-3 rounded-sm py-1 text-sm font-medium transition-colors hover:text-muted"
              aria-expanded={expanded}
              aria-controls={panelId}
            >
              <span>{expanded ? 'Show less' : 'Read more'}</span>
              <svg
                width="42"
                height="12"
                viewBox="0 0 42 12"
                fill="none"
                className="transition-transform duration-300 ease-out group-hover:translate-x-2"
                aria-hidden="true"
              >
                <line x1="0" y1="6" x2="38" y2="6" stroke="currentColor" strokeWidth="1.2" />
                <path d="M34 2L38 6L34 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {expanded && (
              <div id={panelId} className="panel mt-4 animate-rise-in space-y-3 p-5 text-left text-sm leading-relaxed">
                <p className="eyebrow text-ink">Our story</p>
                <p>
                  UNDIGNIFIED started in Nairobi with one verse, 2 Samuel 6:22: “I will become even more undignified
                  than this.” It is printed on our jute bags and hoodies.
                </p>
                <p>
                  We make heavyweight cotton hoodies, sweatshirts, polos and tees that hold their shape, and soften
                  with every wash.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
