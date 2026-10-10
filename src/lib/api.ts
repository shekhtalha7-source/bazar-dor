import type { Category, Product } from "./types";

const BASES = [
 "https://api.api-store.workers.dev/api/bazardor",
 "https://api.abcz.workers.dev/api/bazardor",
];

// প্রথম URL কাজ না করলে দ্বিতীয়টা চেষ্টা করে
async function request<T>(path: string): Promise<T> {
 let lastError: unknown;
 for (const base of BASES) {
 try {
 const res = await fetch(`${base}${path}`, { next: { revalidate: 100 } });
 if (!res.ok) throw new Error(`HTTP ${res.status}`);
 return (await res.json()) as T;
 } catch (err) {
 lastError = err;
 } }
 throw lastError;
}

export const getProducts = (category?: string) =>
 request<Product[]>(
 category ? `/products?category=${encodeURIComponent(category)}` : "/products"
 );

export const getCategories = () => request<Category[]>("/categories");

export const getCategory = (slug: string) =>
 request<Category>(`/categories/${encodeURIComponent(slug)}`);

// slug দিয়ে পণ্য খোঁজা (API-তে id দিয়ে খোঁজা যায়, তাই সব নিয়ে মিলিয়ে নিচ্ছি)
export async function getProductBySlug(slug: string): Promise<Product | null> {
 const all = await getProducts();
 return all.find((p) => p.slug === slug) ?? null;
}
export const getProduct = (id: string) =>
 request<Product>(`/products/${encodeURIComponent(id)}`).catch(() => null);