import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { LandBrowser } from "@/components/listings/Browsers";
import { Container } from "@/components/ui/primitives";
import { land } from "@/data/land";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Land for Sale in Kampala and Wakiso",
  description:
    "Verified plots for sale around Kampala: Kira, Gayaza, Mukono, Matugga, Kajjansi and Entebbe. Titles searched and boundaries opened before we list.",
  path: "/land",
  image: "/images/land-01.jpg",
});

export default function LandPage() {
  return (
    <>
      <PageHeader
        eyebrow="Land sales"
        title="Land for sale"
        intro="Residential and commercial plots across Greater Kampala. Every title is searched and every boundary opened by a surveyor before a plot appears here."
        image="/images/land-01.jpg"
      />
      <Container className="pb-24 lg:pb-32">
        <LandBrowser items={land} />
      </Container>
    </>
  );
}
