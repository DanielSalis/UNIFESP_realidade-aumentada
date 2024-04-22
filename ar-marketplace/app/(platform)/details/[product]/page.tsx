'use client';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';
import JsonList from '@/mocks/mock.json';
import {Button} from '@/components/ui/button';

type ProductItem = {
  'slug': string,
  'name': string,
  'imgSrc': string,
  'modelPath': string,
  'price': number,
  'discountPercentage': number | null,
  'modelScale': number,
  'description': string
}

const DetailsPage = () => {
  const pathname = usePathname();
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState<ProductItem | null>(null);

  const findProductBySlug = (slug: string) => {
    let desiredItem;
    JsonList.map((product)=>{
      product.categories.map( (category) => {
        category.items.map( (item) => {
          if (item.slug === slug){
            desiredItem = item;
          }
        });
      });
    });

    return desiredItem || null;
  };

  useEffect(() => {
    setProductId(pathname.split('/')[2]);
  }, [pathname,productId]);

  useEffect(() => {
    setProduct(findProductBySlug(productId));
  }, [productId]);

  console.log(product);

  if(!product) {
    return (
      <div> Produto não encontrado </div>
    );
  }

  return(
    <div className="w-full px-2">
      <div className="flex justify-between items-center">
        <div className="flex-col">
          <h2>{product.name}</h2>
          <h4>Nome do vendedor</h4>
        </div>
        {product.modelPath ? 'AR - enabled' : ''}
      </div>

      <img src={product.imgSrc} alt={`Imagem ${product.name}`}/>

      <div className="flex justify-between items-center">
        <div className="flex-col">
          <h2>{product.discountPercentage ? product.price - (product.price * product.discountPercentage) : ''}</h2>
          <h4>{product.price}</h4>
        </div>
        <span>2 in stock</span>
      </div>

      <div className="w-full flex justify-center">
        <Button>Add to cart</Button>
      </div>

      {product.description &&
          <div>
            <h2>Description</h2>
            <p>{product.description ? product.description : null}</p>
          </div>
      }
    </div>
  );
};

export default DetailsPage;