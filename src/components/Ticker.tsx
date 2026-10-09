import type { Product } from "@/lib/types";
import { formatChange, formatPrice, unitShort } from "@/lib/bn";

export default function Ticker({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  const items = [...products, ...products];

  return (
    <div className="overflow-hidden border-y border-base-300 bg-base-100">
      <div className="flex w-max animate-marquee">
        {items.map((p, i) => (
          <div
            key={`${p.id}-${i}`}
            className="flex shrink-0 items-center gap-2 border-r border-base-300 px-4 py-2 text-sm whitespace-nowrap"
          >
            <span>{p.image}</span>
            <span className="font-medium">{p.nameBn}</span>
            <span>
              {formatPrice(p.today)} টাকা/{unitShort(p.unit)}
            </span>
            <span
              className={
                p.change.dir === "up"
                  ? "font-semibold text-error"
                  : p.change.dir === "down"
                  ? "font-semibold text-success"
                  : "text-base-content/60"
              }
            >
              {formatChange(p.change)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

