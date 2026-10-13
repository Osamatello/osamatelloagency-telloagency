'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { CheckCircle2, AlertCircle, ChevronDown } from 'lucide-react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { cn } from '@/lib/utils';
import { trackEnquiry, trackEnquiryFailed } from '@/lib/analytics';

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  consent: boolean;
}

const initialState: FormState = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  budget: '',
  message: '',
  consent: false,
};

const field =
  'w-full rounded-[2px] border border-[hsl(var(--ds-ink)/0.3)] bg-[hsl(var(--ds-paper-raised))] px-4 py-3.5 text-[0.95rem] text-ink ' +
  'placeholder:text-[hsl(var(--ds-ink)/0.45)] transition-[border-color,box-shadow,background-color] duration-200 ' +
  'hover:border-[hsl(var(--ds-ink)/0.45)] focus:border-brand focus:bg-[hsl(var(--ds-paper))] focus:outline-none ' +
  'focus:ring-2 focus:ring-[hsl(var(--brand)/0.35)]';
const invalid = 'border-[hsl(var(--destructive))] focus:border-[hsl(var(--destructive))] focus:ring-[hsl(var(--destructive))]';

export function ContactForm() {
  const { dict, locale } = useI18n();
  const f = dict.contact.form;
  const contactCopy = locale === 'ar'
    ? {
        emailPlaceholder: 'name@company.com',
        companyLabel: 'اسم الشركة',
        companyPlaceholder: 'اسم شركتك',
        budgetOptions: ['أقل من 500 دولار', '500–1,000 دولار', '1,000–2,000 دولار', 'أكثر من 2,000 دولار'],
      }
    : {
        emailPlaceholder: 'name@company.com',
        companyLabel: 'Company name',
        companyPlaceholder: 'Your company',
        budgetOptions: ['Below $500', '$500–$1,000', '$1,000–$2,000', 'Above $2,000'],
      };
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [trap, setTrap] = useState('');

  const update = (key: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (failed) setFailed(false);
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = f.errors.fullName;
    if (!form.email.trim()) next.email = f.errors.email;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = f.errors.emailInvalid;
    if (!form.phone.trim()) next.phone = f.errors.phone;
    if (!form.service) next.service = f.errors.service;
    if (!form.budget) next.budget = f.errors.budget;
    if (!form.message.trim()) next.message = f.errors.message;
    if (!form.consent) next.consent = f.errors.consent;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setFailed(false);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...form, website: trap, language: locale }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fields?: string[];
      };

      // The server re-validates; surface anything it rejected on the field.
      if (response.status === 400 && Array.isArray(result.fields)) {
        const next: Partial<Record<keyof FormState, string>> = {};
        for (const key of result.fields) {
          const messages = f.errors as Record<string, string | undefined>;
          if (key in initialState) next[key as keyof FormState] = messages[key] ?? f.submitError;
        }
        setErrors(next);
        return;
      }

      // Success is only ever shown after the CRM has actually accepted the lead.
      if (!response.ok || !result.ok) {
        setFailed(true);
        trackEnquiryFailed('rejected');
        return;
      }

      // Counted here rather than on submit, so the number means leads the CRM
      // holds — not attempts. Read before the state reset clears the fields.
      trackEnquiry({ service: form.service, budget: form.budget });

      setSuccess(true);
      setForm(initialState);
      setTrap('');
    } catch {
      setFailed(true);
      trackEnquiryFailed('network');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-[3px] border border-[hsl(var(--ds-ink)/0.26)] bg-[hsl(var(--ds-paper-raised))] p-8 text-center sm:p-12">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-brand/40 bg-brand/10 text-brand">
          <CheckCircle2 className="h-7 w-7" strokeWidth={1.6} />
        </span>
        <h3 className="text-display mt-6 text-[clamp(1.3rem,2.4vw,1.75rem)] text-ink">{f.successTitle}</h3>
        <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-[hsl(var(--ds-ink)/0.85)]">{f.successMessage}</p>
        <button type="button" onClick={() => setSuccess(false)} className="btn-outline mt-8">
          {f.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-[3px] border border-[hsl(var(--ds-ink)/0.26)] bg-[hsl(var(--ds-paper-raised))] p-6 shadow-[0_1px_0_0_hsl(var(--ds-ink)/0.06)] sm:p-9 lg:p-11"
      noValidate
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-brand via-[hsl(var(--brand)/0.35)] to-transparent" />

      <div className="border-b border-[hsl(var(--ds-ink)/0.2)] pb-7">
        <h2 className="text-display text-[clamp(1.4rem,2.6vw,2rem)] text-ink">{f.title}</h2>
        <p className="mt-2 max-w-lg text-[0.95rem] leading-relaxed text-[hsl(var(--ds-ink)/0.85)]">{f.subtitle}</p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field id="fullName" label={f.fullName} required error={errors.fullName}>
          <input
            id="fullName"
            value={form.fullName}
            onChange={(e) => update('fullName', e.target.value)}
            placeholder={f.fullNamePlaceholder}
            className={cn(field, errors.fullName && invalid)}
            aria-invalid={!!errors.fullName}
          />
        </Field>

        <Field id="email" label={f.email} required error={errors.email}>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder={contactCopy.emailPlaceholder}
            className={cn(field, errors.email && invalid)}
            aria-invalid={!!errors.email}
          />
        </Field>

        <Field id="phone" label={f.phone} required error={errors.phone}>
          <input
            id="phone"
            type="tel"
            dir="ltr"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder={f.phonePlaceholder}
            className={cn(field, 'text-start', errors.phone && invalid)}
            aria-invalid={!!errors.phone}
          />
        </Field>

        <Field id="company" label={contactCopy.companyLabel} error={undefined}>
          <input
            id="company"
            value={form.company}
            onChange={(e) => update('company', e.target.value)}
            placeholder={contactCopy.companyPlaceholder}
            className={field}
          />
        </Field>

        <Field id="service" label={f.serviceInterest} required error={errors.service}>
          <Select
            id="service"
            value={form.service}
            onChange={(v) => update('service', v)}
            placeholder={f.servicePlaceholder}
            options={f.serviceOptions}
            invalid={!!errors.service}
          />
        </Field>

        <Field id="budget" label={f.budget} required error={errors.budget}>
          <Select
            id="budget"
            value={form.budget}
            onChange={(v) => update('budget', v)}
            placeholder={f.budgetPlaceholder}
            options={contactCopy.budgetOptions}
            invalid={!!errors.budget}
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field id="message" label={f.message} required error={errors.message}>
          <textarea
            id="message"
            rows={5}
            value={form.message}
            onChange={(e) => update('message', e.target.value)}
            placeholder={f.messagePlaceholder}
            className={cn(field, 'min-h-[9rem] resize-y leading-relaxed', errors.message && invalid)}
            aria-invalid={!!errors.message}
          />
        </Field>
      </div>

      {/* Honeypot — hidden from people, catches naive bots. */}
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0" style={{ left: '-9999px' }}>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
        />
      </div>

      <div className="mt-8 border-t border-[hsl(var(--ds-ink)/0.2)] pt-7">
        <label htmlFor="consent" className="flex cursor-pointer items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            checked={form.consent}
            onChange={(e) => update('consent', e.target.checked)}
            aria-invalid={!!errors.consent}
            className="mt-0.5 h-[1.05rem] w-[1.05rem] shrink-0 cursor-pointer accent-[hsl(var(--brand))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          />
          <span className="text-[0.85rem] leading-relaxed text-[hsl(var(--ds-ink)/0.85)]">{f.consent}</span>
        </label>
        {errors.consent && <FieldError msg={errors.consent} />}

        {failed && (
          <p
            className="mt-5 flex items-start gap-2 border border-[hsl(var(--destructive))] bg-[hsl(var(--destructive)/0.06)] px-3.5 py-3 text-[0.85rem] leading-relaxed text-[hsl(var(--destructive))]"
            role="alert"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {f.submitError}
          </p>
        )}

        <button type="submit" disabled={submitting} className="btn-primary mt-8 w-full py-4 disabled:opacity-60">
          {submitting ? f.sending : f.submit}
        </button>
      </div>
    </form>
  );
}

function Field({
  id, label, required, error, children,
}: {
  id: string; label: string; required?: boolean; error?: string; children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2.5 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[hsl(var(--ds-ink)/0.78)]"
      >
        {label}
        {required && <span className="text-brand"> *</span>}
      </label>
      {children}
      {error && <FieldError msg={error} />}
    </div>
  );
}

function Select({
  id, value, onChange, placeholder, options, invalid: isInvalid,
}: {
  id: string; value: string; onChange: (v: string) => void;
  placeholder: string; options: string[]; invalid: boolean;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={isInvalid}
        className={cn(field, 'cursor-pointer appearance-none pe-10', !value && 'text-[hsl(var(--ds-ink)/0.66)]', isInvalid && invalid)}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="text-ink">{opt}</option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 my-auto h-4 w-4 text-[hsl(var(--ds-ink)/0.66)] end-3.5"
      />
    </div>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <p className="mt-2 flex items-center gap-1.5 text-xs text-[hsl(var(--destructive))]" role="alert">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      {msg}
    </p>
  );
}
