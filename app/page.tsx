import { getProducts } from "@/lib/shopify";
import ProductCard from "./components/ProductCard";

export default async function Home() {
  const productsData = await getProducts();
  const products = productsData.data.products.edges;

  return (
    <main className="min-h-screen bg-black text-white px-8 py-20">
      <header className="mb-20 text-center">
        <h1 className="text-3xl font-extralight tracking-[0.6em] uppercase">Tin Cadena</h1>
        <p className="text-zinc-500 text-[10px] mt-4 tracking-[0.3em] uppercase">Photography</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {products.map((item: any) => (
          <ProductCard key={item.node.id} product={item.node} />
        ))}
      </div>
    </main>
  );
}