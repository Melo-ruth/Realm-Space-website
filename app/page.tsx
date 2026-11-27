import type { Metadata } from "next";
import Link from "next/link";
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
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,17,19,0.85)_0%,rgba(11,17,19,0.15)_30%,rgba(11,17,19,0.1)_45%,rgba(11,17,19,0.85)_78%,#0B1113_100%)] lg:bg-[linear-gradient(to_bottom,rgba(11,17,19,0.8)_0%,rgba(11,17,19,0.05)_32%,rgba(11,17,19,0.05)_55%,rgba(11,17,19,0.88)_88%,#0B1113_100%)]"
          />
        </div>

        <div className="relative z-10 pt-[84px] lg:pt-[92px]">
          <Container>
            <h1
              id="hero-title"
              className="font-display text-[clamp(3.25rem,19vw,7.5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-white lg:whitespace-nowrap lg:text-[clamp(3.25rem,9.2vw,8.7rem)]"
            >
              <span className="block lg:inline">Realm</span> <span className="block lg:inline">Space</span>
              <span className="sr-only"> Properties, real estate in Kampala</span>
            </h1>
          </Container>
        </div>

        <div className="relative z-10 mt-auto pb-10 pt-[20svh] lg:pb-14 lg:pt-24">
          <Container className="grid items-end gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div>
              <Eyebrow className="text-text/80">{HERO.label}</Eyebrow>
              <p className="mt-4 font-display text-[1.65rem] font-bold uppercase leading-[1.05] tracking-tight sm:text-[2rem]">
                Find. Own.
                <br />
                Move in.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="#featured" variant="primary">
                  Explore Properties
                </ButtonLink>
                <ButtonLink href="/owners#owner-form" variant="secondary">
                  List Your Property
                </ButtonLink>
              </div>
            </div>
            <div className="lg:justify-self-end lg:max-w-[520px]">
              <p className="text-[0.95rem] text-text/85">{HERO.intro}</p>
              <dl className="mt-7 grid grid-cols-3 gap-4 sm:gap-8">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <StatBlock value={s.value} label={s.label} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Container>
        </div>
      </section>

      {/* b. Services */}
      <Section aria-labelledby="services-title">
        <Container>
          <FadeUp>
            <Eyebrow>What we do</Eyebrow>
            <SectionTitle id="services-title" className="mt-3">
              All Services
            </SectionTitle>
          </FadeUp>
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <FadeUp key={s.title} delay={i * 90}>
                <article className="relative flex h-full flex-col border-t border-line pt-8">
                  <GhostText className="absolute -top-2 left-0 text-[5.5rem] sm:text-[6.5rem]">{s.number}</GhostText>
                  <h3 className="relative mt-10 font-display text-lg font-semibold uppercase leading-tight">{s.title}</h3>
                  <p className="relative mt-3 text-[0.95rem] text-muted">{s.description}</p>
                  <Link
                    href={s.href}
                    className="relative mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent hover:text-white"
                  >
                    {s.cta} <ArrowIcon width={16} height={16} />
                  </Link>
                </article>
              </FadeUp>
            ))}
          </div>
        </Container>
      </Section>

      {/* c. Process */}
      <Section aria-labelledby="process-title" className="bg-surface">
        <Container>
          <FadeUp className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <div>
              <Eyebrow>For property owners</Eyebrow>
              <SectionTitle id="process-title" className="mt-3">
                Three-Step Process
              </SectionTitle>
            </div>
            <p className="max-w-xl text-muted lg:justify-self-end">
              Selling, renting out or handing over management: the route is the same, and we keep you updated at every step.
            </p>
          </FadeUp>
          <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8 lg:mt-20">
            {PROCESS.map((step, i) => (
              <li key={step.title}>
                <FadeUp delay={i * 110} className="relative">
                  <GhostText className="absolute -top-10 left-0 text-[5rem] lowercase sm:text-[6rem]">{step.ghost}</GhostText>
                  <div className="relative pt-10">
                    <p className="font-display text-xs font-bold text-accent">0{i + 1}</p>
                    <h3 className="mt-3 font-display text-lg font-semibold uppercase leading-tight">{step.title}</h3>
                    <p className="mt-3 text-[0.95rem] text-muted">{step.description}</p>
                  </div>
                </FadeUp>
              </li>
            ))}
          </ol>
          <FadeUp className="mt-14">
            <ButtonLink href="/owners" variant="secondary">
              How we work with owners
            </ButtonLink>
          </FadeUp>
        </Container>
      </Section>

      {/* d. Featured */}
      <Section id="featured" aria-labelledby="featured-title" className="scroll-mt-16">
        <Container>
          <FadeUp className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Hand-picked this month</Eyebrow>
              <SectionTitle id="featured-title" className="mt-3">
                Featured Properties
              </SectionTitle>
            </div>
            <ButtonLink href="/land" variant="primary" className="px-4 py-2.5 text-[0.65rem]">
              View All Listings
            </ButtonLink>
          </FadeUp>
          <FadeUp className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:mt-14 lg:grid-cols-4">
            {featured().map((l) => (
              <FeatureCard key={`${l.kind}-${l.slug}`} listing={l} sizes="(min-width: 1024px) 300px, 50vw" />
            ))}
          </FadeUp>
          <FadeUp className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-xs font-semibold uppercase tracking-[0.16em]">
            <Link href="/land" className="inline-flex items-center gap-2 text-accent hover:text-white">
              Land <ArrowIcon width={14} height={14} />
            </Link>
            <Link href="/apartments" className="inline-flex items-center gap-2 text-accent hover:text-white">
              Apartments <ArrowIcon width={14} height={14} />
            </Link>
            <Link href="/stays" className="inline-flex items-center gap-2 text-accent hover:text-white">
              Short stays <ArrowIcon width={14} height={14} />
            </Link>
          </FadeUp>
        </Container>
      </Section>

      {/* e. Testimonials */}
      <Section aria-labelledby="testimonials-title" className="border-t border-line">
        <Container>
          <FadeUp>
            <Eyebrow>Clients</Eyebrow>
            <SectionTitle id="testimonials-title" className="mt-3">
              In Their Words
            </SectionTitle>
          </FadeUp>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
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
        <Photo
          src="/images/house-02.jpg"
          alt=""
          sizes="100vw"
          overlay="strong"
          className="absolute inset-0"
        />
        <Container className="relative grid gap-12 py-24 lg:grid-cols-[1fr_1.2fr] lg:gap-20 lg:py-32">
          <FadeUp>
            <Eyebrow className="text-text/80">{CTA_BAND.label}</Eyebrow>
            <SectionTitle id="cta-title" className="mt-3 max-w-md">
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
