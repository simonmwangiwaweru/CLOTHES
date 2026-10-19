import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { getGeneralInquiryUrl } from '../lib/whatsapp';

export const WhatsAppFab: React.FC = () => {
  const [pulse, setPulse] = useState(true);
  const whatsappUrl = getGeneralInquiryUrl();

  useEffect(() => {
    // Subtle pulse once on load, stops after 4 seconds
    const timer = setTimeout(() => {
      setPulse(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp customer inquiry"
        className={`relative group flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white border-2 border-[#F2EEE9] shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#25D366] ${
          pulse ? 'animate-bounce' : ''
        }`}
      >
        <MessageCircle className="w-7 h-7" />

        {/* Tooltip on hover */}
        <span className="absolute right-16 px-3 py-1.5 rounded-full bg-[#0A0A0A] text-[#F2EEE9] text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
          Chat with UNDIGNIFIED
        </span>
      </a>
    </div>
  );
};
