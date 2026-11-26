import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true } as const;

export function WhatsAppIcon(props: P) {
  return (
    <svg {...base} {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36A9.43 9.43 0 0 1 12.06 2.6a9.37 9.37 0 0 1 6.66 2.76 9.37 9.37 0 0 1 2.75 6.67c0 5.2-4.23 9.43-9.42 9.43m8.02-17.45A11.27 11.27 0 0 0 12.05.72C5.8.72.71 5.8.71 12.05c0 2 .52 3.95 1.52 5.67L.62 23.6l6.02-1.58a11.3 11.3 0 0 0 5.41 1.38h.01c6.25 0 11.34-5.08 11.34-11.34 0-3.03-1.18-5.88-3.33-8.02" />
    </svg>
  );
}

export function ArrowIcon(props: P) {
  return (
    <svg {...base} {...props} stroke="currentColor" strokeWidth={1.5}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="square" />
    </svg>
  );
}

export function MenuIcon(props: P) {
  return (
    <svg {...base} {...props} stroke="currentColor" strokeWidth={1.5}>
      <path d="M3 7h18M3 12h18M3 17h18" />
    </svg>
  );
}

export function CloseIcon(props: P) {
  return (
    <svg {...base} {...props} stroke="currentColor" strokeWidth={1.5}>
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

export function PhoneIcon(props: P) {
  return (
    <svg {...base} {...props} stroke="currentColor" strokeWidth={1.5}>
      <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2" />
    </svg>
  );
}

export function MailIcon(props: P) {
  return (
    <svg {...base} {...props} stroke="currentColor" strokeWidth={1.5}>
      <path d="M3 5h18v14H3z" />
      <path d="M3 6l9 7 9-7" />
    </svg>
  );
}

export function PinIcon(props: P) {
  return (
    <svg {...base} {...props} stroke="currentColor" strokeWidth={1.5}>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function ClockIcon(props: P) {
  return (
    <svg {...base} {...props} stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function CheckIcon(props: P) {
  return (
    <svg {...base} {...props} stroke="currentColor" strokeWidth={1.75}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function InstagramIcon(props: P) {
  return (
    <svg {...base} {...props} stroke="currentColor" strokeWidth={1.5}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon(props: P) {
  return (
    <svg {...base} {...props} fill="currentColor">
      <path d="M13.5 21v-7.5H16l.5-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4a21 21 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4.1v2.1H7.6v3h2.7V21z" />
    </svg>
  );
}

export function XIcon(props: P) {
  return (
    <svg {...base} {...props} fill="currentColor">
      <path d="M17.8 3h3.1l-6.8 7.8 8 10.2h-6.3l-4.9-6.4L5.3 21H2.2l7.3-8.3L1.8 3h6.4l4.4 5.9zm-1.1 16.2h1.7L7.4 4.7H5.6z" />
    </svg>
  );
}

export function LinkedInIcon(props: P) {
  return (
    <svg {...base} {...props} fill="currentColor">
      <path d="M4.5 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4M3 8.5h3V21H3zM9 8.5h2.9v1.7h.04c.4-.76 1.38-1.56 2.85-1.56 3.05 0 3.6 2 3.6 4.6V21h-3v-6.1c0-1.46-.03-3.33-2.03-3.33-2.03 0-2.34 1.59-2.34 3.23V21H9z" />
    </svg>
  );
}
