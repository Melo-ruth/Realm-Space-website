import Image from "next/image";
import { cn } from "./primitives";

/**
 * Every photo on the site goes through this component so it gets the same
 * treatment: brightness/saturation grade plus a dark top and bottom fade into --bg.
 * The parent decides the size; Photo fills it.
 */
export function Photo({
  src,
  alt,
  sizes,
  priority = false,
  className,
  imgClassName,
  overlay = "both",
  hoverZoom = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  overlay?: "both" | "bottom" | "none" | "strong";
  hoverZoom?: boolean;
}) {
  return (
    <div className={cn(!className?.includes("absolute") && "relative", "overflow-hidden bg-surface", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          "photo-grade object-cover",
          hoverZoom && "transition-transform duration-700 ease-out group-hover:scale-[1.03]",
          imgClassName,
        )}
      />
      {overlay !== "none" && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0",
            overlay === "both" &&
              "bg-[linear-gradient(to_bottom,rgba(11,17,19,0.75)_0%,rgba(11,17,19,0)_28%,rgba(11,17,19,0)_55%,rgba(11,17,19,0.92)_100%)]",
            overlay === "bottom" &&
              "bg-[linear-gradient(to_bottom,rgba(11,17,19,0)_40%,rgba(11,17,19,0.9)_100%)]",
            overlay === "strong" && "bg-[linear-gradient(to_bottom,rgba(11,17,19,0.8),rgba(11,17,19,0.85))]",
          )}
        />
      )}
    </div>
  );
}
