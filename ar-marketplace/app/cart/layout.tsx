'use client';

import { Toaster } from 'sonner';
import {CartProvider} from '@/context/CartContext';
import {Logo} from '@/components/logo';

interface PlatformInterface{
  children: React.ReactNode
}

const PlatformLayout = ({
  children
}: PlatformInterface) => {
  return (
    <div className="w-full h-full bg-slate-100 px-4 pt-2">
      <Toaster position="top-right"/>
      <header className="w-full flex justify-between items-center">
        <span className="text-l font-bold">Check your order</span>
        <Logo />
      </header>
      <main className="w-full pt-20 pb-20 bg-slate-100 h-full">
        {children}
      </main>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default PlatformLayout;