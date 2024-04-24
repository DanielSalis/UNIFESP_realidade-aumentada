'use client';

import { Toaster } from 'sonner';
import {CartProvider} from '@/context/CartContext';

interface PlatformInterface{
  children: React.ReactNode
}

const PlatformLayout = ({
  children
}: PlatformInterface) => {
  return (
    <div className="w-full h-full bg-slate-100">
      <Toaster position="top-right"/>
      <header className="w-full">
              Check your order
      </header>
      <main className="w-full pt-20 pb-20 bg-slate-100">
        {children}
      </main>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default PlatformLayout;