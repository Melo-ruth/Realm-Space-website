import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { StayGrid } from "@/components/listings/Browsers";
import { Container } from "@/components/ui/primitives";
import { stays } from "@/data/stays";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Short Stays in Kampala and Entebbe",
  description:
    "Furnished short-stay homes by the night in Kampala, Entebbe and Mukono: lakeside villas, city houses and forest cabins, hosted by Realm Space.",
  path: "/stays",
  image: "/images/stay-01.jpg",
});

export default function StaysPage() {
  return (
    <>
      <PageHeader
        eyebrow="Short stays"
        title="Stay a while"
        intro="Furnished homes by the night for business trips, family visits and weekends away. Hosted and cleaned by our own team."
        image="/images/stay-01.jpg"
      />
      <Container className="pb-24 lg:pb-32">
        <StayGrid items={stays} />
      </Container>
    </>
  );
}
