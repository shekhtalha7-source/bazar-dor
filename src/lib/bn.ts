import type { MarketPrice, Product } from "./types";

const digits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export const toBn = (n: number | string): string =>
  String(n).replace(/\d/g, (d) => digits[Number(d)]);

// 1850 -> "১,৮৫০"
export const formatPrice = (n: number): string =>
  toBn(n.toLocaleString("en-US"));

// unit বাংলায়
const unitMap: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  liter: "প্রতি লিটার",
  l: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
  pcs: "প্রতি পিস",
  pc: "প্রতি পিস",
};
export const unitLabel = (unit: string): string =>
  unitMap[unit.toLowerCase()] ?? `প্রতি ${unit}`;

// ticker-এর জন্য ছোট রূপ: kg -> "কেজি"
export const unitShort = (unit: string): string =>
  unitLabel(unit).replace("প্রতি ", "");

// "▲ ২.১%" / "▼ ২.৯%" / "— ০.০%"
export const formatChange = (p: Product["change"]): string => {
  const pct = toBn(Math.abs(p.pct).toFixed(1));
  if (p.dir === "up") return `▲ ${pct}%`;
  if (p.dir === "down") return `▼ ${pct}%`;
  return `— ${pct}%`;
};

// badge-এর রং (DaisyUI/Tailwind ক্লাস)
export const changeClass = (dir: Product["change"]["dir"]): string =>
  dir === "up"
    ? "text-error bg-error/10"
    : dir === "down"
    ? "text-success bg-success/10"
    : "text-base-content/60 bg-base-200";

// markets থেকে সর্বনিম্ন, সর্বোচ্চ ও গড় দাম
export function priceSummary(markets: MarketPrice[]) {
  if (markets.length === 0) return { min: 0, max: 0, avg: 0 };
  const min = Math.min(...markets.map((m) => m.min));
  const max = Math.max(...markets.map((m) => m.max));
  const avg = Math.round(
    markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length
  );
  return { min, max, avg };
}

// বাড়া / কমার শীর্ষ ৬টা
export const topRisers = (products: Product[], n = 6) =>
  products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, n);

export const topFallers = (products: Product[], n = 6) =>
  products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, n);