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
import { Delivery } from './components/Delivery';
import { ContactFooter } from './components/ContactFooter';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppFab } from './components/WhatsAppFab';
import { ToastContainer } from './components/Toast';

export default function App() {
  return (
    <CartProvider>
      <div className="relative min-h-screen bg-bg font-sans text-ink">
        <Header />

        <main>
          <Hero />
          <AboutUs />
          <PopularGoods />
          <Collections />
          <Delivery />
        </main>

        <ContactFooter />

        <ProductModal />
        <CartDrawer />
        <WhatsAppFab />
        <ToastContainer />
      </div>
    </CartProvider>
  );
}
