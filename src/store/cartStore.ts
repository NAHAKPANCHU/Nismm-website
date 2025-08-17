import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../data/products";

export interface CartItem extends Product {
 quantity: number;
}

export interface WishlistItem extends Product {}

interface CartStore {
 items: CartItem[];
 wishlist: WishlistItem[];
 isCartOpen: boolean;

 // Cart actions
 addToCart: (product: Product, quantity?: number) => void;
 removeFromCart: (productId: number) => void;
 updateQuantity: (productId: number, quantity: number) => void;
 clearCart: () => void;
 setCartOpen: (isOpen: boolean) => void;

 // Wishlist actions
 addToWishlist: (product: Product) => void;
 removeFromWishlist: (productId: number) => void;
 moveToCart: (productId: number) => void;

 // Computed values
 getTotalItems: () => number;
 getTotalPrice: () => number;
 isInWishlist: (productId: number) => boolean;
}

export const useCartStore = create<CartStore>()(
 persist(
  (set, get) => ({
   items: [],
   wishlist: [],
   isCartOpen: false,

   addToCart: (product: Product, quantity = 1) => {
    set((state) => {
     const existingItem = state.items.find((item) => item.id === product.id);

     if (existingItem) {
      return {
       items: state.items.map((item) =>
        item.id === product.id
         ? { ...item, quantity: item.quantity + quantity }
         : item
       ),
      };
     }

     return {
      items: [...state.items, { ...product, quantity }],
     };
    });
   },

   removeFromCart: (productId: number) => {
    set((state) => ({
     items: state.items.filter((item) => item.id !== productId),
    }));
   },

   updateQuantity: (productId: number, quantity: number) => {
    if (quantity <= 0) {
     get().removeFromCart(productId);
     return;
    }

    set((state) => ({
     items: state.items.map((item) =>
      item.id === productId ? { ...item, quantity } : item
     ),
    }));
   },

   clearCart: () => {
    set({ items: [] });
   },

   setCartOpen: (isOpen: boolean) => {
    set({ isCartOpen: isOpen });
   },

   addToWishlist: (product: Product) => {
    set((state) => {
     const exists = state.wishlist.find((item) => item.id === product.id);
     if (exists) return state;

     return {
      wishlist: [...state.wishlist, product],
     };
    });
   },

   removeFromWishlist: (productId: number) => {
    set((state) => ({
     wishlist: state.wishlist.filter((item) => item.id !== productId),
    }));
   },

   moveToCart: (productId: number) => {
    const { wishlist, addToCart, removeFromWishlist } = get();
    const product = wishlist.find((item) => item.id === productId);

    if (product) {
     addToCart(product);
     removeFromWishlist(productId);
    }
   },

   getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
   },

   getTotalPrice: () => {
    return get().items.reduce(
     (total, item) => total + item.price * item.quantity,
     0
    );
   },

   isInWishlist: (productId: number) => {
    return get().wishlist.some((item) => item.id === productId);
   },
  }),
  {
   name: "echoshop-cart-storage",
  }
 )
);
