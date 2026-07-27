'use client';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import type { FaqItem } from '@/lib/i18n/dictionary';

export function FAQAccordion({
  items,
  className,
}: {
  items: FaqItem[];
  className?: string;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      className={cn('w-full', className)}
    >
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className="border-white/10"
        >
          <AccordionTrigger className="py-5 text-left text-base font-semibold text-white transition-colors hover:text-[hsl(var(--neon))] hover:no-underline">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-white/60">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
