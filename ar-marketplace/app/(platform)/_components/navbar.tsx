'use client';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';
import { Camera, Home, Menu, ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {useCart} from '@/context/CartContext';
import {Badge} from '@/components/ui/badge';

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const { items } = useCart();
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  const onOpen = useSidebar((state) => state.onOpen);
  const onClose = useSidebar((state) => state.onClose);
  const isOpen = useSidebar((state) => state.isOpen);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }

  const routes = [
    {
      label: 'Home',
      icon: <Home className="h-4 w-4 mr-2" />,
      href: '/',
    },
    {
      label: 'ArView',
      icon: <Camera className="h-4 w-4 mr-2" />,
      href: '/ArView',
    },
  ];

  const onClickRoute = (href: string) => {
    router.push(href);
  };

  return (
    <nav className=" fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center justify-between">
      <div className="flex items-center">
        <Button
          onClick={onOpen}
          className="block mr-2"
          variant="ghost"
          size="sm"
        >
          <Menu className="h-4 w-4" />
        </Button>
        <Sheet open={isOpen} onOpenChange={onClose}>
          <SheetContent
            side="left"
            className="p-2 pt-10"
          >
            {routes.map((route)=>(
              <Button
                key={route.href}
                size="sm"
                onClick={()=>onClickRoute(route.href)}
                className={cn(
                  'w-full font-normal justify-start pl-10 mb-1',
                  pathname === route.href && 'bg-sky-500/10 text-sky-700'
                )}
                variant="ghost"
              >
                {route.icon}
                {route.label}
              </Button>
            ))}
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex">
        <Logo />
      </div>
      <div className="flex items-center">
        <ShoppingCart className=" h-4 w4" />
        {totalQuantity > 0 &&
            <Badge variant="secondary" className=" -ml-2 -mt-6">{totalQuantity}</Badge>
        }
      </div>
    </nav>
  );
};