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
    <div className="w-full h-full bg-slate-100">
      <Toaster position="top-right"/>
      <header className="w-full flex justify-between items-center px-4 bg-slate-200">
        <span className="text-l text-neutral-700">Review order</span>
        <Logo />
      </header>
      <main className="w-full pt-20 pb-20 bg-slate-100 h-full px-4">
        {children}
      </main>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default PlatformLayout;