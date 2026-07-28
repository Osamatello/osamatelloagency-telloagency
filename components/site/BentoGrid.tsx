'use client';

import React, { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { cn } from '@/lib/utils';
import { Bot, Calendar, Database, Search, Gauge, Check, ArrowRight, ArrowLeft, MessageSquare, PhoneCall, Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function BentoGrid() {
  const { dir, dict } = useI18n();
  const isRtl = dir === 'rtl';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  // State for metrics card animation
  const [hoursSaved, setHoursSaved] = useState(0);
  const [noShowRate, setNoShowRate] = useState(25);
  const [activeLeadIndex, setActiveLeadIndex] = useState(0);

  // Counters animation
  useEffect(() => {
    const interval = setInterval(() => {
      setHoursSaved((prev) => {
        if (prev >= 18) return 18;
        return prev + 1;
      });
      setNoShowRate((prev) => {
        if (prev <= 3.2) return 3.2;
        return parseFloat((prev - 0.9).toFixed(1));
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Lead finder scraper simulation
  const leads = [
    { name: 'Dr. Sarah Wilson', type: 'Dentist', status: 'Enriched', email: 's.wilson@dentalcare.com' },
    { name: 'Dr. Robert Chen', type: 'Orthodontist', status: 'Added to CRM', email: 'r.chen@orthosmile.org' },
    { name: 'Dr. Maria Lopez', type: 'Pediatric Clinic', status: 'Searching...', email: 'm.lopez@kidssmiles.net' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLeadIndex((prev) => (prev + 1) % leads.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Text Translations
  const t = {
    en: {
      card1Title: '24/7 AI Receptionist & Messaging',
      card1Desc: 'Automate patient inquiries on WhatsApp, SMS, and web. AI captures lead info and books appointments while your staff is busy or sleeping.',
      card1Feature1: 'Zero missed patient calls',
      card1Feature2: 'WhatsApp booking follow-ups',
      whatsappHeader: 'TELLO AI Assistant',
      whatsappStatus: 'Online',
      whatsappMsg1: 'I want to schedule an consultation for teeth whitening.',
      whatsappMsg2: 'Sure Sarah! We have slots open at 10 AM and 2 PM tomorrow. Which works?',
      whatsappMsg3: '10 AM works best. Thanks!',
      whatsappMsg4: 'Great! Teeth whitening booked for 10:00 AM tomorrow. Confirmation SMS sent.',
      
      card2Title: 'Smart Scheduler',
      card2Desc: 'Empower patients to book, reschedule, or cancel slots via SMS without manual coordination.',
      card2Feature1: 'Calendar two-way sync',
      card2Feature2: 'Automated SMS reminders',
      calendarTitle: 'Available Times',
      calendarDay: 'Tomorrow',
      
      card3Title: 'AI Lead Finder & CRM Sync',
      card3Desc: 'We scrape and enrich highly qualified regional healthcare decision makers and drop them straight to your CRM.',
      card3Feature1: 'Verified emails & numbers',
      card3Feature2: 'HubSpot & Salesforce sync',
      scraperTitle: 'AI Scraper Active',
      target: 'Target',
      status: 'Status',
      
      card4Title: 'Clinical Outcomes & Dashboard',
      card4Desc: 'Watch your clinic’s efficiency grow. Real-time dashboards keep track of time saved, appointment booking growth, and no-show reductions.',
      metric1Title: 'Staff Hours Saved',
      metric1Unit: 'hrs/week',
      metric2Title: 'No-Show Rate Drop',
      metric2Unit: 'from 25%',
      progressLabel: 'Clinic Capacity Optimization',
    },
    ar: {
      card1Title: 'موظف استقبال ذكي 24/7',
      card1Desc: 'أتمتة استفسارات المرضى عبر الواتساب والرسائل القصيرة والموقع. يسجل المساعد الذكي بيانات المرضى ويحجز المواعيد على مدار الساعة.',
      card1Feature1: 'عدم تفويت أي مكالمة مريض',
      card1Feature2: 'متابعة تلقائية عبر الواتساب',
      whatsappHeader: 'مساعد TELLO الذكي',
      whatsappStatus: 'نشط الآن',
      whatsappMsg1: 'أريد حجز موعد استشارة لتبييض الأسنان غداً.',
      whatsappMsg2: 'بالتأكيد سارة! لدينا موعد متاح الساعة 10 صباحاً و 2 ظهراً. أيهما تفضلين؟',
      whatsappMsg3: 'الساعة 10 صباحاً ممتازة. شكراً!',
      whatsappMsg4: 'رائع! تم حجز موعد تبييض الأسنان غداً الساعة 10:00 صباحاً. تم إرسال رسالة التأكيد.',
      
      card2Title: 'جدولة مواعيد ذكية',
      card2Desc: 'توفير حجز وإلغاء وتعديل المواعيد للمرضى بأنفسهم عبر الرسائل دون تدخل بشري.',
      card2Feature1: 'مزامنة ثنائية للتقويم',
      card2Feature2: 'تذكير تلقائي بالمواعيد',
      calendarTitle: 'الأوقات المتاحة',
      calendarDay: 'الغد',
      
      card3Title: 'منقب العملاء الذكي وCRM',
      card3Desc: 'أدوات بحث ذكية لجمع بيانات العيادات والأطباء المستهدفين وإضافتهم تلقائياً لنظام إدارة عملائك.',
      card3Feature1: 'إيميلات وهواتف موثقة',
      card3Feature2: 'ربط مباشر مع HubSpot',
      scraperTitle: 'منقب البيانات نشط',
      target: 'الهدف',
      status: 'الحالة',
      
      card4Title: 'لوحة التحكم والنتائج الفورية',
      card4Desc: 'متابعة نمو كفاءة عيادتك. لوحات قياس فورية لمراقبة الساعات الموفرة، نمو الحجوزات، وتقليل نسب الغياب.',
      metric1Title: 'ساعات العمل الموفرة',
      metric1Unit: 'ساعة/أسبوع',
      metric2Title: 'هبوط نسبة عدم الحضور',
      metric2Unit: 'من 25%',
      progressLabel: 'تحسين الطاقة الاستيعابية للعيادة',
    },
  }[isRtl ? 'ar' : 'en'];

  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-6 gap-6">
      
      {/* CARD 1: 24/7 AI Receptionist & Messaging (col-span 4) */}
      <div className="md:col-span-4 card-tello border-white/5 bg-slate-950/40 p-6 sm:p-8 flex flex-col justify-between hover:border-[hsl(var(--neon))/0.2] transition-all duration-300 relative group overflow-hidden">
        {/* Ambient lighting */}
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[hsl(var(--neon))/0.03] blur-3xl" />
        
        <div className="grid gap-6 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[hsl(var(--neon))/0.2] bg-[hsl(var(--neon))/0.08] text-[hsl(var(--neon))]">
              <Bot className="h-5 w-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{t.card1Title}</h3>
            <p className="text-sm leading-relaxed text-white/60">{t.card1Desc}</p>
            <ul className="space-y-2.5 pt-2">
              <li className="flex items-center gap-2.5 text-xs text-white/80">
                <CheckCircle2 className="h-4 w-4 text-[hsl(var(--neon))]" />
                <span>{t.card1Feature1}</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-white/80">
                <CheckCircle2 className="h-4 w-4 text-[hsl(var(--neon))]" />
                <span>{t.card1Feature2}</span>
              </li>
            </ul>
          </div>

          {/* Interactive WhatsApp chat mockup */}
          <div className="lg:col-span-5 w-full bg-black/80 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="bg-white/[0.03] border-b border-white/5 px-3 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="h-7 w-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold text-[10px]">
                    WA
                  </div>
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-400 border border-black" />
                </div>
                <div>
                  <h5 className="text-[10px] font-semibold text-white leading-none">{t.whatsappHeader}</h5>
                  <p className="text-[8px] text-white/40 mt-0.5 leading-none">{t.whatsappStatus}</p>
                </div>
              </div>
              <MessageSquare className="h-3.5 w-3.5 text-white/30" />
            </div>

            <div className="p-3 space-y-2 text-[10px] min-h-[140px] flex flex-col justify-end">
              <div className="max-w-[80%] rounded-lg p-2 bg-zinc-800 text-white self-end rounded-br-none">
                {t.whatsappMsg1}
              </div>
              <div className="max-w-[80%] rounded-lg p-2 bg-emerald-950/40 border border-emerald-500/20 text-white self-start rounded-bl-none">
                {t.whatsappMsg2}
              </div>
              <div className="max-w-[80%] rounded-lg p-2 bg-zinc-800 text-white self-end rounded-br-none">
                {t.whatsappMsg3}
              </div>
              <div className="max-w-[80%] rounded-lg p-2 bg-emerald-950/40 border border-emerald-500/20 text-white self-start rounded-bl-none">
                {t.whatsappMsg4}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CARD 2: Smart Appointment Scheduler (col-span 2) */}
      <div className="md:col-span-2 card-tello border-white/5 bg-slate-950/40 p-6 flex flex-col justify-between hover:border-[hsl(var(--neon))/0.2] transition-all duration-300 relative group overflow-hidden">
        <div className="space-y-4">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[hsl(var(--neon))/0.2] bg-[hsl(var(--neon))/0.08] text-[hsl(var(--neon))]">
            <Calendar className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">{t.card2Title}</h3>
          <p className="text-xs leading-relaxed text-white/60">{t.card2Desc}</p>
        </div>

        {/* Small mini calendar component */}
        <div className="mt-6 border border-white/10 rounded-xl bg-black/60 p-3">
          <div className="flex items-center justify-between text-2xs text-white/40 pb-2 border-b border-white/5">
            <span>{t.calendarTitle}</span>
            <span>{t.calendarDay}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button className="p-2 text-3xs rounded bg-white/[0.02] border border-white/5 text-white/60 hover:border-[hsl(var(--neon))] transition-colors">
              10:00 AM
            </button>
            <button className="p-2 text-3xs rounded bg-white/[0.02] border border-white/5 text-white/60 hover:border-[hsl(var(--neon))] transition-colors">
              11:30 AM
            </button>
            <button className="p-2 text-3xs rounded bg-[hsl(var(--neon))/0.1] border border-[hsl(var(--neon))/0.4] text-[hsl(var(--neon))] font-semibold">
              02:00 PM
            </button>
            <button className="p-2 text-3xs rounded bg-white/[0.02] border border-white/5 text-white/60 hover:border-[hsl(var(--neon))] transition-colors">
              04:30 PM
            </button>
          </div>
        </div>
      </div>

      {/* CARD 3: AI Lead Finder (col-span 2) */}
      <div className="md:col-span-2 card-tello border-white/5 bg-slate-950/40 p-6 flex flex-col justify-between hover:border-[hsl(var(--neon))/0.2] transition-all duration-300 relative group overflow-hidden">
        <div className="space-y-4">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[hsl(var(--neon))/0.2] bg-[hsl(var(--neon))/0.08] text-[hsl(var(--neon))]">
            <Search className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">{t.card3Title}</h3>
          <p className="text-xs leading-relaxed text-white/60">{t.card3Desc}</p>
        </div>

        {/* Lead find scraper visual mockup */}
        <div className="mt-6 border border-white/10 rounded-xl bg-black/60 overflow-hidden">
          <div className="bg-white/[0.02] px-3 py-2 flex items-center justify-between border-b border-white/5">
            <span className="text-3xs text-[hsl(var(--neon))] font-semibold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon))] animate-pulse" />
              {t.scraperTitle}
            </span>
          </div>
          <div className="p-2 space-y-1.5">
            {leads.map((lead, i) => (
              <div 
                key={lead.name}
                className={cn(
                  "p-2 rounded flex items-center justify-between text-4xs transition-all duration-500",
                  activeLeadIndex === i 
                    ? "bg-[hsl(var(--neon))/0.06] border border-[hsl(var(--neon))/0.2] text-white" 
                    : "bg-white/[0.01] border border-transparent text-white/40"
                )}
              >
                <div>
                  <p className="font-semibold">{lead.name}</p>
                  <p className="text-5xs text-white/30">{lead.type}</p>
                </div>
                <span className={cn(
                  "px-1.5 py-0.5 rounded-full text-5xs font-medium border",
                  lead.status === 'Added to CRM' 
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    : lead.status === 'Enriched'
                    ? "bg-[hsl(var(--neon))/0.1] border-[hsl(var(--neon))/0.2] text-[hsl(var(--neon))]"
                    : "bg-zinc-500/10 border-zinc-500/20 text-zinc-400"
                )}>
                  {lead.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CARD 4: Clinical Outcomes & Dashboard (col-span 4) */}
      <div className="md:col-span-4 card-tello border-white/5 bg-slate-950/40 p-6 sm:p-8 flex flex-col justify-between hover:border-[hsl(var(--neon))/0.2] transition-all duration-300 relative group overflow-hidden">
        <div className="absolute left-0 bottom-0 h-40 w-40 rounded-full bg-[hsl(var(--neon))/0.02] blur-3xl" />
        
        <div className="grid gap-6 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[hsl(var(--neon))/0.2] bg-[hsl(var(--neon))/0.08] text-[hsl(var(--neon))]">
              <Gauge className="h-5 w-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{t.card4Title}</h3>
            <p className="text-sm leading-relaxed text-white/60">{t.card4Desc}</p>
          </div>

          {/* Interactive statistics widget */}
          <div className="lg:col-span-5 w-full border border-white/10 rounded-2xl bg-black/60 p-4 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-white/5">
              <TrendingUp className="h-4 w-4 text-[hsl(var(--neon))]" />
              <span className="text-3xs font-semibold text-white uppercase tracking-wider">{t.progressLabel}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-4xs text-white/40 uppercase font-medium">{t.metric1Title}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-[hsl(var(--neon))] tabular-nums">+{hoursSaved}</span>
                  <span className="text-5xs text-white/45">{t.metric1Unit}</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-4xs text-white/40 uppercase font-medium">{t.metric2Title}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-red-400 tabular-nums">{noShowRate}%</span>
                  <span className="text-5xs text-white/45">{t.metric2Unit}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-5xs text-white/50">
                <span>Optimization Score</span>
                <span>94%</span>
              </div>
              <Progress value={94} className="h-1 bg-white/10" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
