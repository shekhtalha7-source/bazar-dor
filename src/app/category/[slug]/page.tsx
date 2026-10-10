import Link from "next/link";
import { getCategories, getProducts } from "@/lib/api";
import { Suspense } from "react";
import SortSelect from "@/components/SortSelect";
import { toBn } from "@/lib/bn";
import CategoryHeader from "@/components/CategoryHeader";

import ProductCard from "@/components/ProductCard";

export default async function CategoryPage({
 params,
 searchParams,
}: {
 params: Promise<{ slug: string }>;
 searchParams: Promise<{ sort?: string }>;
}) {
 const { slug } = await params;
 const { sort = "default" } = await searchParams;

const [categories, products] = await Promise.all([
 getCategories(),
 getProducts(slug),
 ]);
 const category = categories.find((c) => c.slug === slug);
 const sorted = [...products];
if (sort === "price-asc") sorted.sort((a, b) => a.today - b.today);
if (sort === "price-desc") sorted.sort((a, b) => b.today - a.today);

 if (!category || products.length === 0) {
 return (
 <main className="mx-auto max-w-6xl px-4 py-16 text-center">
 <p className="text-6xl">🔍</p>
 <h1 className="mt-4 text-2xl font-bold">ক্যাটাগরি পাওয়া যায়নি</h1>
  <p className="mt-2 text-base-content/60">
 এই ক্যাটাগরিতে কোনো পণ্য নেই বা লিংকটি ভুল।
 </p>
 <Link href="/" className="btn btn-primary mt-6">
 হোম পেজে ফিরে যান
 </Link>
 </main>
 );
 }

 return (
 <main className="mx-auto max-w-6xl px-4 py-6">
 <CategoryHeader
 icon={category.icon}
 name={category.nameBn}
 count={products.length}
/>
<div className="mb-4 rounded-box border border-base-300 bg-base-100 p-4">
 <Suspense fallback={null}>
 <SortSelect />
 </Suspense>
</div>

<p className="mb-3 text-sm text-base-content/60">
 মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
</p>

<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
 {sorted.map((p) => (
 <ProductCard key={p.id} product={p} />
 ))}
</div>
 
 </main>
 );
}