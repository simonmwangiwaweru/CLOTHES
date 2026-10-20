import React from 'react';
import { SITE_CONFIG } from '../config/site';
import { SectionHeading } from './SectionHeading';
import { PaymentDetails } from './PaymentDetails';

const { payment } = SITE_CONFIG;

// A real sequence: each step needs the one before it, so these are numbered.
const STEPS = [
  {
    title: 'Send your order',
    body: 'Fill your bag and send the order on WhatsApp. We reply to confirm availability and how you will collect it.',
  },
  {
    title: 'Pay by Paybill',
    body: `Pay to Paybill ${payment.paybill}, account ${payment.accountNumber}. The account title is ${payment.accountTitle}.`,
  },
  {
    title: 'Confirm on WhatsApp',
    body: 'Reply with your payment confirmation. We then confirm your order.',
  },
];

export const Payment: React.FC = () => (
  <section id="payment" aria-labelledby="payment-title" className="page-container section">
    <SectionHeading
      id="payment-title"
      title="How to pay"
      description="You pay nothing until we have confirmed your order on WhatsApp."
    />

    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <ol className="space-y-4 lg:col-span-6">
        {STEPS.map((step, index) => (
          <li key={step.title} className="card flex gap-5 p-6">
            <span
              aria-hidden="true"
              className="font-display text-5xl leading-none text-gold"
            >
              {index + 1}
            </span>
            <div>
              <h3 className="heading-card mb-1.5">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="lg:col-span-6">
        <PaymentDetails heading="Payment details" />
      </div>
    </div>
  </section>
);
