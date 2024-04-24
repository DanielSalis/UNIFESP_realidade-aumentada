'use client';

import {useCart} from '@/context/CartContext';

const CartPage = () => {
  const {items} = useCart();

  console.log(items);
  return (
    <>
      {items.length >0 &&
        <div>{items[0].product.name}</div>
      }
      <div>Teste</div>
    </>
  );
};

export default  CartPage;

