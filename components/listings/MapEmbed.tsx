import type { GeoPoint } from "@/data/types";

/** Keyless Google Maps embed from coordinates. */
export function MapEmbed({ geo, title, zoom = 14 }: { geo: GeoPoint; title: string; zoom?: number }) {
  const src = `https://maps.google.com/maps?q=${geo.lat},${geo.lng}&z=${zoom}&output=embed`;
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] border border-line bg-surface">
      <iframe
        src={src}
        title={`Map showing the location of ${title}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full grayscale-[0.6] invert-[0.92] hue-rotate-180"
      />
    </div>
  );
}
