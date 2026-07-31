type Sparkle = {
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
  color: 'green' | 'white';
};

const sparkles: Sparkle[] = [
  { left: '3%', top: '6%', size: 3, delay: '0s', duration: '6s', color: 'green' },
  { left: '7%', top: '18%', size: 2, delay: '1.1s', duration: '8s', color: 'white' },
  { left: '11%', top: '32%', size: 3, delay: '2.2s', duration: '7s', color: 'green' },
  { left: '15%', top: '48%', size: 2, delay: '0.7s', duration: '9s', color: 'white' },
  { left: '19%', top: '64%', size: 3, delay: '2.9s', duration: '6.6s', color: 'green' },
  { left: '23%', top: '82%', size: 2, delay: '1.8s', duration: '8.5s', color: 'white' },

  { left: '28%', top: '10%', size: 2, delay: '2.5s', duration: '7.4s', color: 'white' },
  { left: '32%', top: '24%', size: 3, delay: '0.5s', duration: '9.2s', color: 'green' },
  { left: '36%', top: '39%', size: 2, delay: '3.2s', duration: '6.8s', color: 'white' },
  { left: '40%', top: '55%', size: 3, delay: '1.4s', duration: '8.1s', color: 'green' },
  { left: '44%', top: '72%', size: 2, delay: '2.7s', duration: '7.1s', color: 'white' },
  { left: '48%', top: '90%', size: 3, delay: '0.9s', duration: '9.4s', color: 'green' },

  { left: '53%', top: '8%', size: 3, delay: '1.9s', duration: '7.8s', color: 'green' },
  { left: '57%', top: '21%', size: 2, delay: '3.4s', duration: '6.5s', color: 'white' },
  { left: '61%', top: '36%', size: 3, delay: '0.4s', duration: '8.9s', color: 'green' },
  { left: '65%', top: '51%', size: 2, delay: '2.3s', duration: '7.3s', color: 'white' },
  { left: '69%', top: '68%', size: 3, delay: '1.2s', duration: '9.1s', color: 'green' },
  { left: '73%', top: '85%', size: 2, delay: '2.8s', duration: '6.9s', color: 'white' },

  { left: '78%', top: '12%', size: 2, delay: '0.8s', duration: '8.3s', color: 'white' },
  { left: '82%', top: '27%', size: 3, delay: '2.6s', duration: '7.2s', color: 'green' },
  { left: '86%', top: '43%', size: 2, delay: '1.6s', duration: '9.3s', color: 'white' },
  { left: '90%', top: '59%', size: 3, delay: '3.1s', duration: '6.7s', color: 'green' },
  { left: '94%', top: '74%', size: 2, delay: '0.3s', duration: '8.7s', color: 'white' },
  { left: '97%', top: '91%', size: 3, delay: '2.1s', duration: '7.6s', color: 'green' },

  { left: '6%', top: '92%', size: 2, delay: '1.5s', duration: '8.8s', color: 'white' },
  { left: '14%', top: '4%', size: 2, delay: '2.4s', duration: '7.5s', color: 'white' },
  { left: '22%', top: '58%', size: 2, delay: '0.6s', duration: '9.6s', color: 'green' },
  { left: '31%', top: '78%', size: 2, delay: '3.3s', duration: '6.4s', color: 'white' },
  { left: '39%', top: '16%', size: 2, delay: '1.7s', duration: '8.6s', color: 'green' },
  { left: '47%', top: '44%', size: 2, delay: '2.9s', duration: '7.9s', color: 'white' },
  { left: '56%', top: '63%', size: 2, delay: '0.2s', duration: '9.7s', color: 'green' },
  { left: '64%', top: '95%', size: 2, delay: '2s', duration: '7s', color: 'white' },
  { left: '72%', top: '34%', size: 2, delay: '1.3s', duration: '8.4s', color: 'green' },
  { left: '81%', top: '66%', size: 2, delay: '3.5s', duration: '6.6s', color: 'white' },
  { left: '89%', top: '7%', size: 2, delay: '0.7s', duration: '9s', color: 'green' },
];

export default function GlobalSparklesBackground() {
  return (
    <div
      aria-hidden="true"
      className="global-sparkles pointer-events-none fixed inset-0 z-20 overflow-hidden"
    >
      <div className="global-sparkles__glow" />

      {sparkles.map((sparkle, index) => (
        <span
          key={`${sparkle.left}-${sparkle.top}-${index}`}
          className={`global-sparkle global-sparkle--${sparkle.color} ${
            index > 23 ? 'global-sparkle--desktop-only' : ''
          }`}
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animationDelay: sparkle.delay,
            animationDuration: sparkle.duration,
          }}
        />
      ))}
    </div>
  );
}