'use client';

import React, { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { cn } from '@/lib/utils';
import { MessageSquare, Calendar, Check, ShieldCheck, User } from 'lucide-react';

export function ClinicSimulator() {
  const { dir } = useI18n();
  const [step, setStep] = useState(0);

  // Auto-run simulator loop
  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1500); // AI is typing...
    const timer2 = setTimeout(() => setStep(2), 3500); // AI sends: Yes, we have 2 PM slot!
    const timer3 = setTimeout(() => setStep(3), 5500); // Patient: Yes, please confirm!
    const timer4 = setTimeout(() => setStep(4), 7000); // AI is typing...
    const timer5 = setTimeout(() => setStep(5), 9000); // AI confirms and updates calendar
    const timer6 = setTimeout(() => {
      setStep(0);
    }, 15000); // Reset loop after 15s

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, [step === 0]); // restart when resetting to step 0

  const isRtl = dir === 'rtl';

  const t = {
    en: {
      phoneHeader: 'AI Clinic Receptionist',
      phoneSub: 'Always online',
      patientMsg1: 'Hello! I need to book a dental checkup for tomorrow at 2:00 PM.',
      aiMsg1: 'Hi Sarah! Checking our calendar... 🗓️ Yes, we have that slot open. Shall I book it for you?',
      patientMsg2: 'Yes, please! Confirm it.',
      aiMsg2: 'Perfect! You are scheduled for tomorrow at 2:00 PM. A calendar invite has been sent. See you then! Check details below.',
      typing: 'AI is typing...',
      calendarTitle: 'Clinic Schedule',
      calendarDay: "Tomorrow's Slots",
      slot1: '10:00 AM - Dr. John (General Checkup)',
      slot2: '11:30 AM - Dr. Emily (Dental Filling)',
      slot3Available: '2:00 PM - Available Slot',
      slot3Booked: '2:00 PM - Sarah Smith (AI Booking)',
      slot4: '3:30 PM - Dr. Michael (Orthodontics)',
      statusActive: 'AI active',
      syncSuccessful: 'CRM & Booking Sync Complete',
    },
    ar: {
      phoneHeader: 'موظف الاستقبال الذكي',
      phoneSub: 'متصل دائماً',
      patientMsg1: 'مرحباً! أود حجز موعد فحص أسنان غداً الساعة 2:00 ظهراً.',
      aiMsg1: 'أهلاً سارة! لحظة من فضلك لأتحقق من المواعيد... 🗓️ نعم، هذا الوقت متاح. هل تريدين تأكيده؟',
      patientMsg2: 'نعم، أرجوكِ! أكدي الحجز.',
      aiMsg2: 'تم الحجز بنجاح غداً في تمام الساعة 2:00 ظهراً. أرسلت تفاصيل الموعد لهاتفك وبريدك الإلكتروني. نراكِ غداً! 😊',
      typing: 'الذكاء الاصطناعي يكتب...',
      calendarTitle: 'جدول المواعيد',
      calendarDay: 'مواعيد الغد',
      slot1: '10:00 ص - د. جون (فحص عام)',
      slot2: '11:30 ص - د. إيميلي (حشوة سن)',
      slot3Available: '2:00 ظ - موعد متاح',
      slot3Booked: '2:00 ظ - سارة سميث (حجز ذكي)',
      slot4: '3:30 م - د. مايكل (تقويم أسنان)',
      statusActive: 'المساعد الذكي نشط',
      syncSuccessful: 'مزامنة السجلات المكتملة',
    },
  }[isRtl ? 'ar' : 'en'];

  return (
    <div className="relative mx-auto w-full max-w-[540px] lg:max-w-none">
      {/* Decorative ambient glowing grids behind */}
      <div className="absolute -inset-4 rounded-3xl bg-[hsl(var(--neon))/0.05] blur-2xl" aria-hidden="true" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-5">
      {/* 1. Desktop Calendar Grid Mockup */}
      <div className="card-tello w-full overflow-hidden border-white/5 bg-slate-950/60 p-5 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-[hsl(var(--neon))/0.2] lg:flex-1">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg bg-[hsl(var(--neon))/0.1] p-2 text-[hsl(var(--neon))]">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">{t.calendarTitle}</h4>
              <p className="text-2xs text-white/40">{t.calendarDay}</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-3xs font-semibold text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {t.statusActive}
          </span>
        </div>

        {/* Calendar slots */}
        <div className="mt-4 space-y-2.5">
          <div className="rounded-lg bg-white/[0.02] p-3 text-xs text-white/50 border border-white/5">
            {t.slot1}
          </div>
          <div className="rounded-lg bg-white/[0.02] p-3 text-xs text-white/50 border border-white/5">
            {t.slot2}
          </div>
          
          {/* Confirmed / Booked Slot Animation */}
          <div
            className={cn(
              'rounded-lg p-3 text-xs border transition-all duration-700 flex items-center justify-between',
              step >= 5
                ? 'bg-[hsl(var(--neon))/0.1] border-[hsl(var(--neon))/0.4] text-white shadow-[0_0_15px_hsl(var(--neon)/0.15)] font-semibold'
                : 'bg-white/[0.03] border-dashed border-white/20 text-[hsl(var(--neon))] font-medium'
            )}
          >
            <span>{step >= 5 ? t.slot3Booked : t.slot3Available}</span>
            {step >= 5 && (
              <Check className="h-4 w-4 text-[hsl(var(--neon))] animate-scale-up" />
            )}
          </div>
          
          <div className="rounded-lg bg-white/[0.02] p-3 text-xs text-white/50 border border-white/5">
            {t.slot4}
          </div>
        </div>

        {/* Sync state message */}
        {step >= 5 && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-500/10 p-2.5 text-xs text-emerald-400 border border-emerald-500/20 animate-fade-in">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span>{t.syncSuccessful}</span>
          </div>
        )}
      </div>

      {/* 2. Chat phone UI */}
      <div 
        className={cn(
          "w-full max-w-[320px] mx-auto lg:max-w-[280px] lg:mx-0 lg:mt-6 card-tello border-white/10 bg-black/90 shadow-3xl hover:border-[hsl(var(--neon))/0.3] overflow-hidden transition-all duration-300"
        )}
      >
        {/* Phone header screen */}
        <div className="bg-white/[0.03] border-b border-white/5 px-4 py-3 flex items-center gap-2.5">
          <div className="relative">
            <div className="h-8 w-8 rounded-full bg-[hsl(var(--neon))/0.2] border border-[hsl(var(--neon))/0.4] flex items-center justify-center text-[hsl(var(--neon))] font-bold text-xs">
              AI
            </div>
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-black" />
          </div>
          <div>
            <h5 className="text-xs font-semibold text-white">{t.phoneHeader}</h5>
            <p className="text-3xs text-white/40">{t.phoneSub}</p>
          </div>
        </div>

        {/* Chat message bubbles */}
        <div className="p-3 space-y-3 min-h-[220px] flex flex-col justify-end">
          {/* Patient Message 1 */}
          <div className="max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-normal animate-fade-in bg-zinc-800 text-white self-end rounded-br-none">
            {t.patientMsg1}
          </div>

          {/* AI response typing state */}
          {step === 1 && (
            <div className="self-start text-3xs text-[hsl(var(--neon))]/70 px-2 flex items-center gap-1.5 animate-fade-in">
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon))] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon))] animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon))] animate-bounce" style={{ animationDelay: '300ms' }} />
              <span>{t.typing}</span>
            </div>
          )}

          {/* AI Response 1 */}
          {step >= 2 && (
            <div className="max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-normal bg-[hsl(var(--neon))/0.1] border border-[hsl(var(--neon))/0.25] text-white self-start rounded-bl-none animate-fade-in">
              {t.aiMsg1}
            </div>
          )}

          {/* Patient response bubble */}
          {step >= 3 && (
            <div className="max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-normal bg-zinc-800 text-white self-end rounded-br-none animate-fade-in">
              {t.patientMsg2}
            </div>
          )}

          {/* AI typing state 2 */}
          {step === 4 && (
            <div className="self-start text-3xs text-[hsl(var(--neon))]/70 px-2 flex items-center gap-1.5 animate-fade-in">
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon))] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon))] animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon))] animate-bounce" style={{ animationDelay: '300ms' }} />
              <span>{t.typing}</span>
            </div>
          )}

          {/* AI Response 2 */}
          {step >= 5 && (
            <div className="max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-normal bg-[hsl(var(--neon))/0.1] border border-[hsl(var(--neon))/0.25] text-white self-start rounded-bl-none animate-fade-in">
              {t.aiMsg2}
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
