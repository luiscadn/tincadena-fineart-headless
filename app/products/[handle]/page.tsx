import AddToCartButton from "@/app/components/AddToCartButton";
import { getProduct } from "@/lib/shopify";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) return notFound();

  // Formateador de dinero 
  const formatPrice = (amount: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(parseFloat(amount));
  };

  const image = product.images.edges[0]?.node;
  const price = product.priceRange.minVariantPrice.amount;

  return (
    <section className="min-h-screen bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        
        {/* COLUMNA IZQUIERDA */}
        <div className="relative h-[50vh] md:h-screen w-full bg-zinc-900">
          <Image
            src={image?.url}
            alt={product.title}
            fill
            className="object-cover"
            priority // (LCP)
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* COLUMNA DERECHA*/}
        <div className="flex flex-col justify-center px-8 py-16 md:px-20">
          
          <div className="space-y-6 max-w-lg">
            {/* Categoría o Colección*/}
            <span className="text-xs font-bold tracking-[0.3em] text-zinc-500 uppercase">
              Limited Edition
            </span>

            {/* Título */}
            <h1 className="text-4xl md:text-6xl font-extralight tracking-wide uppercase">
              {product.title}
            </h1>

            {/* Precio */}
            <p className="text-2xl font-light text-zinc-300">
              {formatPrice(price)}
            </p>

            {/* Separador */}
            <div className="h-[1px] w-full bg-zinc-800 my-8" />

            {/* Descripción */}
            <div 
              className="prose prose-invert prose-p:font-light prose-p:text-zinc-400 prose-headings:font-light prose-headings:tracking-widest"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }} 
            />

            {/* Boton de Acción */}
            <AddToCartButton 
                product={{
                    id: product.id, // Ojo: Idealmente usaríamos variantId aquí, pero por ahora product.id sirve para probar
                    title: product.title,
                    price: product.priceRange.minVariantPrice.amount,
                    image: image?.url
                }} 
                />
          </div>

        </div>
      </div>
    </section>
  );
}