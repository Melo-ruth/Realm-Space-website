import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Photo } from "@/components/ui/Photo";
import { FadeUp } from "@/components/ui/FadeUp";
import { ButtonLink, Container, Eyebrow, Section, SectionTitle, StatBlock } from "@/components/ui/primitives";
import { ABOUT, STATS } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Realm Space Properties",
  description:
    "Realm Space Properties is a Kampala real estate company built on verification: searched titles, opened boundaries and inspected homes.",
  path: "/about",
  image: "/images/house-02.jpg",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="If we wouldn't buy it, we don't list it"
        image="/images/house-02.jpg"
      />

      <Container className="grid gap-12 pb-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <FadeUp>
          <figure>
            <Photo
              src="/images/founder.jpg"
              alt={ABOUT.founder.imageAlt}
              sizes="(min-width: 1024px) 480px, 100vw"
              overlay="bottom"
              className="aspect-[4/5] rounded-[3px]"
            />
            <figcaption className="mt-4">
              <p className="font-display text-base font-semibold uppercase">{ABOUT.founder.name}</p>
              <p className="text-sm text-muted">{ABOUT.founder.role}</p>
            </figcaption>
          </figure>
        </FadeUp>
        <FadeUp>
          <Eyebrow>Our story</Eyebrow>
          <SectionTitle className="mt-3">Built on verification</SectionTitle>
          <div className="mt-6 space-y-5 text-text/85">
            {ABOUT.story.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <dt className="sr-only">Years of experience</dt>
              <dd>
                <StatBlock value={ABOUT.yearsExperience} label="Years of experience" size="md" />
              </dd>
            </div>
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <StatBlock value={s.value} label={s.label} size="md" />
                </dd>
              </div>
            ))}
          </dl>
        </FadeUp>
      </Container>

      <Section aria-labelledby="areas-title">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeUp>
            <Eyebrow>Where we work</Eyebrow>
            <SectionTitle id="areas-title" className="mt-3">
              Areas served
            </SectionTitle>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 border-t border-line">
              {ABOUT.areasServed.map((a) => (
                <li key={a} className="border-b border-line py-4 text-text/90">
                  {a}
                </li>
              ))}
            </ul>
          </FadeUp>
          <FadeUp>
            <Eyebrow>Registration</Eyebrow>
            <SectionTitle className="mt-3">Licences and memberships</SectionTitle>
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {ABOUT.licenses.map((l) => (
                <div key={l.label} className="grid gap-1 py-4 sm:grid-cols-[200px_1fr]">
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{l.label}</dt>
                  <dd className="text-text/90">{l.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Talk to us</ButtonLink>
              <ButtonLink href="/owners" variant="secondary">
                List your property
              </ButtonLink>
            </div>
          </FadeUp>
        </Container>
      </Section>
    </>
  );
}
