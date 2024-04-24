import {Check, CheckCircle} from 'lucide-react';
import {Separator} from '@/components/ui/separator';

const CheckoutPage = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between items-center px-4">
      <div className="flex items-center w-full justify-center">
        <CheckCircle/>
        <h1>Thanks for your order!</h1>
      </div>
      <div className="flex flex-col items-center">
        <h2>Your order is scheduled to arrive on</h2>
        <h2 className="text font-bold">Monday!</h2>
      </div>
      <div className="w-full">
        <Separator className="bg-gray-400" />
        <h3 className="text text-gray-400 text-sm mt-4">A wizard is never late, Frodo Baggins. Nor is he early. He arrives precisely when he means to.</h3>
      </div>
    </div>
  );
};

export default CheckoutPage;