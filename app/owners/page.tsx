import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { FadeUp } from "@/components/ui/FadeUp";
import { ButtonLink, Container, Eyebrow, GhostText, Section, SectionTitle } from "@/components/ui/primitives";
import { CheckIcon } from "@/components/ui/icons";
import { OWNERS_PAGE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sell or Manage Your Property",
  description:
    "Sell your land, house or apartment, or let Realm Space find tenants, collect rent and look after your property in Kampala.",
  path: "/owners",
  image: "/images/house-01.jpg",
});

export default function OwnersPage() {
  return (
    <>
      <PageHeader
        eyebrow="For property owners"
        title="Sell or manage"
        intro={OWNERS_PAGE.intro}
        image="/images/house-01.jpg"
      />

      <Container>
        <div className="grid gap-5 md:grid-cols-2">
          {OWNERS_PAGE.paths.map((p, i) => (
            <FadeUp key={p.title} delay={i * 100} className="h-full">
              <article className="flex h-full flex-col rounded-[4px] border border-line bg-surface p-7 sm:p-9">
                <p className="font-display text-xs font-bold text-accent">0{i + 1}</p>
                <h2 className="mt-3 font-display text-xl font-semibold uppercase leading-tight sm:text-2xl">{p.title}</h2>
                <p className="mt-4 text-muted">{p.description}</p>
                <ul className="mt-6 space-y-3">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-text/90">
                      <CheckIcon className="mt-0.5 shrink-0 text-accent" width={18} height={18} />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <ButtonLink href="#owner-form" variant={i === 0 ? "primary" : "secondary"}>
                    {i === 0 ? "Start selling" : "Start managing"}
                  </ButtonLink>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </Container>

      <Section aria-labelledby="how-title">
        <Container>
          <FadeUp>
            <Eyebrow>How it works</Eyebrow>
            <SectionTitle id="how-title" className="mt-3">
              Four steps to handover
            </SectionTitle>
          </FadeUp>
          <ol className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {OWNERS_PAGE.steps.map((s, i) => (
              <li key={s.title}>
                <FadeUp delay={i * 90} className="relative">
                  <GhostText className="absolute -top-8 left-0 text-[5.5rem]">{i + 1}</GhostText>
                  <div className="relative border-t border-line pt-8">
                    <h3 className="font-display text-base font-semibold uppercase leading-tight">{s.title}</h3>
                    <p className="mt-3 text-[0.95rem] text-muted">{s.description}</p>
                  </div>
                </FadeUp>
              </li>
            ))}
          </ol>
          <FadeUp className="mt-14 max-w-3xl rounded-[3px] border-l-2 border-accent bg-surface px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">A note on fees</p>
            <p className="mt-2 text-text/85">{OWNERS_PAGE.feesNote}</p>
          </FadeUp>
        </Container>
      </Section>

      <Section id="owner-form" aria-labelledby="owner-form-title" className="scroll-mt-16 bg-surface">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <Eyebrow>List your property</Eyebrow>
            <SectionTitle id="owner-form-title" className="mt-3">
              Tell us about it
            </SectionTitle>
            <p className="mt-5 max-w-md text-muted">
              Share the basics and a few photos. We reply within one working day with next steps and an honest view of
              price or rent.
            </p>
          </div>
          <div className="rounded-[4px] border border-line bg-bg p-6 sm:p-8">
            <InquiryForm variant="owner" />
          </div>
        </Container>
      </Section>
    </>
  );
}
