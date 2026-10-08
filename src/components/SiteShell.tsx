import Navbar from "./Navbar";
import Ticker from "./Ticker";
import Footer from "./Footer";
import { getCategories, getProducts } from "@/lib/api";

export default async function SiteShell({ children }: { children: React.ReactNode }) {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  return (
    <>
      <Navbar categories={categories} />
      <Ticker products={products} />
      <div className="min-h-[60vh]">{children}</div>
      <Footer />
    </>
  );
}