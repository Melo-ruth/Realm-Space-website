import { Quicksand, Unbounded } from "next/font/google";

/**
 * To swap fonts, change these two imports. The CSS variable names
 * (--font-display-face, --font-body-face) must stay the same; globals.css maps
 * them to the Tailwind `font-display` and `font-body` utilities.
 */
export const displayFont = Unbounded({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display-face",
  display: "swap",
});

export const bodyFont = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body-face",
  display: "swap",
});
