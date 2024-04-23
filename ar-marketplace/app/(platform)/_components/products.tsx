'use client';

import React from 'react';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '@/components/ui/carousel';
import {Card, CardContent} from '@/components/ui/card';
import { useRouter } from 'next/navigation';

interface ItemInterface {
    'slug': string,
    'name': string,
    'imgSrc': string,
    'modelPath': string,
    'price': number,
    'discountPercentage': number | null,
    'modelScale': number
}

interface CategoriesInterface {
    name: string,
    items: Array<ItemInterface>
}


interface ProductsProps {
    productsList: Array<CategoriesInterface> | null
}

export const Products = ({productsList}: ProductsProps) => {
  const router = useRouter();

  const redirectToArPage = (productItem: ItemInterface) => {
    router.push(`/details/${productItem.slug}`);
  };

  return (
    <>
      {productsList && productsList.map(category=>(
        <div key={category.name} className="w-100 mt-4 flex-col font-bold">
          <h3>{category.name}</h3>
          <div className="px-10">
            <Carousel
            >
              <CarouselContent>
                {category.items.map((item, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1" onClick={()=>redirectToArPage(item)}>
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-3xl font-semibold">{item.name}</span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      ))}
    </>
  );
};
