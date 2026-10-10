import Link from "next/link";
import { getCategories, getProducts } from "@/lib/api";

import CategoryHeader from "@/components/CategoryHeader";

import ProductCard from "@/components/ProductCard";

export default async function CategoryPage({
params,
}: {
 params: Promise<{ slug: string }>;
}) {
 const { slug } = await params;

const [categories, products] = await Promise.all([
 getCategories(),
 getProducts(slug),
 ]);
 const category = categories.find((c) => c.slug === slug);

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
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
 {products.map((p) => (
<ProductCard key={p.id} product={p} />
 ))}
</div>
 
 </main>
 );
}