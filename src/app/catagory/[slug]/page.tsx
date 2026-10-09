"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { toBn } from "@/lib/bn";

type Sort = "default" | "asc" | "desc";

export default function CategoryList({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<Sort>("default");

  const sorted = [...products];
  if (sort === "asc") sorted.sort((a, b) => a.today - b.today);
  if (sort === "desc") sorted.sort((a, b) => b.today - a.today);

  return (
    <>
      <div className="mb-4 flex items-center justify-end gap-2 rounded-box border border-base-300 bg-base-100 p-3">
        <label htmlFor="sort" className="text-sm text-base-content/70">
          সাজান
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="select select-bordered select-sm"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <p className="mb-3 text-sm text-base-content/60">
        মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}