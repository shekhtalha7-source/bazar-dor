 import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";
import { toBn, topFallers, topRisers } from "@/lib/bn";

export default async function Home() {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    { next: { revalidate: 300 } }
  );
  const products: Product[] = await res.json();

  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-6">
      <Hero />

      <section>
        <h2 className="mb-4 text-xl font-bold">▲ আজ দাম বেড়েছে</h2>
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
          {topRisers(products).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">▼ আজ দাম কমেছে</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topFallers(products).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section id="সব-পণ্য" className="scroll-mt-4">
        <h2 className="text-xl font-bold">সব পণ্য</h2>
        <p className="mb-4 text-sm text-base-content/60">
          মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}