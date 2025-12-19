"use client";

import { useCartStore } from "@/store/cartStore";
interface AddToCartProps {
  product: {
    id: string;
    title: string;
    price: string;
    image: string;
  };
}

export default function AddToCartButton({ product }: AddToCartProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button 
      onClick={() => addItem({ ...product, quantity: 1 })}
      className="mt-8 w-full bg-white text-black py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-zinc-200 transition-colors"
    >
      Add to Collection
    </button>
  );
}