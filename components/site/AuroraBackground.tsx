'use client';

export function AuroraBackground({ className = '' }: { className?: string }) {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="animate-aurora absolute -left-1/4 top-0 h-[500px] w-[700px] rounded-full bg-[hsl(var(--neon)/0.08)] blur-[120px]"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="animate-aurora absolute -right-1/4 top-1/4 h-[400px] w-[600px] rounded-full bg-[hsl(var(--neon)/0.06)] blur-[100px]"
        style={{ animationDelay: '6s' }}
      />
      <div
        className="animate-aurora absolute left-1/3 bottom-0 h-[350px] w-[500px] rounded-full bg-[hsl(160_60%_45%/0.05)] blur-[90px]"
        style={{ animationDelay: '12s' }}
      />
    </div>
  );
}
