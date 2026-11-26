import Link from "next/link";

/** Three vertical accent bars of different heights plus the wordmark. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 24" width="22" height="24" aria-hidden className={className}>
      <rect x="0" y="10" width="5" height="14" fill="var(--accent)" />
      <rect x="8.5" y="0" width="5" height="24" fill="var(--accent)" />
      <rect x="17" y="5" width="5" height="19" fill="var(--accent)" />
    </svg>
  );
}

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="flex items-center gap-3" aria-label="Realm Space, home">
      <LogoMark />
      <span className="font-display text-[0.8rem] font-bold uppercase leading-none tracking-[0.08em] text-text">
        Realm Space
      </span>
    </Link>
  );
}
