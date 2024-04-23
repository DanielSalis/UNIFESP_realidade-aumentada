'use client';
import {usePathname, useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import JsonList from '@/mocks/mock.json';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import {Camera} from 'lucide-react';

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
  const router = useRouter();

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

  const redirectToArPage = (productItem: ProductItem) => {
    router.push(`/ArView/${productItem.slug}`);
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
    <div className="w-full px-2 flex flex-col justify-center items-center">
      <div className=" w-full flex justify-between items-start">
        <div className="flex-col">
          <h2 className="text-2xl text-neutral-800 font-bold">{product.name}</h2>
          <h4 className="text-xs text-neutral-500">Thirty six apartment company</h4>
        </div>
        {product.modelPath &&
            <Link href={`/ArView/${product.slug}`}>
              <Badge className="text-md bg-sky-500/10 text-sky-700">
                <Camera className="h-4 w-4 mr-2" />
                AR- room
              </Badge>
            </Link>}
      </div>

      <div className="w-full h-[320px] relative mt-5">
        <Image
          fill
          src={`/public/${product.imgSrc}`}
          alt={`Imagem ${product.name}`}
          className="rounded-sm object-cover"
        />
      </div>

      <div className="flex justify-between items-startr w-full flex justify-between mt-5">
        {product.discountPercentage ?
          <div className="flex-col">
            <h2 className="text-2xl text-red-800">{product.discountPercentage ? (product.price - (product.price * product.discountPercentage)).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            }) : ''}</h2>
            <h4 className="text-md text-neutral-500 line-through">{(product.price).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}</h4>
          </div> :
          <div className="flex-col">
            <h2 className="text-2xl text-red-800">{(product.price).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}</h2>
          </div>

        }
        <span className="text-md text-neutral-500">2 in stock</span>
      </div>

      <div className="w-full flex justify-center mt-5">
        <Button className="w-full">Add to cart</Button>
      </div>

      {product.description &&
          <div className="w-full flex flex-col justify-between mt-5">
            <h2 className="text font-bold">Description</h2>
            <p className="mt-2">{product.description ? product.description : null}</p>
          </div>
      }
    </div>
  );
};

export default DetailsPage;