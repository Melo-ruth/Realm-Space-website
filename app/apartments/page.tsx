import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ApartmentBrowser } from "@/components/listings/Browsers";
import { Container } from "@/components/ui/primitives";
import { apartments } from "@/data/apartments";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Apartments for Rent and Sale in Kampala",
  description:
    "Apartments to rent or buy in Kololo, Naguru, Ntinda, Bugolobi, Muyenga and Najjera. Inspected in person, with viewings arranged by Realm Space.",
  path: "/apartments",
  image: "/images/apartment-01.jpg",
});

export default function ApartmentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Apartment brokerage"
        title="Apartments"
        intro="Homes to rent or buy, from studios to penthouses. We inspect every unit in person and handle viewings and negotiation for you."
        image="/images/apartment-02.jpg"
      />
      <Container className="pb-24 lg:pb-32">
        <ApartmentBrowser items={apartments} />
      </Container>
    </>
  );
}
