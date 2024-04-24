'use client';

import { Toaster } from 'sonner';
import { Navbar } from './_components/navbar';
import {CartProvider} from '@/context/CartContext';

interface PlatformInterface{
  children: React.ReactNode
}

const PlatformLayout = ({
  children
}: PlatformInterface) => {
  return (
    <CartProvider>
      <div className="w-full h-full bg-slate-100">
        <Toaster position="top-right"/>
        <Navbar />
        <main className="w-full pt-20 pb-20 bg-slate-100">
          {children}
        </main>
        {/* <Footer></Footer> */}
      </div>
    </CartProvider>
  );
};

export default PlatformLayout;