import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1280px] px-6 lg:px-10", className)}>{children}</div>;
}

/** Vertical rhythm between sections: 96px mobile, 128px desktop */
export function Section({
  className,
  children,
  id,
  ...rest
}: ComponentProps<"section">) {
  return (
    <section id={id} className={cn("py-24 lg:py-32", className)} {...rest}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-[0.8rem] font-medium tracking-[0.01em] text-muted", className)}>{children}</p>
  );
}

export function SectionTitle({
  children,
  as: Tag = "h2",
  className,
  id,
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "font-display text-2xl font-semibold uppercase leading-[1.1] tracking-tight text-text sm:text-3xl lg:text-4xl",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[3px] px-5 py-3 text-[0.85rem] font-semibold leading-none transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const buttonVariants = {
  primary: "bg-accent text-accent-ink hover:bg-white",
  secondary: "border border-white text-white hover:bg-white hover:text-accent-ink",
  ghost: "border border-line text-text hover:border-white",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

export function buttonClass(variant: ButtonVariant = "primary", className?: string) {
  return cn(buttonBase, buttonVariants[variant], className);
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  external,
  ...rest
}: {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
  external?: boolean;
} & Omit<ComponentProps<"a">, "href">) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClass(variant, className)} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, className)} {...rest}>
      {children}
    </Link>
  );
}

/** Large Unbounded figure with a 2px accent bar on its left */
export function StatBlock({ value, label, size = "lg" }: { value: string; label: string; size?: "md" | "lg" }) {
  return (
    <div className="flex gap-3">
      <span aria-hidden className="w-[2px] shrink-0 self-stretch bg-accent" />
      <div>
        <p
          className={cn(
            "font-display font-bold leading-none text-text",
            size === "lg" ? "text-2xl sm:text-4xl" : "text-xl sm:text-2xl",
          )}
        >
          {value}
        </p>
        <p className="mt-2 text-[0.78rem] font-medium leading-snug text-text/75 sm:text-[0.85rem]">
          {label}
        </p>
      </div>
    </div>
  );
}

/** Oversized, low-opacity text placed behind content */
export function GhostText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none select-none font-display font-extrabold leading-none text-white/[0.06]",
        className,
      )}
    >
      {children}
    </span>
  );
}
