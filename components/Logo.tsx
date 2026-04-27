import { useId } from "react";

const accent = "#6B8E63";

export function LogoIcon({ size = 40 }: { size?: number }) {
  const id = useId();
  const clipId = `logoClip-${id}`;

  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <clipPath id={clipId}>
          <rect width="120" height="120" rx="28" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width="120" height="120" fill="#111" />
        <rect y="58" width="120" height="62" fill={accent} />
        <text
          x="60"
          y="48"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
          fontSize="20"
          fill="#fff"
          letterSpacing="0.5"
        >
          отмен
        </text>
        <text
          x="60"
          y="92"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="800"
          fontSize="36"
          fill="#fff"
          letterSpacing="-1"
        >
          Yа
        </text>
      </g>
    </svg>
  );
}
