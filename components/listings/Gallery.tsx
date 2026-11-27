"use client";

import { useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/components/ui/primitives";
import type { ImageRef } from "@/data/types";

export function Gallery({ images, title }: { images: ImageRef[]; title: string }) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div aria-roledescription="gallery" aria-label={`Photos of ${title}`}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[3px]">
        <Photo
          key={current.src}
          src={current.src}
          alt={current.alt}
          sizes="(min-width: 1280px) 760px, (min-width: 1024px) 60vw, 100vw"
          preload={active === 0}
          overlay="bottom"
          className="absolute inset-0"
        />
        <p className="absolute bottom-3 right-4 text-xs font-medium text-text/80" aria-live="polite">
          {active + 1} / {images.length}
        </p>
      </div>
      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((img, i) => (
            <li key={img.src + i}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1}: ${img.alt}`}
                aria-pressed={i === active}
                className={cn(
                  "relative block aspect-[4/3] w-full overflow-hidden rounded-[2px] border transition-opacity",
                  i === active ? "border-accent" : "border-transparent opacity-60 hover:opacity-100",
                )}
              >
                <Photo src={img.src} alt="" sizes="160px" overlay="none" className="absolute inset-0" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
