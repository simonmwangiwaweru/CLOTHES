import React, { useState } from 'react';

export const AboutUs: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" aria-label="About UNDIGNIFIED" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Top Section Header */}
      <div className="mb-10 sm:mb-14">
        <h2 className="font-['Bebas_Neue',Anton,sans-serif] text-5xl sm:text-6xl md:text-7xl uppercase text-[#0A0A0A] tracking-tight leading-none">
          ABOUT US
        </h2>
      </div>

      {/* Asymmetrical Grid matching reference mock */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Span 7): Offset Text Blocks + Wide Image */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-10 sm:space-y-12">
          
          {/* Offset Text Block 1 */}
          <div className="max-w-md sm:ml-auto pr-4 sm:pr-8">
            <p className="text-base sm:text-lg text-[#0A0A0A] font-normal leading-relaxed">
              Our clothing brand helps people create a comfortable and stylish image in the modern world.
            </p>
          </div>

          {/* Offset Text Block 2 */}
          <div className="max-w-md pl-0 sm:pl-4">
            <p className="text-base sm:text-lg text-[#0A0A0A] font-normal leading-relaxed">
              Our clothes are made entirely from natural materials, which allows you to create one hundred percent comfort.
            </p>
          </div>

          {/* Wide Rounded Image (Sneakers / Legs) */}
          <div className="relative group overflow-hidden rounded-[20px] border border-[rgba(26,26,26,0.7)] bg-[#EBE5DE] aspect-16/10 sm:aspect-16/9">
            <img
              src="/src/assets/images/sneakers_editorial_street_1792442254883.jpg"
              alt="UNDIGNIFIED footwear and relaxed streetwear hem"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-[#0A0A0A]/5 pointer-events-none" />
          </div>

        </div>

        {/* Right Column (Span 5): Tall Rounded Image + Read More Action */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          
          {/* Tall Rounded Image (Hoodie Close-up) */}
          <div className="relative group overflow-hidden rounded-[20px] border border-[rgba(26,26,26,0.7)] bg-[#EBE5DE] aspect-3/4 sm:aspect-4/5 lg:aspect-3/4">
            <img
              src="/src/assets/images/hoodie_editorial_detail_1792442238613.jpg"
              alt="Oversized loopback cotton hoodie silhouette"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-[#0A0A0A]/5 pointer-events-none" />
          </div>

          {/* Read more link with thin long arrow */}
          <div className="flex flex-col items-end pt-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className="group inline-flex items-center gap-3 text-sm font-medium text-[#0A0A0A] hover:text-[#6B645D] transition-colors focus-visible:outline-2 focus-visible:outline-[#0A0A0A] rounded-sm py-1"
              aria-expanded={expanded}
            >
              <span>{expanded ? 'Show less' : 'Read more'}</span>
              {/* Thin custom arrow with line & head */}
              <svg
                width="42"
                height="12"
                viewBox="0 0 42 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 ease-out group-hover:translate-x-2"
                aria-hidden="true"
              >
                <line x1="0" y1="6" x2="38" y2="6" stroke="#0A0A0A" strokeWidth="1.2" />
                <path d="M34 2L38 6L34 10" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Expandable manifesto copy */}
            {expanded && (
              <div className="mt-4 p-5 rounded-[16px] border border-[rgba(26,26,26,0.5)] bg-[#EBE5DE] text-xs text-[#0A0A0A] space-y-3 animate-in fade-in slide-in-from-top-2 duration-300 text-left">
                <p className="font-semibold uppercase tracking-wider">The UNDIGNIFIED Ethos</p>
                <p className="leading-relaxed">
                  Founded in Nairobi, UNDIGNIFIED was created to challenge fast fashion mediocrity with unapologetic weight and deliberate craftsmanship. We design exclusively with heavy organic cotton, durable unbrushed French terry, and raw selvedge denim.
                </p>
                <p className="leading-relaxed">
                  No loud synthetic logos. No flimsy fabrics. Every garment is cut for effortless everyday wear and built to last years, softening with age into a personal second skin.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
