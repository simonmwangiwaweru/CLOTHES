import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  // The primary hero features the user's authentic UNDIGNIFIED photoshoot
  const heroImage = '/public/assets/aistudio/WhatsApp_Image_2026-10-19_at_21.50.47_5c9a19fe.jpeg';

  return (
    <section
      id="hero"
      aria-label="UNDIGNIFIED New Collection Showcase"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-14"
    >
      {/* Full-width rounded outlined hero container */}
      <div className="relative overflow-hidden rounded-[20px] border border-[rgba(26,26,26,0.7)] bg-[#EBE5DE] min-h-[640px] sm:min-h-[720px] md:min-h-[820px] flex flex-col justify-between p-6 sm:p-10 transition-all duration-300">
        
        {/* Top Header Row inside Hero */}
        <div className="relative z-30 flex items-center justify-between gap-4">
          {/* Small discount badge top-left */}
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#0A0A0A] bg-[#F2EEE9] px-3.5 py-1.5 rounded-full border border-[rgba(26,26,26,0.4)] shadow-xs">
              <Sparkles className="w-3 h-3 text-[#0A0A0A]" />
              {SITE_CONFIG.brand.discountNotice}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs uppercase tracking-widest text-[#6B645D] font-medium">
            <span>Lookbook Drop 04</span>
            <span>·</span>
            <span className="text-[#0A0A0A] font-semibold">Nairobi, KE</span>
          </div>
        </div>

        {/* Giant Headline Layer: "NEW COLLECTION" spanning the entire width */}
        <div className="absolute inset-x-0 top-12 sm:top-14 md:top-16 z-10 select-none text-center pointer-events-none px-2 overflow-hidden">
          <h1
            style={{
              fontSize: 'clamp(4.2rem, 14.5vw, 12.8rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.035em',
            }}
            className="font-['Bebas_Neue',Anton,sans-serif] uppercase font-normal text-[#0A0A0A] whitespace-nowrap opacity-95"
          >
            NEW COLLECTION
          </h1>
        </div>

        {/* Hero Photo Centerpiece: Commanding, Layered Presence Overlapping the Headline */}
        <div className="relative z-20 flex-1 flex items-end justify-center pt-24 sm:pt-32 md:pt-40 pb-2">
          <div className="relative max-w-4xl w-full h-[380px] sm:h-[480px] md:h-[560px] rounded-[18px] overflow-hidden border border-[rgba(26,26,26,0.8)] bg-[#F2EEE9] shadow-xl group">
            <img
              src={heroImage}
              alt="UNDIGNIFIED streetwear models wearing hoodie, sweatshirt, and carrying printed jute bags"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            
            {/* Subtle bottom gradient vignette */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0A0A0A]/60 via-[#0A0A0A]/20 to-transparent pointer-events-none" />

            {/* Inset Photo Tag */}
            <div className="absolute bottom-4 left-4 sm:left-6 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase drop-shadow-md">
              <span>UNDIGNIFIED · 100% Natural Streetwear</span>
            </div>
            <div className="absolute bottom-4 right-4 sm:right-6 text-white/90 text-xs tracking-wider uppercase drop-shadow-md hidden sm:block">
              <span>2 Samuel 6:22 Series</span>
            </div>
          </div>
        </div>

        {/* Bottom Action Strip: Slogan, CTA, and Carousel Indicator Dots */}
        <div className="relative z-30 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-5 border-t border-[rgba(26,26,26,0.4)]">
          <div className="text-center sm:text-left max-w-md">
            <p className="font-['Bebas_Neue',Anton,sans-serif] text-2xl uppercase tracking-wide text-[#0A0A0A] leading-none">
              WEAR IT LOUD. WEAR IT REAL.
            </p>
            <p className="text-xs text-[#6B645D] mt-1">
              Heavyweight cotton hoodies, sweatshirts, polo shirts, round-necks, caps, jute bags, and wristbands.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8">
            {/* Primary Action Button */}
            <a
              href="#collections"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#0A0A0A] text-[#F2EEE9] text-xs font-bold uppercase tracking-wider hover:bg-[#2A2927] hover:gap-3.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#0A0A0A] shadow-md"
            >
              <span>Shop the collection</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Indicator Dots matching the reference mock (● ○ ○ ○ ○) */}
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Lookbook views"
            >
              {[0, 1, 2, 3, 4].map((dot) => (
                <button
                  key={dot}
                  onClick={() => setActiveTab(dot)}
                  role="tab"
                  aria-selected={activeTab === dot}
                  aria-label={`View ${dot + 1}`}
                  className={`transition-all duration-300 rounded-full focus-visible:outline-2 focus-visible:outline-[#0A0A0A] ${
                    activeTab === dot
                      ? 'w-2.5 h-2.5 bg-[#0A0A0A]'
                      : 'w-2 h-2 bg-transparent border border-[#0A0A0A]/60 hover:border-[#0A0A0A]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
