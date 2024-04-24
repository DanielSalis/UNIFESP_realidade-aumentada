import {createContext, ReactNode, useContext, useState} from 'react';

type Product = {
    slug: string;
    name: string;
    price: number;
};

type CartItem = {
    product: Product;
    quantity: number;
};

type CartContextType = {
    items: CartItem[];
    addToCart: (product: Product) => void;
};

type CartProviderProps = {
    children: ReactNode;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const existingItemIndex = items.findIndex((item) => item.product.slug === product.slug);

    if (existingItemIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity++;
      setItems(updatedItems);
    } else {
      setItems([...items, { product, quantity: 1 }]);
    }
  };

  return (
    <CartContext.Provider value={{ items, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
