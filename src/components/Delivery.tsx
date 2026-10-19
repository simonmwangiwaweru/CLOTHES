import React from 'react';
import { Truck, MapPin, CheckCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export const Delivery: React.FC = () => {
  const icons = [
    <Truck className="w-5 h-5 text-[#0A0A0A]" key="truck" />,
    <MapPin className="w-5 h-5 text-[#0A0A0A]" key="pin" />,
    <CheckCircle className="w-5 h-5 text-[#0A0A0A]" key="check" />,
  ];

  return (
    <section id="delivery" aria-label="Delivery and Shipping Information" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Title */}
      <div className="mb-10 sm:mb-12">
        <h2 className="font-['Bebas_Neue',Anton,sans-serif] text-5xl sm:text-6xl md:text-7xl uppercase text-[#0A0A0A] tracking-tight leading-none">
          DELIVERY & PAYMENT
        </h2>
        <p className="mt-2 text-sm text-[#6B645D]">
          Transparent logistics across Nairobi and Kenya. Fast dispatch, zero friction.
        </p>
      </div>

      {/* 3 Outlined Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SITE_CONFIG.deliveryCards.map((card, idx) => (
          <div
            key={card.title}
            className="flex flex-col justify-between p-6 sm:p-7 rounded-[20px] border border-[rgba(26,26,26,0.7)] bg-[#EBE5DE]/40 hover:bg-[#EBE5DE] transition-colors"
          >
            <div>
              <div className="w-10 h-10 rounded-full border border-[rgba(26,26,26,0.7)] bg-[#F2EEE9] flex items-center justify-center mb-6">
                {icons[idx]}
              </div>

              <h3 className="font-['Bebas_Neue',Anton,sans-serif] text-2xl uppercase tracking-wide text-[#0A0A0A] mb-1">
                {card.title}
              </h3>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#0A0A0A] uppercase tracking-wider mb-3">
                <span>{card.timeframe}</span>
                <span>·</span>
                <span className="text-[#6B645D]">{card.cost}</span>
              </div>

              <p className="text-xs sm:text-sm text-[#6B645D] leading-relaxed">
                {card.description}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[rgba(26,26,26,0.3)] flex items-center justify-between text-xs text-[#0A0A0A]">
              <span className="font-medium">Direct WhatsApp Tracking</span>
              <span>0{idx + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
