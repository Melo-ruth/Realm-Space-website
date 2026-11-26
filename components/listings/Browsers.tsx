"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { SelectField } from "@/components/forms/fields";
import { buttonClass } from "@/components/ui/primitives";
import type { ApartmentListing, LandListing, StayListing } from "@/data/types";
import { ListingCard, apartmentCardProps, landCardProps, stayCardProps } from "./cards";

type Range = { value: string; label: string; min: number; max: number };

const LAND_PRICES: Range[] = [
  { value: "u50", label: "Under UGX 50M", min: 0, max: 50_000_000 },
  { value: "50-150", label: "UGX 50M to 150M", min: 50_000_000, max: 150_000_000 },
  { value: "150-500", label: "UGX 150M to 500M", min: 150_000_000, max: 500_000_000 },
  { value: "500+", label: "Over UGX 500M", min: 500_000_000, max: Infinity },
];

const LAND_SIZES: Range[] = [
  { value: "small", label: "Up to 1/4 acre", min: 0, max: 0.25 },
  { value: "mid", label: "1/4 to 1 acre", min: 0.25001, max: 1 },
  { value: "large", label: "Over 1 acre", min: 1.0001, max: Infinity },
];

const RENT_PRICES: Range[] = [
  { value: "u2", label: "Under UGX 2M / month", min: 0, max: 2_000_000 },
  { value: "2-5", label: "UGX 2M to 5M / month", min: 2_000_000, max: 5_000_000 },
  { value: "5+", label: "Over UGX 5M / month", min: 5_000_000, max: Infinity },
];

const SALE_PRICES: Range[] = [
  { value: "u700", label: "Under UGX 700M", min: 0, max: 700_000_000 },
  { value: "700+", label: "Over UGX 700M", min: 700_000_000, max: Infinity },
];

const inRange = (ranges: Range[], key: string, n: number) => {
  const r = ranges.find((x) => x.value === key);
  return !r || (n >= r.min && n <= r.max);
};

const uniqueOptions = (values: string[]) =>
  Array.from(new Set(values))
    .sort()
    .map((v) => ({ value: v, label: v }));

function FilterBar({ children, onReset, count }: { children: ReactNode; onReset: () => void; count: number }) {
  return (
    <div role="search" aria-label="Filter listings" className="rounded-[3px] border border-line bg-surface p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
      <div className="mt-5 flex items-center justify-between gap-4 border-t border-line pt-4">
        <p className="text-sm text-muted" aria-live="polite">
          {count} {count === 1 ? "listing" : "listings"}
        </p>
        <button type="button" onClick={onReset} className="text-xs font-semibold uppercase tracking-[0.16em] text-accent hover:text-white">
          Reset filters
        </button>
      </div>
    </div>
  );
}

function Grid({ children, empty }: { children: ReactNode[]; empty: ReactNode }) {
  if (children.length === 0) return <div className="mt-10 rounded-[3px] border border-dashed border-line p-10 text-center text-muted">{empty}</div>;
  return <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

const emptyState = (
  <>
    <p>Nothing matches those filters yet.</p>
    <Link href="/contact" className={buttonClass("ghost", "mt-5")}>
      Tell us what you need
    </Link>
  </>
);

export function LandBrowser({ items }: { items: LandListing[] }) {
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const locations = useMemo(() => uniqueOptions(items.map((i) => i.location)), [items]);
  const results = items.filter(
    (l) => (!location || l.location === location) && inRange(LAND_PRICES, price, l.price) && inRange(LAND_SIZES, size, l.sizeAcres),
  );

  return (
    <>
      <FilterBar
        count={results.length}
        onReset={() => {
          setLocation("");
          setPrice("");
          setSize("");
        }}
      >
        <SelectField id="land-location" label="Location" placeholder="Any location" value={location} onChange={(e) => setLocation(e.target.value)} options={locations} />
        <SelectField id="land-price" label="Price range" placeholder="Any price" value={price} onChange={(e) => setPrice(e.target.value)} options={LAND_PRICES} />
        <SelectField id="land-size" label="Plot size" placeholder="Any size" value={size} onChange={(e) => setSize(e.target.value)} options={LAND_SIZES} />
      </FilterBar>
      <Grid empty={emptyState}>
        {results.map((l) => (
          <ListingCard key={l.slug} listing={l} {...landCardProps(l)} />
        ))}
      </Grid>
    </>
  );
}

export function ApartmentBrowser({ items }: { items: ApartmentListing[] }) {
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState<"" | "rent" | "sale">("");
  const [price, setPrice] = useState("");
  const [beds, setBeds] = useState("");
  const locations = useMemo(() => uniqueOptions(items.map((i) => i.location)), [items]);
  const priceRanges = mode === "sale" ? SALE_PRICES : mode === "rent" ? RENT_PRICES : [];
  const results = items.filter(
    (a) =>
      (!location || a.location === location) &&
      (!mode || a.mode === mode) &&
      (!mode || inRange(priceRanges, price, a.price)) &&
      (!beds || (beds === "0" ? a.bedrooms === 0 : a.bedrooms >= Number(beds))),
  );

  return (
    <>
      <FilterBar
        count={results.length}
        onReset={() => {
          setLocation("");
          setMode("");
          setPrice("");
          setBeds("");
        }}
      >
        <SelectField id="apt-location" label="Location" placeholder="Any location" value={location} onChange={(e) => setLocation(e.target.value)} options={locations} />
        <SelectField
          id="apt-mode"
          label="Rent or buy"
          placeholder="Rent or buy"
          value={mode}
          onChange={(e) => {
            setMode(e.target.value as typeof mode);
            setPrice("");
          }}
          options={[
            { value: "rent", label: "For rent" },
            { value: "sale", label: "For sale" },
          ]}
        />
        <SelectField
          id="apt-price"
          label="Price"
          placeholder={mode ? "Any price" : "Choose rent or buy first"}
          value={price}
          disabled={!mode}
          onChange={(e) => setPrice(e.target.value)}
          options={priceRanges}
        />
        <SelectField
          id="apt-beds"
          label="Bedrooms"
          placeholder="Any"
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
          options={[
            { value: "0", label: "Studio" },
            { value: "1", label: "1+" },
            { value: "2", label: "2+" },
            { value: "3", label: "3+" },
          ]}
        />
      </FilterBar>
      <Grid empty={emptyState}>
        {results.map((a) => (
          <ListingCard key={a.slug} listing={a} {...apartmentCardProps(a)} />
        ))}
      </Grid>
    </>
  );
}

export function StayGrid({ items }: { items: StayListing[] }) {
  return (
    <Grid empty={emptyState}>
      {items.map((s) => (
        <ListingCard key={s.slug} listing={s} {...stayCardProps(s)} />
      ))}
    </Grid>
  );
}
