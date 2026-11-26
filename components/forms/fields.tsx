import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/components/ui/primitives";

export const controlClass =
  "block w-full rounded-[3px] border border-line bg-surface px-4 py-3 text-[0.95rem] text-text placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/60 aria-[invalid=true]:border-[#f2b8b5]";

type FieldShellProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
};

export function FieldShell({ id, label, error, hint, optional, className, children }: FieldShellProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">
        {label}
        {optional && <span className="ml-1 normal-case tracking-normal text-muted/80">(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-[#f2b8b5]">
          {error}
        </p>
      )}
    </div>
  );
}

function describedBy(id: string, error?: string, hint?: string) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

type Common = { label: string; error?: string; hint?: string; optional?: boolean; className?: string };

export function TextField({ id, label, error, hint, optional, className, ...input }: Common & ComponentProps<"input"> & { id: string }) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} optional={optional} className={className}>
      <input
        id={id}
        className={controlClass}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        {...input}
      />
    </FieldShell>
  );
}

export function TextAreaField({ id, label, error, hint, optional, className, ...input }: Common & ComponentProps<"textarea"> & { id: string }) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} optional={optional} className={className}>
      <textarea
        id={id}
        rows={5}
        className={cn(controlClass, "resize-y")}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        {...input}
      />
    </FieldShell>
  );
}

export function SelectField({
  id,
  label,
  error,
  hint,
  optional,
  className,
  options,
  placeholder,
  ...input
}: Common & ComponentProps<"select"> & { id: string; options: { value: string; label: string }[]; placeholder?: string }) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} optional={optional} className={className}>
      <div className="relative">
        <select
          id={id}
          className={cn(controlClass, "appearance-none pr-10")}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, hint)}
          {...input}
        >
          {placeholder !== undefined && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 12 8"
          className="pointer-events-none absolute right-4 top-1/2 h-2 w-3 -translate-y-1/2 text-muted"
        >
          <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </FieldShell>
  );
}

export function CheckboxField({
  id,
  label,
  error,
  className,
  ...input
}: { label: ReactNode; error?: string; className?: string } & ComponentProps<"input"> & { id: string }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm text-text/90">
        <input
          id={id}
          type="checkbox"
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-[2px] border border-line bg-surface checked:border-accent checked:bg-accent checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22><path d=%22M5 10.5l3.5 3.5L15 7%22 fill=%22none%22 stroke=%22%230B1113%22 stroke-width=%222%22/></svg>')] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          {...input}
        />
        <span>{label}</span>
      </label>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-[#f2b8b5]">
          {error}
        </p>
      )}
    </div>
  );
}

/** Off-screen trap field. Bots fill it; people never see it. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
      <label htmlFor="company_website">Company website</label>
      <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}
