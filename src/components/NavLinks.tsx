import NavLinksClient from "./NavLinksClient";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
    { next: { revalidate: 300 } }
  );
  const categories: Category[] = await res.json();

  return <NavLinksClient categories={categories} />;
};

export default NavLinks;