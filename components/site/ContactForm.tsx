'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

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

export function ContactForm() {
  const { dict } = useI18n();
  const f = dict.contact.form;
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (key: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
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
    // Frontend-only: simulate submit. Ready for an n8n webhook integration later.
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSuccess(true);
    setForm(initialState);
  };

  if (success) {
    return (
      <div className="card-tello flex flex-col items-center p-8 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[hsl(var(--neon))/0.4] bg-[hsl(var(--neon))/0.1] text-[hsl(var(--neon))]">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-xl font-bold text-white">{f.successTitle}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/60">{f.successMessage}</p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="btn-ghost-tello mt-6"
        >
          {f.sendAnother}
        </button>
      </div>
    );
  }

  const fieldClass =
    'flex h-10 w-full rounded-md border border-input bg-[hsl(0_0%_8%)] px-3 py-2 text-sm text-white ring-offset-background placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--neon))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
  const selectClass = cn(fieldClass, 'appearance-none cursor-pointer');
  const errorClass = 'border-destructive/70 focus-visible:ring-destructive';

  return (
    <form onSubmit={handleSubmit} className="card-tello p-6 sm:p-8" noValidate>
      <h3 className="text-xl font-bold text-white">{f.title}</h3>
      <p className="mt-1.5 text-sm text-white/60">{f.subtitle}</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {/* Full name */}
        <div className="space-y-1.5">
          <Label htmlFor="fullName" className="text-white/80">
            {f.fullName} <span className="text-[hsl(var(--neon))]">*</span>
          </Label>
          <Input
            id="fullName"
            value={form.fullName}
            onChange={(e) => update('fullName', e.target.value)}
            placeholder={f.fullNamePlaceholder}
            className={cn(fieldClass, errors.fullName && errorClass)}
            aria-invalid={!!errors.fullName}
          />
          {errors.fullName && <FieldError msg={errors.fullName} />}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-white/80">
            {f.email} <span className="text-[hsl(var(--neon))]">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder={f.emailPlaceholder}
            className={cn(fieldClass, errors.email && errorClass)}
            aria-invalid={!!errors.email}
          />
          {errors.email && <FieldError msg={errors.email} />}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-white/80">
            {f.phone} <span className="text-[hsl(var(--neon))]">*</span>
          </Label>
          <Input
            id="phone"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder={f.phonePlaceholder}
            className={cn(fieldClass, errors.phone && errorClass)}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <FieldError msg={errors.phone} />}
        </div>

        {/* Company */}
        <div className="space-y-1.5">
          <Label htmlFor="company" className="text-white/80">
            {f.company}
          </Label>
          <Input
            id="company"
            value={form.company}
            onChange={(e) => update('company', e.target.value)}
            placeholder={f.companyPlaceholder}
            className={fieldClass}
          />
        </div>

        {/* Service interest */}
        <div className="space-y-1.5">
          <Label htmlFor="service" className="text-white/80">
            {f.serviceInterest} <span className="text-[hsl(var(--neon))]">*</span>
          </Label>
          <select
            id="service"
            value={form.service}
            onChange={(e) => update('service', e.target.value)}
            className={cn(selectClass, errors.service && errorClass)}
            aria-invalid={!!errors.service}
          >
            <option value="" disabled>
              {f.servicePlaceholder}
            </option>
            {f.serviceOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-[hsl(0_0%_8%)] text-white">
                {opt}
              </option>
            ))}
          </select>
          {errors.service && <FieldError msg={errors.service} />}
        </div>

        {/* Budget */}
        <div className="space-y-1.5">
          <Label htmlFor="budget" className="text-white/80">
            {f.budget} <span className="text-[hsl(var(--neon))]">*</span>
          </Label>
          <select
            id="budget"
            value={form.budget}
            onChange={(e) => update('budget', e.target.value)}
            className={cn(selectClass, errors.budget && errorClass)}
            aria-invalid={!!errors.budget}
          >
            <option value="" disabled>
              {f.budgetPlaceholder}
            </option>
            {f.budgetOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-[hsl(0_0%_8%)] text-white">
                {opt}
              </option>
            ))}
          </select>
          {errors.budget && <FieldError msg={errors.budget} />}
        </div>
      </div>

      {/* Message */}
      <div className="mt-5 space-y-1.5">
        <Label htmlFor="message" className="text-white/80">
          {f.message} <span className="text-[hsl(var(--neon))]">*</span>
        </Label>
        <Textarea
          id="message"
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder={f.messagePlaceholder}
          className={cn(
            'min-h-[120px] w-full rounded-md border border-input bg-[hsl(0_0%_8%)] px-3 py-2 text-sm text-white ring-offset-background placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--neon))] focus-visible:ring-offset-2',
            errors.message && errorClass
          )}
          aria-invalid={!!errors.message}
        />
        {errors.message && <FieldError msg={errors.message} />}
      </div>

      {/* Consent */}
      <div className="mt-5 space-y-2">
        <div className="flex items-start gap-3">
          <Checkbox
            id="consent"
            checked={form.consent}
            onCheckedChange={(v) => update('consent', v === true)}
            className="mt-0.5 data-[state=checked]:bg-[hsl(var(--neon))] data-[state=checked]:text-[hsl(150_80%_6%)]"
            aria-invalid={!!errors.consent}
          />
          <Label htmlFor="consent" className="text-sm leading-relaxed text-white/70">
            {f.consent}
          </Label>
        </div>
        {errors.consent && <FieldError msg={errors.consent} />}
      </div>

      <button type="submit" disabled={submitting} className="btn-neon mt-6 w-full">
        {submitting ? f.sending : f.submit}
      </button>
    </form>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <p className="flex items-center gap-1.5 text-xs text-destructive" role="alert">
      <AlertCircle className="h-3.5 w-3.5" />
      {msg}
    </p>
  );
}
