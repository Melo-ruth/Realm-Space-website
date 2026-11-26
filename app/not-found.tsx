import { ButtonLink, Container, Eyebrow, GhostText } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Container className="relative flex min-h-[80svh] flex-col justify-center pb-24 pt-36">
      <GhostText className="absolute left-6 top-28 text-[10rem] sm:text-[16rem]">404</GhostText>
      <div className="relative">
        <Eyebrow>Page not found</Eyebrow>
        <h1 className="mt-4 max-w-2xl font-display text-4xl font-extrabold uppercase leading-none sm:text-6xl">
          This address is off the map
        </h1>
        <p className="mt-6 max-w-md text-muted">The listing may have been sold or the link may be out of date.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/land" variant="secondary">
            Browse listings
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
