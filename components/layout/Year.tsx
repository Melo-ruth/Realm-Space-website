import { cacheLife } from "next/cache";

/** Current year, computed in a cached scope so the static shell can include it. */
export async function Year() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
