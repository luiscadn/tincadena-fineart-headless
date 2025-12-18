import { getProducts } from "@/lib/shopify";

export default async function Home() {
  const productsData = await getProducts();
  console.log("Productos de Shopify:", JSON.stringify(productsData, null, 2));

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold tracking-widest uppercase">Tin Cadena</h1>
      <p className="mt-4 text-gray-400">Revisa la terminal de VS Code para ver los datos.</p>
    </main>
  );
}