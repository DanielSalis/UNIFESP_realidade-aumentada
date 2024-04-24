'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import {CartProvider} from '@/context/CartContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <html lang="en">
        <body className={`${inter.className} bg-slate-100`}>{children}</body>
      </html>
    </CartProvider>
  );
}
