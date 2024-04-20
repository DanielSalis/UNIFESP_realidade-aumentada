import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Scan } from 'lucide-react';

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 flex">
        <Scan className=' h-4 w-4 '/>
        <p className={cn(
          'text-lg text-neutral-700'
        )}>
          ArMarket
        </p>
      </div>
    </Link>
  );
};