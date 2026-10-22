import React, { useState } from 'react';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { MAX_STALLS_PER_APPLICATION, VENDOR_CATEGORIES, VENDOR_EQUIPMENT } from '../data/partnership';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/format';
import { buildVendorApplicationMessage, getWhatsAppUrl, openWhatsAppChat } from '../lib/whatsapp';
import { PaymentDetails } from './PaymentDetails';

interface FormState {
  businessName: string;
  contactName: string;
  phone: string;
  email: string;
  location: string;
  categoryId: string;
  offering: string;
  stalls: string;
  equipment: string[];
  electricity: string;
  certificate: string;
  experience: string;
  pageLink: string;
  agreeFee: boolean;
  agreeRules: boolean;
  consent: boolean;
}

type RequiredKey =
  | 'businessName'
  | 'contactName'
  | 'phone'
  | 'location'
  | 'categoryId'
  | 'offering'
  | 'stalls'
  | 'electricity'
  | 'agreeFee'
  | 'agreeRules'
  | 'consent';
type Errors = Partial<Record<RequiredKey, string>>;

const EMPTY: FormState = {
  businessName: '',
  contactName: '',
  phone: '',
  email: '',
  location: '',
  categoryId: '',
  offering: '',
  stalls: '',
  equipment: [],
  electricity: '',
  certificate: '',
  experience: '',
  pageLink: '',
  agreeFee: false,
  agreeRules: false,
  consent: false,
};

const { partnerships } = SITE_CONFIG.contacts;
const STALL_COUNTS = Array.from({ length: MAX_STALLS_PER_APPLICATION }, (_, i) => String(i + 1));

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (f.businessName.trim().length < 2) e.businessName = 'Enter your business or vendor name.';
  if (f.contactName.trim().length < 2) e.contactName = 'Enter the contact person’s full name.';
  if (f.phone.replace(/\D/g, '').length < 9) e.phone = 'Enter a phone number with at least 9 digits.';
  if (f.location.trim().length < 2) e.location = 'Enter your city or town.';
  if (!f.categoryId) e.categoryId = 'Choose the category that best describes your stall.';
  if (f.offering.trim().length < 3) e.offering = 'List your main products or services.';
  if (!f.stalls) e.stalls = 'Choose how many stalls you need.';
  if (!f.electricity) e.electricity = 'Tell us whether you need electricity.';
  if (!f.agreeFee) e.agreeFee = 'Agree to the stall fee and allocation to apply.';
  if (!f.agreeRules) e.agreeRules = 'Agree to the event rules and your allocated space to apply.';
  if (!f.consent) e.consent = 'We cannot take your application without your consent. Nothing is sent until you agree.';
  return e;
}

/** A radio or checkbox row that fills in when selected. */
const Choice: React.FC<{
  type: 'radio' | 'checkbox';
  name: string;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
  invalid?: boolean;
}> = ({ type, name, checked, onChange, children, invalid }) => (
  <label
    className={`flex cursor-pointer items-start gap-3 rounded-inner border px-4 py-3 text-sm transition-colors has-[:checked]:border-ink has-[:checked]:bg-surface ${
      invalid ? 'border-danger' : 'border-brass'
    }`}
  >
    <input type={type} name={name} checked={checked} onChange={onChange} className="mt-0.5 h-4 w-4 shrink-0 accent-ink" />
    <span className="leading-snug">{children}</span>
  </label>
);

const Group: React.FC<{
  id: string;
  legend: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}> = ({ id, legend, hint, error, children }) => (
  <fieldset
    id={id}
    tabIndex={-1}
    aria-invalid={error ? true : undefined}
    aria-describedby={error ? `${id}-error` : undefined}
    className="space-y-2 outline-none"
  >
    <legend className="mb-2 text-sm font-medium">
      {legend}
      {hint && <span className="ml-2 text-xs font-normal text-muted">{hint}</span>}
    </legend>
    {children}
    {error && (
      <span id={`${id}-error`} className="field-error">
        {error}
      </span>
    )}
  </fieldset>
);

export const VendorForm: React.FC = () => {
  const { addToast } = useCart();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const category = VENDOR_CATEGORIES.find((c) => c.id === form.categoryId);
  const stalls = Number(form.stalls) || 0;
  const estimate = category && stalls ? category.fee * stalls : 0;

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key in errors) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const toggleEquipment = (item: string) =>
    set('equipment', form.equipment.includes(item) ? form.equipment.filter((i) => i !== item) : [...form.equipment, item]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`vendor-${first}`)?.focus();
      return;
    }
    if (!category) return;

    const message = buildVendorApplicationMessage({
      businessName: form.businessName,
      contactName: form.contactName,
      phone: form.phone,
      email: form.email,
      location: form.location,
      categoryName: category.name,
      space: category.space,
      stalls,
      unitFee: category.fee,
      estimatedFee: estimate,
      offering: form.offering,
      equipment: form.equipment,
      electricity: form.electricity,
      certificate: category.needsFoodCertificate ? form.certificate || undefined : undefined,
      experience: form.experience || undefined,
      pageLink: form.pageLink,
    });
    addToast('Opening WhatsApp', 'Send the message to submit your application.', 'whatsapp', {
      label: 'Nothing opened? Open in browser',
      href: getWhatsAppUrl(message, partnerships.number),
    });
    openWhatsAppChat(message, partnerships.number);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-card border border-brass bg-surface/80 p-6 sm:p-8" role="status">
        <CheckCircle2 className="h-8 w-8 text-brass-text" aria-hidden="true" />
        <h3 className="heading-card mt-3 text-3xl">Your application is ready</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Send the message in WhatsApp to submit it. Our team will then review your application and contact you on the
          phone number you gave. Your stall is confirmed only after you receive confirmation from the committee.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Once your stall is confirmed, pay the stall fee to the Paybill below.
        </p>
        <div className="mt-6">
          <PaymentDetails heading="Stall fee payment" />
        </div>
        <button onClick={() => { setForm(EMPTY); setSent(false); }} className="btn-outline btn-sm mt-6">
          Start another application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-6 rounded-card border border-brass bg-surface/60 p-6 sm:p-8">
      <div>
        <h3 className="heading-card text-3xl">Apply for a stall</h3>
        <p className="mt-2 text-sm text-muted">
          Stalls are limited. Submitting this form does not guarantee a stall. You will be contacted once your
          application is reviewed.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="vendor-businessName" className="mb-1 block text-sm font-medium">Business or vendor name</label>
          <input id="vendor-businessName" type="text" maxLength={100} autoComplete="organization" value={form.businessName}
            onChange={(e) => set('businessName', e.target.value)} className="field"
            aria-invalid={errors.businessName ? true : undefined} aria-describedby={errors.businessName ? 'vendor-businessName-error' : undefined} />
          {errors.businessName && <span id="vendor-businessName-error" className="field-error">{errors.businessName}</span>}
        </div>

        <div>
          <label htmlFor="vendor-contactName" className="mb-1 block text-sm font-medium">Contact person (full name)</label>
          <input id="vendor-contactName" type="text" maxLength={80} autoComplete="name" value={form.contactName}
            onChange={(e) => set('contactName', e.target.value)} className="field"
            aria-invalid={errors.contactName ? true : undefined} aria-describedby={errors.contactName ? 'vendor-contactName-error' : undefined} />
          {errors.contactName && <span id="vendor-contactName-error" className="field-error">{errors.contactName}</span>}
        </div>

        <div>
          <label htmlFor="vendor-phone" className="mb-1 block text-sm font-medium">Phone number <span className="text-xs font-normal text-muted">WhatsApp number preferred</span></label>
          <input id="vendor-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="0712 345 678" value={form.phone}
            onChange={(e) => set('phone', e.target.value)} className="field"
            aria-invalid={errors.phone ? true : undefined} aria-describedby={errors.phone ? 'vendor-phone-error' : undefined} />
          {errors.phone && <span id="vendor-phone-error" className="field-error">{errors.phone}</span>}
        </div>

        <div>
          <label htmlFor="vendor-email" className="mb-1 block text-sm font-medium">Email address <span className="text-xs font-normal text-muted">optional</span></label>
          <input id="vendor-email" type="email" autoComplete="email" value={form.email}
            onChange={(e) => set('email', e.target.value)} className="field" />
        </div>

        <div>
          <label htmlFor="vendor-location" className="mb-1 block text-sm font-medium">Business location <span className="text-xs font-normal text-muted">city or town</span></label>
          <input id="vendor-location" type="text" maxLength={80} autoComplete="address-level2" value={form.location}
            onChange={(e) => set('location', e.target.value)} className="field"
            aria-invalid={errors.location ? true : undefined} aria-describedby={errors.location ? 'vendor-location-error' : undefined} />
          {errors.location && <span id="vendor-location-error" className="field-error">{errors.location}</span>}
        </div>
      </div>

      <Group id="vendor-categoryId" legend="Which category best describes your stall?" error={errors.categoryId}>
        {VENDOR_CATEGORIES.map((c) => (
          <Choice key={c.id} type="radio" name="category" checked={form.categoryId === c.id}
            onChange={() => set('categoryId', c.id)} invalid={!!errors.categoryId}>
            <span className="font-semibold">{c.name}</span>
            <span className="text-muted"> · {c.space} · </span>
            <span className="font-semibold tabular-nums">{formatPrice(c.fee)}</span>
          </Choice>
        ))}
      </Group>

      <div>
        <label htmlFor="vendor-offering" className="mb-1 block text-sm font-medium">What exactly will you sell or display?</label>
        <textarea id="vendor-offering" rows={3} maxLength={600} placeholder="List your main products or services." value={form.offering}
          onChange={(e) => set('offering', e.target.value)} className="field"
          aria-invalid={errors.offering ? true : undefined} aria-describedby={errors.offering ? 'vendor-offering-error' : undefined} />
        {errors.offering && <span id="vendor-offering-error" className="field-error">{errors.offering}</span>}
      </div>

      <Group id="vendor-stalls" legend="How many stalls do you need?" error={errors.stalls}>
        <div className="flex flex-wrap gap-2">
          {STALL_COUNTS.map((n) => (
            <Choice key={n} type="radio" name="stalls" checked={form.stalls === n} onChange={() => set('stalls', n)} invalid={!!errors.stalls}>
              {n}
            </Choice>
          ))}
        </div>
        {estimate > 0 && (
          <p className="text-sm font-semibold">
            Proposed fee: <span className="tabular-nums text-brass-text">{formatPrice(estimate)}</span>
            <span className="font-normal text-muted"> ({stalls} × {formatPrice(category!.fee)})</span>
          </p>
        )}
      </Group>

      <Group id="vendor-equipment" legend="Which of these will you bring yourself?" hint="optional">
        <div className="grid gap-2 sm:grid-cols-2">
          {VENDOR_EQUIPMENT.map((item) => (
            <Choice key={item} type="checkbox" name="equipment" checked={form.equipment.includes(item)} onChange={() => toggleEquipment(item)}>
              {item}
            </Choice>
          ))}
        </div>
      </Group>

      <Group id="vendor-electricity" legend="Will you need electricity at your stall?" error={errors.electricity}>
        <div className="flex flex-wrap gap-2">
          {['Yes', 'No'].map((v) => (
            <Choice key={v} type="radio" name="electricity" checked={form.electricity === v} onChange={() => set('electricity', v)} invalid={!!errors.electricity}>
              {v}
            </Choice>
          ))}
        </div>
      </Group>

      {category?.needsFoodCertificate && (
        <Group id="vendor-certificate" legend="Do you hold a valid food handler or health certificate?" hint="optional">
          <div className="flex flex-wrap gap-2">
            {['Yes', 'No', 'Not applicable'].map((v) => (
              <Choice key={v} type="radio" name="certificate" checked={form.certificate === v} onChange={() => set('certificate', v)}>
                {v}
              </Choice>
            ))}
          </div>
        </Group>
      )}

      <Group id="vendor-experience" legend="Have you been a vendor at an event before?" hint="optional">
        <div className="flex flex-wrap gap-2">
          {['Yes', 'No'].map((v) => (
            <Choice key={v} type="radio" name="experience" checked={form.experience === v} onChange={() => set('experience', v)}>
              {v}
            </Choice>
          ))}
        </div>
      </Group>

      <div>
        <label htmlFor="vendor-pageLink" className="mb-1 block text-sm font-medium">Link to your business page <span className="text-xs font-normal text-muted">Instagram, Facebook, TikTok or website · optional</span></label>
        <input id="vendor-pageLink" type="url" maxLength={200} inputMode="url" placeholder="https://" value={form.pageLink}
          onChange={(e) => set('pageLink', e.target.value)} className="field" />
      </div>

      <div className="space-y-2 border-t border-brass-line pt-6">
        <div>
          <Choice type="checkbox" name="agreeFee" checked={form.agreeFee} onChange={() => set('agreeFee', !form.agreeFee)} invalid={!!errors.agreeFee}>
            <span id="vendor-agreeFee" tabIndex={-1}>
              Yes, I agree to the stall fee for my category and understand that my stall is allocated only after the
              committee confirms my application.
            </span>
          </Choice>
          {errors.agreeFee && <span className="field-error">{errors.agreeFee}</span>}
        </div>
        <div>
          <Choice type="checkbox" name="agreeRules" checked={form.agreeRules} onChange={() => set('agreeRules', !form.agreeRules)} invalid={!!errors.agreeRules}>
            <span id="vendor-agreeRules" tabIndex={-1}>Yes, I agree to keep to the event rules and to the stall space allocated to me.</span>
          </Choice>
          {errors.agreeRules && <span className="field-error">{errors.agreeRules}</span>}
        </div>
        <div>
          <Choice type="checkbox" name="consent" checked={form.consent} onChange={() => set('consent', !form.consent)} invalid={!!errors.consent}>
            <span id="vendor-consent" tabIndex={-1}>
              Yes, I consent to RGC Ruiru collecting and using the information in this form (business name, name,
              phone number, email and other details) for vendor coordination and communication for Undignified Worship
              Night 2026.
            </span>
          </Choice>
          {errors.consent && <span className="field-error">{errors.consent}</span>}
        </div>
      </div>

      <button type="submit" className="btn-whatsapp w-full py-3.5">
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        <span>Send application on WhatsApp</span>
      </button>
    </form>
  );
};
