/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { PopularGoods } from './components/PopularGoods';
import { Collections } from './components/Collections';
import { ContactFooter } from './components/ContactFooter';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppFab } from './components/WhatsAppFab';
import { ToastContainer } from './components/Toast';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#F2EEE9] text-[#0A0A0A] font-sans selection:bg-[#0A0A0A] selection:text-[#F2EEE9] relative">
        {/* Sticky Global Navigation */}
        <Header />

        <main>
          {/* Section B: Hero Carousel featuring UNDIGNIFIED photoshoot */}
          <Hero />

          {/* Section C: About Us Asymmetrical Layout */}
          <AboutUs />

          {/* Section D: Popular Goods Horizontal Carousel */}
          <PopularGoods />

          {/* Section E: Collections & Full Product Grid */}
          <Collections />
        </main>

        {/* Section H: Contacts & Footer */}
        <ContactFooter />

        {/* Overlays, Modals, Drawer & Floating Affordances */}
        <ProductModal />
        <CartDrawer />
        <WhatsAppFab />
        <ToastContainer />
      </div>
    </CartProvider>
  );
}
