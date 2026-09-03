import { cn } from '@/lib/utils';

export function PipelineTracks({
  paths,
  className,
  viewBox = '0 0 100 100',
}: {
  paths: string[];
  className?: string;
  viewBox?: string;
}) {
  return (
    <svg
      className={cn('pipeline-tracks', className)}
      viewBox={viewBox}
      preserveAspectRatio="none"
      fill="none"
    >
      <g
        stroke="hsl(var(--brand) / 0.09)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      >
        {paths.map((path) => <path key={path} d={path} />)}
      </g>
      <g
        className="flow-line"
        stroke="hsl(var(--brand) / 0.34)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      >
        {paths.map((path) => <path key={path} d={path} />)}
      </g>
    </svg>
  );
}
