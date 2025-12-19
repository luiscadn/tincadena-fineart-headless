import Image from 'next/image';
import Link from 'next/link'; 

export default function ProductCard({ product }: { product: any }) {
  const image = product.images.edges[0]?.node;
  
  // const price = product.priceRange?.minVariantPrice?.amount; 

  return (
    <Link href={`/products/${product.handle}`} className="group block"> 
      <div className="flex flex-col items-center cursor-pointer">
        <div className="relative aspect-square w-full overflow-hidden bg-zinc-900">
          <Image
            src={image?.url || '/placeholder.jpg'}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
           {/* Capa oscura sutil al hacer hover */}
           <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
        </div>
        <h3 className="mt-6 text-xs tracking-[0.3em] uppercase font-light text-zinc-200 group-hover:text-white transition-colors">
          {product.title}
        </h3>
        <p className="text-[10px] text-zinc-500 mt-2 uppercase tracking-[0.2em]">
          View Piece
        </p>
      </div>
    </Link>
  );
}