const ugx = new Intl.NumberFormat("en-UG", { maximumFractionDigits: 0 });

export function formatUGX(amount: number) {
  return `UGX ${ugx.format(amount)}`;
}

/** Compact form for cards and filters, e.g. "UGX 85M", "UGX 1.45B" */
export function formatUGXShort(amount: number) {
  if (amount >= 1_000_000_000) return `UGX ${trim(amount / 1_000_000_000)}B`;
  if (amount >= 1_000_000) return `UGX ${trim(amount / 1_000_000)}M`;
  if (amount >= 1_000) return `UGX ${trim(amount / 1_000)}K`;
  return `UGX ${amount}`;
}

function trim(n: number) {
  return n.toFixed(2).replace(/\.?0+$/, "");
}

export function formatAcres(acres: number) {
  if (acres >= 1) return `${trim(acres)} acre${acres === 1 ? "" : "s"}`;
  return `${trim(acres)} acres`;
}

export function bedroomsLabel(n: number) {
  if (n === 0) return "Studio";
  return `${n} bed${n === 1 ? "" : "s"}`;
}
