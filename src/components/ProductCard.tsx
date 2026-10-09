import Link from "next/link";
import type { Product } from "@/lib/types";
import { changeClass, formatChange, formatPrice, unitLabel } from "@/lib/bn";

export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="block rounded-box border border-base-300 bg-base-100 p-4 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-base-200 text-2xl">
          {p.image}
        </span>
        <div>
          <h3 className="font-semibold leading-tight">{p.nameBn}</h3>
          <p className="text-xs text-base-content/60">{unitLabel(p.unit)}</p>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-base-content/60">আজকের দাম</p>
          <p className="text-xl font-bold">
            {formatPrice(p.today)} <span className="text-sm font-normal">টাকা</span>
          </p>
        </div>
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${changeClass(
            p.change.dir
          )}`}
        >
          {formatChange(p.change)}
        </span>
      </div>
    </Link>
  );
}