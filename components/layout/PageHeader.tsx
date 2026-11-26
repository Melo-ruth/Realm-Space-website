import type { ReactNode } from "react";
import { Photo } from "@/components/ui/Photo";
import { Container, Eyebrow } from "@/components/ui/primitives";

/** Top-of-page banner for inner pages: graded photo, label, big title, intro. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  image,
  imageAlt = "",
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <Photo src={image} alt={imageAlt} sizes="100vw" priority overlay="none" className="absolute inset-0" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,17,19,0.85)_0%,rgba(11,17,19,0.55)_45%,#0B1113_100%)]"
      />
      <Container className="relative pb-14 pt-36 lg:pb-20 lg:pt-48">
        <Eyebrow className="text-text/80">{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-4xl font-display text-[2.1rem] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] sm:text-5xl lg:text-7xl">
          {title}
        </h1>
        {intro && <p className="mt-6 max-w-2xl text-[1.02rem] text-text/85">{intro}</p>}
        {children}
      </Container>
    </section>
  );
}
