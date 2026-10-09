 import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";
import { toBn, topFallers, topRisers } from "@/lib/bn";

export default async function Home() {
  const products = await getProducts();
  const risers = topRisers(products);
  const fallers = topFallers(products);

  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-6">
      <Hero />

      <section>
        <h2 className="mb-4 text-xl font-bold">
          <span className="text-error">▲</span> আজ দাম বেড়েছে
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {risers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">
          <span className="text-success">▼</span> আজ দাম কমেছে
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fallers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section id="সব-পণ্য" className="scroll-mt-4">
        <h2 className="text-xl font-bold">সব পণ্য</h2>
        <p className="mb-4 text-sm text-base-content/60">
          মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}