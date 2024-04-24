'use client';

import {useCart} from '@/context/CartContext';
import Image from 'next/image';
import {Card} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import {Button} from '@/components/ui/button';
import {Lock} from 'lucide-react';

const CartPage = () => {
  const {items} = useCart();

  if(!items || items.length < 1) {
    return <span> Cart is empty</span>;
  }

  const calculateFinalPrice = () => {
    let counter = 0;
    items.forEach((item)=>{
      counter = counter + (item.product.price * item.quantity);
    });
    return counter;
  };

  console.log(items);
  return (
    <div className="w-full h-full">
      {items.map((item, index) => {
        return (
          <Card key={`${index}-${item.product.slug}`} className="flex items-center justify-start p-2 mb-2">
            <div className="w-[100px] h-[100px] flex items-center">
              <Image
                width={100}
                height={100}
                src={`/public/${item.product.imgSrc}`}
                alt={item.product.name}
                className="rounded-sm object-cover">
              </Image>
            </div>
            <div className="flex flex-col ">
              <span className="ml-4">{`${item.product.name}`}</span>
              <span className="ml-4">{`${item.product.price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}`}</span>
            </div>
            <span className="ml-auto">{`(x${item.quantity})`}</span>
          </Card>
        );
      })
      }
      <Separator className="h-1 bg-gray-300 mt-5"/>
      <div className="flex justify-between items-center mt-4">
        <span>Price</span>
        <span>{calculateFinalPrice().toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })}</span>
      </div>
      <div className="flex justify-between items-center mt-1">
        <span>Tax</span>
        <span>{(10.99).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })}</span>
      </div>
      <div className="flex justify-between items-center mt-1">
        <span className="text font-bold">Total</span>
        <span className="text font-bold">{(calculateFinalPrice() + 10.99).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })}</span>
      </div>
      <div className="flex justify-between items-center mt-1">
        <Button className="w-full mt-6">
          <label>Buy</label>
        </Button>
      </div>
    </div>
  );
};

export default CartPage;

