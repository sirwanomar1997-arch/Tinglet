import { useId } from "react";

import type { Bell, BellShape, Decoration, HandleKind } from "@/lib/bells";

const BODY: Record<BellShape, string> = {
  classic:
    "M120 74 C99 74 90 90 88 112 C85 146 76 194 48 222 L192 222 C164 194 155 146 152 112 C150 90 141 74 120 74 Z",
  slim: "M120 58 C110 58 106 74 105 92 C103 130 98 180 74 220 L166 220 C142 180 137 130 135 92 C134 74 130 58 120 58 Z",
  dome: "M120 88 C90 88 74 108 70 136 C66 170 58 202 40 222 L200 222 C182 202 174 170 170 136 C166 108 150 88 120 88 Z",
  tulip:
    "M120 78 C96 78 86 98 88 126 C90 154 78 186 52 222 L188 222 C162 186 150 154 152 126 C154 98 144 78 120 78 Z",
  faceted: "M120 76 L98 96 L92 140 L78 186 L52 222 L188 222 L162 186 L148 140 L142 96 Z",
  fluted:
    "M120 74 C99 74 90 90 88 112 C85 146 76 194 48 222 L192 222 C164 194 155 146 152 112 C150 90 141 74 120 74 Z",
  pagoda:
    "M120 74 C102 74 94 88 92 108 L88 138 L78 142 C74 176 64 202 46 222 L194 222 C176 202 166 176 162 142 L152 138 L148 108 C146 88 138 74 120 74 Z",
  teardrop:
    "M120 74 C92 74 78 104 80 136 C82 166 72 200 56 222 L184 222 C168 200 158 166 160 136 C162 104 148 74 120 74 Z",
  cathedral:
    "M120 62 C98 62 88 84 86 112 C83 152 72 196 42 224 L198 224 C168 196 157 152 154 112 C152 84 142 62 120 62 Z",
  lotus:
    "M120 78 C98 78 88 98 86 124 C83 156 74 194 50 218 C62 228 74 216 86 226 C98 216 110 228 120 218 C130 228 142 216 154 226 C166 216 178 228 190 218 C166 194 157 156 154 124 C152 98 142 78 120 78 Z",
};

/** Rim geometry per shape: [centerY, halfWidth]. */
const RIM: Record<BellShape, [number, number]> = {
  classic: [222, 72],
  slim: [220, 46],
  dome: [222, 80],
  tulip: [222, 68],
  faceted: [222, 68],
  fluted: [222, 72],
  pagoda: [222, 74],
  teardrop: [222, 64],
  cathedral: [224, 78],
  lotus: [219, 70],
};

function Handle({
  kind,
  accent,
  light,
  dark,
  topY,
}: {
  kind: HandleKind;
  accent: string;
  light: string;
  dark: string;
  topY: number;
}) {
  const stroke = dark;
  if (kind === "loop") {
    return (
      <g>
        <circle
          cx={120}
          cy={topY - 42}
          r={22}
          fill="none"
          stroke={accent}
          strokeWidth={10}
          strokeLinecap="round"
        />
        <path
          d={`M110 ${topY - 26} Q120 ${topY - 18} 130 ${topY - 26}`}
          stroke={light}
          strokeWidth={3}
          fill="none"
          opacity={0.7}
        />
        <rect
          x={110}
          y={topY - 22}
          width={20}
          height={14}
          rx={4}
          fill={accent}
          stroke={stroke}
          strokeOpacity={0.25}
        />
        <ellipse cx={120} cy={topY - 6} rx={17} ry={9} fill={accent} />
      </g>
    );
  }
  if (kind === "knob") {
    return (
      <g>
        <ellipse cx={120} cy={topY - 34} rx={13} ry={13} fill={accent} />
        <ellipse cx={116} cy={topY - 38} rx={4} ry={3} fill={light} opacity={0.8} />
        <path
          d={`M112 ${topY - 24} L128 ${topY - 24} L126 ${topY - 4} L114 ${topY - 4} Z`}
          fill={accent}
        />
        <ellipse cx={120} cy={topY - 4} rx={16} ry={8} fill={accent} />
      </g>
    );
  }
  if (kind === "stem") {
    return (
      <g>
        <ellipse cx={120} cy={topY - 50} rx={10} ry={10} fill={accent} />
        <path
          d={`M112 ${topY - 46} C108 ${topY - 32} 108 ${topY - 20} 110 ${topY - 6} L130 ${topY - 6} C132 ${topY - 20} 132 ${topY - 32} 128 ${topY - 46} Z`}
          fill={accent}
        />
        <path
          d={`M116 ${topY - 43} C113 ${topY - 30} 113 ${topY - 18} 115 ${topY - 8}`}
          stroke={light}
          strokeWidth={3}
          opacity={0.55}
          fill="none"
        />
        <ellipse cx={120} cy={topY - 4} rx={17} ry={8} fill={accent} />
      </g>
    );
  }
  return (
    <g>
      <path d={`M120 ${topY - 48} L131 ${topY - 22} L109 ${topY - 22} Z`} fill={accent} />
      <ellipse cx={120} cy={topY - 50} rx={7} ry={7} fill={accent} />
      <ellipse cx={120} cy={topY - 18} rx={14} ry={8} fill={accent} />
      <ellipse cx={120} cy={topY - 5} rx={18} ry={9} fill={accent} />
    </g>
  );
}

function Decor({
  kind,
  trim,
  accent,
  topY,
}: {
  kind: Decoration;
  trim: string;
  accent: string;
  topY: number;
}) {
  if (kind === "none") return null;
  if (kind === "ribbon") {
    return (
      <g>
        <path
          d={`M118 ${topY + 2} C96 ${topY - 20} 54 ${topY - 26} 58 ${topY + 2} C60 ${topY + 20} 96 ${topY + 14} 118 ${topY + 4} Z`}
          fill={trim}
        />
        <path
          d={`M122 ${topY + 2} C144 ${topY - 20} 186 ${topY - 26} 182 ${topY + 2} C180 ${topY + 20} 144 ${topY + 14} 122 ${topY + 4} Z`}
          fill={trim}
          opacity={0.92}
        />
        <path
          d={`M118 ${topY + 6} C110 ${topY + 30} 96 ${topY + 40} 86 ${topY + 48}`}
          stroke={trim}
          strokeWidth={7}
          fill="none"
          strokeLinecap="round"
        />
        <path
          d={`M124 ${topY + 6} C132 ${topY + 30} 148 ${topY + 38} 158 ${topY + 46}`}
          stroke={trim}
          strokeWidth={7}
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx={120} cy={topY + 3} rx={10} ry={9} fill={trim} />
        <ellipse cx={116} cy={topY} rx={3} ry={2} fill="#ffffff" opacity={0.5} />
      </g>
    );
  }
  if (kind === "holly") {
    return (
      <g>
        <path
          d={`M112 ${topY + 6} C96 ${topY - 8} 74 ${topY - 4} 62 ${topY + 8} C76 ${topY + 12} 72 ${topY + 24} 84 ${topY + 26} C96 ${topY + 26} 106 ${topY + 16} 112 ${topY + 6} Z`}
          fill="#2f6b41"
        />
        <path
          d={`M128 ${topY + 6} C144 ${topY - 10} 166 ${topY - 2} 176 ${topY + 12} C162 ${topY + 14} 166 ${topY + 26} 154 ${topY + 28} C142 ${topY + 26} 132 ${topY + 16} 128 ${topY + 6} Z`}
          fill="#38794a"
        />
        <circle cx={118} cy={topY + 10} r={6} fill="#b81f30" />
        <circle cx={128} cy={topY + 16} r={5} fill="#9e1b2f" />
        <circle cx={110} cy={topY + 18} r={4.5} fill="#c92d3d" />
      </g>
    );
  }
  if (kind === "flower") {
    const petals = [0, 72, 144, 216, 288];
    return (
      <g transform={`translate(78 ${topY + 26})`}>
        {petals.map((a) => (
          <ellipse
            key={a}
            cx={0}
            cy={-11}
            rx={8}
            ry={12}
            fill={trim}
            transform={`rotate(${a})`}
            opacity={0.95}
          />
        ))}
        <circle cx={0} cy={0} r={6} fill={accent} />
        <path d="M6 10 C18 16 26 26 30 38" stroke="#6d8f5e" strokeWidth={4} fill="none" />
        <ellipse cx={26} cy={26} rx={9} ry={5} fill="#7fa268" transform="rotate(25 26 26)" />
      </g>
    );
  }
  if (kind === "leaf") {
    return (
      <g transform={`translate(72 ${topY + 30})`}>
        <path
          d="M0 0 C18 -20 44 -22 52 -6 C40 2 44 18 28 24 C12 26 2 14 0 0 Z"
          fill="#c96a1f"
        />
        <path d="M4 2 C18 -6 34 -8 48 -6" stroke="#8b4413" strokeWidth={3} fill="none" />
        <path
          d="M56 22 C70 10 88 8 96 18 C86 26 84 40 70 40 C60 38 56 30 56 22 Z"
          fill="#e0983b"
          opacity={0.9}
        />
      </g>
    );
  }
  if (kind === "web") {
    return (
      <g stroke="#d8d2e6" strokeWidth={1.6} fill="none" opacity={0.55}>
        <path d={`M62 ${topY + 12} L120 ${topY + 30} L178 ${topY + 12}`} />
        <path d={`M120 ${topY + 30} L120 ${topY + 92}`} />
        <path d={`M120 ${topY + 30} L70 ${topY + 70}`} />
        <path d={`M120 ${topY + 30} L170 ${topY + 70}`} />
        <path d={`M88 ${topY + 34} Q120 ${topY + 52} 152 ${topY + 34}`} />
        <path d={`M78 ${topY + 50} Q120 ${topY + 76} 162 ${topY + 50}`} />
      </g>
    );
  }
  // crown
  return (
    <g>
      <path
        d={`M78 ${topY + 34} L92 ${topY + 18} L106 ${topY + 34} L120 ${topY + 14} L134 ${topY + 34} L148 ${topY + 18} L162 ${topY + 34} Z`}
        fill={accent}
        opacity={0.9}
      />
      <circle cx={92} cy={topY + 16} r={4} fill="#ffffff" opacity={0.8} />
      <circle cx={120} cy={topY + 11} r={4.5} fill="#ffffff" opacity={0.9} />
      <circle cx={148} cy={topY + 16} r={4} fill="#ffffff" opacity={0.8} />
    </g>
  );
}

export function BellArt({
  bell,
  className,
  clapperOffset = 0,
}: {
  bell: Bell;
  className?: string;
  /** Horizontal clapper shift in viewBox units. */
  clapperOffset?: number;
}) {
  const uid = useId().replace(/:/g, "");
  const body = `body-${uid}`;
  const sheen = `sheen-${uid}`;
  const mouth = `mouth-${uid}`;
  const clip = `clip-${uid}`;
  const { finish, shape } = bell;
  const [rimY, rimHalf] = RIM[shape];
  const path = BODY[shape];
  const topY = shape === "cathedral" ? 62 : shape === "slim" ? 58 : shape === "dome" ? 88 : 74;

  return (
    <svg
      viewBox="0 0 240 300"
      className={className}
      role="img"
      aria-label={bell.name.en}
      overflow="visible"
    >
      <defs>
        <linearGradient id={body} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={finish.stops[2]} />
          <stop offset="14%" stopColor={finish.stops[1]} />
          <stop offset="34%" stopColor={finish.stops[0]} />
          <stop offset="52%" stopColor={finish.stops[1]} />
          <stop offset="78%" stopColor={finish.stops[2]} />
          <stop offset="100%" stopColor={finish.stops[3]} />
        </linearGradient>
        <radialGradient id={sheen} cx="0.34" cy="0.22" r="0.5">
          <stop offset="0%" stopColor={finish.highlight} stopOpacity="0.85" />
          <stop offset="100%" stopColor={finish.highlight} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={mouth} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={finish.shadow} stopOpacity="0.95" />
          <stop offset="100%" stopColor={finish.shadow} stopOpacity="0.55" />
        </linearGradient>
        <clipPath id={clip}>
          <path d={path} />
        </clipPath>
      </defs>

      {/* soft contact shadow */}
      <ellipse cx={120} cy={rimY + 46} rx={rimHalf + 14} ry={12} fill="#000" opacity={0.18} />

      <Handle
        kind={bell.handle}
        accent={finish.accent}
        light={finish.highlight}
        dark={finish.stops[3]}
        topY={topY}
      />

      {/* clapper */}
      <g transform={`translate(${clapperOffset} 0)`}>
        <path
          d={`M120 ${rimY - 6} L120 ${rimY + 20}`}
          stroke={finish.stops[3]}
          strokeWidth={3}
          opacity={0.6}
        />
        <circle cx={120} cy={rimY + 26} r={11} fill={finish.accent} />
        <circle cx={116} cy={rimY + 22} r={3.5} fill={finish.highlight} opacity={0.8} />
      </g>

      {/* body */}
      <path d={path} fill={`url(#${body})`} />

      <g clipPath={`url(#${clip})`}>
        <ellipse cx={92} cy={topY + 56} rx={44} ry={70} fill={`url(#${sheen})`} />
        <path
          d={`M150 ${topY} C158 ${topY + 60} 168 ${topY + 110} 186 ${rimY}`}
          stroke={finish.stops[3]}
          strokeWidth={14}
          opacity={0.28}
          fill="none"
        />
        {shape === "fluted" && (
          <g stroke={finish.stops[3]} strokeOpacity={0.3} strokeWidth={2.5} fill="none">
            {[-48, -32, -16, 0, 16, 32, 48].map((dx) => (
              <path
                key={dx}
                d={`M${120 + dx * 0.45} ${topY + 18} C${120 + dx * 0.7} ${topY + 80} ${120 + dx} ${rimY - 30} ${120 + dx * 1.1} ${rimY}`}
              />
            ))}
          </g>
        )}
        {bell.band && (
          <>
            <rect
              x={0}
              y={rimY - 26}
              width={240}
              height={5}
              fill={finish.accent}
              opacity={0.85}
            />
            <rect
              x={0}
              y={rimY - 15}
              width={240}
              height={3}
              fill={finish.accent}
              opacity={0.6}
            />
          </>
        )}
        <Decor kind={bell.decoration} trim={finish.trim} accent={finish.accent} topY={topY} />
      </g>

      {/* rim + mouth */}
      <ellipse
        cx={120}
        cy={rimY}
        rx={rimHalf}
        ry={13}
        fill={`url(#${mouth})`}
        stroke={finish.stops[1]}
        strokeWidth={3}
      />
      <ellipse
        cx={120}
        cy={rimY - 2}
        rx={rimHalf - 3}
        ry={10}
        fill={finish.shadow}
        opacity={0.75}
      />
      <path
        d={`M${120 - rimHalf} ${rimY} A ${rimHalf} 13 0 0 0 ${120 + rimHalf} ${rimY}`}
        fill="none"
        stroke={finish.stops[0]}
        strokeWidth={3}
        opacity={0.7}
      />
    </svg>
  );
}
