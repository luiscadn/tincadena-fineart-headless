"use client";

import { useCartStore } from "@/store/cartStore";
import { useEffect } from "react";
import Image from "next/image";

export default function CartDrawer() {
  const { isOpen, closeCart, cart, removeItem } = useCartStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Calcular subtotal
  const total = cart.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);

  return (
    <>
      <div 
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeCart}
      />

      <aside 
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md border-l border-zinc-800 bg-black text-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 p-6">
            <h2 className="text-sm font-light tracking-[0.2em] uppercase text-zinc-400">Your Selection</h2>
            <button onClick={closeCart} className="text-zinc-500 hover:text-white transition-colors">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center opacity-50">
                <p className="font-light tracking-widest uppercase text-xs">Your collection is empty</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4">

                  <div className="relative h-20 w-16 bg-zinc-900 flex-shrink-0 overflow-hidden">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  
                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-light tracking-wide">{item.title}</h3>
                      <p className="text-xs text-zinc-400">${parseFloat(item.price).toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Qty: {item.quantity}</p>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-[10px] underline decoration-zinc-700 underline-offset-4 hover:text-red-500 hover:decoration-red-500 transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Total y Checkout */}
          {cart.length > 0 && (
            <div className="border-t border-zinc-800 p-6 space-y-4 bg-black">
              <div className="flex justify-between text-sm font-light">
                <span className="text-zinc-400">Subtotal</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-zinc-600 text-center">Shipping & taxes calculated at checkout</p>
              <button className="w-full bg-white text-black py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-zinc-200 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}