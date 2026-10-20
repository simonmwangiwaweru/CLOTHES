/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MerchBand } from './components/MerchBand';
import { AboutUs } from './components/AboutUs';
import { Partner } from './components/Partner';
import { PopularGoods } from './components/PopularGoods';
import { Collections } from './components/Collections';
import { Payment } from './components/Payment';
import { ContactFooter } from './components/ContactFooter';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppFab } from './components/WhatsAppFab';
import { ToastContainer } from './components/Toast';
import { Reveal } from './components/Reveal';

export default function App() {
  return (
    <CartProvider>
      <div className="relative min-h-screen bg-bg font-sans text-ink">
        <Header />

        <main>
          <Hero />
          <Reveal>
            <MerchBand />
          </Reveal>
          <Reveal>
            <AboutUs />
          </Reveal>
          <Reveal>
            <Partner />
          </Reveal>
          <Reveal>
            <PopularGoods />
          </Reveal>
          <Reveal>
            <Collections />
          </Reveal>
          <Reveal>
            <Payment />
          </Reveal>
        </main>

        <Reveal>
          <ContactFooter />
        </Reveal>

        <ProductModal />
        <CartDrawer />
        <WhatsAppFab />
        <ToastContainer />
      </div>
    </CartProvider>
  );
}
