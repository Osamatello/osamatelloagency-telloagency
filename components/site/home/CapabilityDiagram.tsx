'use client';

/**
 * A compact technical schematic per capability — the architecture that
 * capability actually produces, not an icon of it. Drawn at a scale that holds
 * its own next to the heading: hairline structure in ink, the load-bearing path
 * in emerald, so the diagram reads before the summary underneath does.
 *
 * Static SVG on the design tokens. No animation, no dependency, no runtime cost.
 */

const L = 'hsl(var(--ds-ink) / 0.62)';
const LD = 'hsl(var(--ds-ink) / 0.42)';
const B = 'hsl(var(--brand))';
const FILL = 'hsl(var(--brand) / 0.22)';

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 200 104"
      aria-hidden="true"
      className="h-auto w-full max-w-[8.25rem]"
      fill="none"
      strokeWidth="1.25"
      strokeLinecap="square"
    >
      {children}
    </svg>
  );
}

/** 01 — services hung off one governed backbone. */
const Infrastructure = () => (
  <Frame>
    <line x1="10" y1="52" x2="190" y2="52" stroke={B} strokeWidth="2.5" />
    {[38, 78, 118, 158].map((x, i) => (
      <g key={x}>
        <line x1={x} y1="52" x2={x} y2={i % 2 ? 76 : 28} stroke={L} />
        <rect x={x - 15} y={i % 2 ? 76 : 8} width="30" height="20" stroke={L} />
        <line x1={x - 9} y1={i % 2 ? 84 : 16} x2={x + 5} y2={i % 2 ? 84 : 16} stroke={LD} />
        <circle cx={x} cy="52" r="3.5" fill={B} />
      </g>
    ))}
    <rect x="4" y="45" width="12" height="14" fill={FILL} stroke={B} />
  </Frame>
);

/** 02 — intake, qualification, then handled or escalated. */
const CustomerOps = () => (
  <Frame>
    <rect x="4" y="38" width="34" height="28" stroke={L} />
    <line x1="11" y1="47" x2="31" y2="47" stroke={LD} />
    <line x1="11" y1="54" x2="26" y2="54" stroke={LD} />
    <line x1="38" y1="52" x2="66" y2="52" stroke={B} strokeWidth="2" />
    <path d="M84 34 L102 52 L84 70 L66 52 Z" fill={FILL} stroke={B} strokeWidth="1.5" />
    <path d="M102 52 C 126 52, 130 20, 154 20" stroke={B} strokeWidth="2" />
    <path d="M102 52 C 126 52, 130 84, 154 84" stroke={L} strokeDasharray="4 4" />
    <rect x="154" y="8" width="42" height="24" fill={FILL} stroke={B} />
    <line x1="162" y1="20" x2="188" y2="20" stroke={B} />
    <rect x="154" y="72" width="42" height="24" stroke={L} />
    <line x1="162" y1="84" x2="180" y2="84" stroke={LD} />
  </Frame>
);

/** 03 — a lead pipeline with routing, recovery and follow-up. */
const Revenue = () => (
  <Frame>
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={8 + i * 46} y="30" width="36" height="26" stroke={i === 3 ? B : L} fill={i === 3 ? FILL : 'none'} />
    ))}
    {[0, 1, 2].map((i) => (
      <path key={i} d={`M${44 + i * 46} 43 H${54 + i * 46}`} stroke={B} strokeWidth="2" />
    ))}
    <line x1="16" y1="38" x2="36" y2="38" stroke={LD} />
    <line x1="62" y1="38" x2="78" y2="38" stroke={LD} />
    <line x1="108" y1="38" x2="128" y2="38" stroke={LD} />
    {/* recovery: what stalls is routed back in */}
    <path d="M118 56 C 118 88, 60 92, 26 74" stroke={L} strokeDasharray="4 4" />
    <path d="M32 70 L26 74 L28 68" stroke={L} />
    <text x="8" y="20" fill="hsl(var(--ds-ink) / 0.66)" fontSize="9" letterSpacing="1.4">IN</text>
    <text x="168" y="20" fill={B} fontSize="9" letterSpacing="1.4">WON</text>
  </Frame>
);

/** 04 — separate sources resolving into one operational view. */
const Intelligence = () => (
  <Frame>
    {[12, 44, 76].map((y, i) => (
      <g key={y}>
        <rect x="4" y={y - 10} width="30" height="20" stroke={L} />
        <line x1="10" y1={y} x2={24 - i * 4} y2={y} stroke={LD} />
        <path d={`M34 ${y} C 56 ${y}, 58 52, 76 52`} stroke={L} />
      </g>
    ))}
    <circle cx="82" cy="52" r="4" fill={B} />
    <line x1="86" y1="52" x2="102" y2="52" stroke={B} strokeWidth="2" />
    <rect x="102" y="10" width="94" height="84" stroke={B} fill={FILL} />
    <line x1="102" y1="28" x2="196" y2="28" stroke={B} />
    <line x1="112" y1="19" x2="140" y2="19" stroke={B} />
    {[44, 58, 72, 86].map((y, i) => (
      <line key={y} x1="112" y1={y} x2={112 + [70, 46, 62, 34][i]} y2={y} stroke={i === 0 ? B : LD} />
    ))}
  </Frame>
);

/** 05 — parallel workflows synchronised through one coordinator. */
const Orchestration = () => (
  <Frame>
    {[16, 52, 88].map((y, i) => (
      <g key={y}>
        <rect x="4" y={y - 11} width="26" height="22" stroke={L} />
        <line x1="30" y1={y} x2="62" y2={y} stroke={L} strokeDasharray={i === 1 ? '0' : '4 4'} />
        <circle cx="30" cy={y} r="2.5" fill={LD} />
      </g>
    ))}
    <path d="M62 16 C 76 16, 76 52, 86 52" stroke={L} />
    <line x1="62" y1="52" x2="86" y2="52" stroke={L} />
    <path d="M62 88 C 76 88, 76 52, 86 52" stroke={L} />
    <rect x="86" y="34" width="36" height="36" fill={FILL} stroke={B} strokeWidth="1.5" />
    <line x1="94" y1="46" x2="114" y2="46" stroke={B} />
    <line x1="94" y1="58" x2="106" y2="58" stroke={B} />
    <line x1="122" y1="52" x2="160" y2="52" stroke={B} strokeWidth="2.5" />
    {[24, 52, 80].map((y) => (
      <g key={y}>
        <path d={`M160 52 C 172 52, 172 ${y}, 182 ${y}`} stroke={B} />
        <rect x="182" y={y - 7} width="14" height="14" stroke={B} />
      </g>
    ))}
  </Frame>
);

/** 06 — two systems that stay in place, joined by a bridge. */
const Integration = () => (
  <Frame>
    <rect x="4" y="16" width="52" height="72" stroke={L} strokeDasharray="5 4" />
    <rect x="144" y="16" width="52" height="72" stroke={L} strokeDasharray="5 4" />
    {[30, 52, 74].map((y) => (
      <g key={y}>
        <rect x="14" y={y - 8} width="32" height="16" stroke={LD} />
        <rect x="154" y={y - 8} width="32" height="16" stroke={LD} />
      </g>
    ))}
    <rect x="70" y="36" width="60" height="32" fill={FILL} stroke={B} strokeWidth="1.5" />
    <line x1="80" y1="46" x2="120" y2="46" stroke={B} />
    <line x1="80" y1="56" x2="108" y2="56" stroke={B} />
    <path d="M46 30 C 60 30, 58 46, 70 46" stroke={B} />
    <path d="M46 74 C 60 74, 58 58, 70 58" stroke={B} />
    <path d="M130 46 C 142 46, 140 30, 154 30" stroke={B} />
    <path d="M130 58 C 142 58, 140 74, 154 74" stroke={B} />
  </Frame>
);

const DIAGRAMS = [Infrastructure, CustomerOps, Revenue, Intelligence, Orchestration, Integration];

export function CapabilityDiagram({ index }: { index: number }) {
  const Diagram = DIAGRAMS[index % DIAGRAMS.length];
  return <Diagram />;
}
