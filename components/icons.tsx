type IconProps = { className?: string };

/* Header / chart arrows */
export function ArrowLeftIcon({ className, color = "#30325B" }: IconProps & { color?: string }) {
  return (
    <svg className={className} viewBox="0 0 30 30" fill="none">
      <path
        d="M25 15H5.5m0 0 6.2-6.2M5.5 15l6.2 6.2"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon({ className, color = "#30325B" }: IconProps & { color?: string }) {
  return (
    <svg className={className} viewBox="0 0 30 30" fill="none">
      <path
        d="M5 15h19.5m0 0-6.2-6.2M24.5 15l-6.2 6.2"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Next match ":" divider */
export function DivideIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 35 35" fill="none">
      <circle cx="17.5" cy="11" r="3.4" fill="#1757FF" />
      <circle cx="17.5" cy="24" r="3.4" fill="#1757FF" />
    </svg>
  );
}

/* Small calendar next to the date */
export function CalendarIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 15 15" fill="none">
      <rect x="1.4" y="2.4" width="12.2" height="11.2" rx="2.4" stroke="#AEB4D6" strokeWidth="1.2" />
      <path d="M1.6 6h11.8" stroke="#AEB4D6" strokeWidth="1.2" />
      <path d="M4.8 1v2.6M10.2 1v2.6" stroke="#AEB4D6" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/* Indonesia flag */
export function FlagIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <g>
        <rect x="2" y="4.5" width="20" height="15" rx="3.5" fill="#fff" />
        <path d="M2 8a3.5 3.5 0 0 1 3.5-3.5h13A3.5 3.5 0 0 1 22 8v4H2V8Z" fill="#E22B36" />
        <rect x="2.5" y="5" width="19" height="14" rx="3" stroke="rgba(255,255,255,0.7)" />
      </g>
    </svg>
  );
}

/* Latest scores: person */
export function PersonIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="6.4" r="3.2" stroke="#FA7DA3" strokeWidth="1.5" />
      <path
        d="M3.8 17c.6-3 3.1-4.6 6.2-4.6s5.6 1.6 6.2 4.6"
        stroke="#FA7DA3"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Latest scores: star */
export function StarIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none">
      <path
        d="m10 2.6 2.1 4.4 4.8.6-3.5 3.3.9 4.7L10 13.3l-4.3 2.3.9-4.7L3.1 7.6l4.8-.6L10 2.6Z"
        stroke="#F3B944"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Rankings up / down */
export function UpIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 4.5 5.5 11h3.4v7.5a1 1 0 0 0 1 1h4.2a1 1 0 0 0 1-1V11h3.4L12 4.5Z"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DownIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="m12 19.5 6.5-6.5h-3.4V5.5a1 1 0 0 0-1-1H9.9a1 1 0 0 0-1 1V13H5.5l6.5 6.5Z"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Socials */
export function TwitterIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="#AEB2CC">
      <path d="M19 4.6c-.66.3-1.37.49-2.12.58a3.7 3.7 0 0 0 1.62-2.04c-.71.42-1.5.73-2.34.9A3.69 3.69 0 0 0 9.78 6.4c0 .29.03.57.1.84A10.47 10.47 0 0 1 2.28 3.4a3.68 3.68 0 0 0 1.14 4.92 3.67 3.67 0 0 1-1.67-.46v.05c0 1.79 1.27 3.28 2.96 3.62-.31.08-.64.13-.97.13-.24 0-.47-.02-.7-.07a3.7 3.7 0 0 0 3.45 2.56A7.4 7.4 0 0 1 1 15.68a10.44 10.44 0 0 0 5.66 1.66c6.79 0 10.5-5.62 10.5-10.5v-.48A7.5 7.5 0 0 0 19 4.6Z" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="#AEB2CC">
      <path d="M12.6 3.4h2V.14A26.11 26.11 0 0 0 11.68 0C8.8 0 6.83 1.82 6.83 5.16V8.24H3.6v3.9h3.23V22h3.97v-9.85h3.1l.49-3.9h-3.6V5.55c0-1.13.31-2.15 1.81-2.15Z" transform="scale(0.9) translate(1 -0.5)" />
    </svg>
  );
}

/* Mobile hamburger / close */
export function MenuIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M3 6h18M3 12h18M3 18h18" stroke="#30325B" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="m5 5 14 14M19 5 5 19" stroke="#30325B" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
