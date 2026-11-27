import type { Metadata } from "next";
import { Photo } from "@/components/ui/Photo";
import { FadeUp } from "@/components/ui/FadeUp";
import {
  ButtonLink,
  Container,
  Eyebrow,
  GhostText,
  Section,
  SectionTitle,
  StatBlock,
} from "@/components/ui/primitives";
import { ArrowIcon } from "@/components/ui/icons";
import { FeatureCard } from "@/components/listings/cards";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { CTA_BAND, HERO, PROCESS, SERVICES, SITE, STATS, TESTIMONIALS } from "@/data/site";
import { apartments } from "@/data/apartments";
import { land } from "@/data/land";
import { stays } from "@/data/stays";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Land, Apartments and Short Stays in Kampala",
    description: SITE.description,
    path: "/",
  }),
  title: { absolute: `${SITE.shortName} | Land, Apartments and Short Stays in Kampala` },
};

function featured() {
  const pick = [
    apartments.find((a) => a.featured),
    land.find((l) => l.featured),
    stays.find((s) => s.featured),
    apartments.filter((a) => a.featured)[1] ?? stays.filter((s) => s.featured)[1],
  ];
  return pick.filter((l): l is NonNullable<typeof l> => Boolean(l));
}

/*
 * Layout follows reference/design.jpg: giant wordmark across the top of a
 * full-bleed photo, tagline + buttons bottom left, lead text + stats bottom right;
 * then services with ghost numerals, steps over a faint photo, and tall project cards.
 */
export default function HomePage() {
  return (
    <>
      {/* a. Hero */}
      <section aria-labelledby="hero-title" className="relative flex min-h-svh flex-col overflow-hidden">
        <div className="absolute inset-0">
          <Photo
            src="/images/hero.jpg"
            alt={HERO.imageAlt}
            sizes="100vw"
            preload
            overlay="none"
            className="absolute inset-0"
            imgClassName="animate-hero-zoom object-[60%_center]"
          />
          {/* Cool, overcast tint so the warm window light carries the image, as in the reference */}
          <div aria-hidden className="absolute inset-0 bg-[#24434a] opacity-50 mix-blend-multiply" />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(26,35,37,0.8)_0%,rgba(26,35,37,0.1)_28%,rgba(26,35,37,0.1)_42%,rgba(26,35,37,0.88)_72%,#1A2325_100%)] lg:bg-[linear-gradient(to_bottom,rgba(26,35,37,0.7)_0%,rgba(26,35,37,0)_30%,rgba(26,35,37,0)_52%,rgba(26,35,37,0.85)_86%,#1A2325_100%)]"
          />
        </div>

        <div className="relative z-10 pt-[84px] lg:pt-[96px]">
          <Container>
            <h1
              id="hero-title"
              className="font-display text-[clamp(3.25rem,19.5vw,7.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.02em] text-white lg:whitespace-nowrap lg:text-[clamp(3.25rem,9.3vw,8.85rem)]"
            >
              <span className="block lg:inline">Realm</span>{" "}
              {/* On phones the second word steps to the right, as in the reference mockup */}
              <span className="block text-right lg:inline lg:text-left">Space</span>
              <span className="sr-only"> Properties, real estate in Kampala</span>
            </h1>
          </Container>
        </div>

        <div className="relative z-10 mt-auto pb-10 pt-[16svh] lg:pb-24 lg:pt-24">
          <Container className="grid gap-x-16 gap-y-7 lg:grid-cols-2 lg:gap-y-8">
            <p className="font-display text-[1.75rem] font-bold uppercase leading-[1.05] tracking-[-0.01em] sm:text-[2.25rem] lg:col-start-1 lg:row-start-1">
              Find. Own.
              <br />
              Move in.
            </p>

            <div className="max-w-[540px] lg:col-start-2 lg:row-start-1 lg:justify-self-end">
              <p className="text-[1rem] font-semibold leading-snug text-white">{HERO.lead}</p>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-text/80">{HERO.intro}</p>
            </div>

            <div className="flex flex-wrap gap-3 lg:col-start-1 lg:row-start-2 lg:self-start">
              <ButtonLink href="#featured" variant="primary">
                Explore properties
              </ButtonLink>
              <ButtonLink href="/owners#owner-form" variant="secondary">
                List your property
              </ButtonLink>
            </div>

            <dl className="grid w-full max-w-[540px] grid-cols-3 gap-4 sm:gap-8 lg:col-start-2 lg:row-start-2 lg:justify-self-end">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <StatBlock value={s.value} label={s.label} />
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      </section>

      {/* b. Services: ghost numerals sit under each column, as in the reference */}
      <Section aria-labelledby="services-title" className="pb-16 lg:pb-20">
        <Container>
          <FadeUp>
            <Eyebrow>What we provide</Eyebrow>
            <SectionTitle id="services-title" className="mt-2">
              All services
            </SectionTitle>
          </FadeUp>
          <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <FadeUp key={s.title} delay={i * 90} className="h-full">
                <article className="relative flex h-full flex-col pb-20 sm:pb-24">
                  <h3 className="relative max-w-[14ch] font-display text-base font-semibold uppercase leading-tight lg:text-[1.05rem]">
                    {s.title}
                  </h3>
                  <p className="relative mt-3 text-[0.9rem] leading-relaxed text-muted">{s.description}</p>
                  <Link
                    href={s.href}
                    className="relative z-10 mt-4 inline-flex items-center gap-2 text-[0.82rem] font-semibold text-accent hover:text-white"
                  >
                    {s.cta} <ArrowIcon width={15} height={15} />
                  </Link>
                  <GhostText className="absolute bottom-0 left-0 text-[5rem] sm:text-[5.75rem] lg:text-[6.25rem]">
                    {s.number}
                  </GhostText>
                </article>
              </FadeUp>
            ))}
          </div>
        </Container>
      </Section>

      {/* c. Process, over a faint photo like the reference's "steps" band */}
      <section aria-labelledby="process-title" className="relative overflow-hidden">
        <Photo src="/images/house-01.jpg" alt="" sizes="100vw" overlay="none" className="absolute inset-0" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_bottom,#1A2325_0%,rgba(26,35,37,0.84)_22%,rgba(26,35,37,0.84)_78%,#1A2325_100%)]"
        />
        <Container className="relative py-24 lg:py-32">
          <FadeUp>
            <Eyebrow>Steps</Eyebrow>
            <SectionTitle id="process-title" className="mt-2">
              Three-step process
            </SectionTitle>
          </FadeUp>
          <ol className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8 lg:mt-16">
            {PROCESS.map((step, i) => (
              <li key={step.title}>
                <FadeUp delay={i * 110} className="relative pt-12 sm:pt-14">
                  <GhostText className="absolute left-0 top-0 text-[4.5rem] lowercase sm:text-[5.5rem]">
                    {step.ghost}
                  </GhostText>
                  <h3 className="relative font-display text-base font-semibold uppercase leading-tight lg:text-[1.05rem]">
                    {step.title}
                  </h3>
                  <p className="relative mt-3 max-w-sm text-[0.9rem] leading-relaxed text-muted">{step.description}</p>
                </FadeUp>
              </li>
            ))}
          </ol>
          <FadeUp className="mt-12">
            <ButtonLink href="/owners" variant="secondary">
              How we work with owners
            </ButtonLink>
          </FadeUp>
        </Container>
      </section>

      {/* d. Featured */}
      <Section id="featured" aria-labelledby="featured-title" className="scroll-mt-16">
        <Container>
          <FadeUp className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Hand-picked for you</Eyebrow>
              <SectionTitle id="featured-title" className="mt-2">
                Featured properties
              </SectionTitle>
            </div>
            <ButtonLink href="/land" variant="primary" className="px-4 py-2.5 text-[0.8rem]">
              View all listings
            </ButtonLink>
          </FadeUp>
          <FadeUp className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-10 lg:grid-cols-4">
            {featured().map((l) => (
              <FeatureCard key={`${l.kind}-${l.slug}`} listing={l} sizes="(min-width: 1024px) 300px, 50vw" />
            ))}
          </FadeUp>
        </Container>
      </Section>

      {/* e. Testimonials */}
      <Section aria-labelledby="testimonials-title" className="border-t border-line">
        <Container>
          <FadeUp>
            <Eyebrow>Clients</Eyebrow>
            <SectionTitle id="testimonials-title" className="mt-2">
              In their words
            </SectionTitle>
          </FadeUp>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <FadeUp key={t.name} delay={i * 90}>
                <figure className="flex h-full flex-col rounded-[3px] border border-line bg-surface p-7">
                  <span aria-hidden className="font-display text-5xl font-extrabold leading-none text-accent">
                    “
                  </span>
                  <blockquote className="mt-2 flex-1 text-[0.98rem] leading-relaxed text-text/90">{t.quote}</blockquote>
                  <figcaption className="mt-6 border-t border-line pt-5">
                    <p className="font-display text-sm font-semibold uppercase">{t.name}</p>
                    <p className="mt-1 text-xs text-muted">{t.role}</p>
                  </figcaption>
                </figure>
              </FadeUp>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA band with owner form */}
      <section aria-labelledby="cta-title" className="relative overflow-hidden">
        <Photo src="/images/house-02.jpg" alt="" sizes="100vw" overlay="strong" className="absolute inset-0" />
        <Container className="relative grid gap-12 py-24 lg:grid-cols-[1fr_1.2fr] lg:gap-20 lg:py-32">
          <FadeUp>
            <Eyebrow className="text-text/80">{CTA_BAND.label}</Eyebrow>
            <SectionTitle id="cta-title" className="mt-2 max-w-md">
              {CTA_BAND.title}
            </SectionTitle>
            <p className="mt-5 max-w-md text-text/85">{CTA_BAND.body}</p>
            <div className="mt-10 grid max-w-sm grid-cols-3 gap-5">
              {STATS.map((s) => (
                <StatBlock key={s.label} value={s.value} label={s.label} size="md" />
              ))}
            </div>
          </FadeUp>
          <FadeUp>
            <div className="rounded-[4px] border border-line bg-bg/90 p-6 backdrop-blur sm:p-8">
              <InquiryForm variant="owner" />
            </div>
          </FadeUp>
        </Container>
      </section>
    </>
  );
}
