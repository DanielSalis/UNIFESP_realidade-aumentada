
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import JsonList from '../../mocks/mock.json';
import {Products} from '@/app/(platform)/_components/products';

const HomePage = () => {
  const findProperTabContent = (tabname:string)=>{
    const desiredProductSection = JsonList.find(item=>item.name === tabname);
    return desiredProductSection ? desiredProductSection.categories : null;
  };
  console.log(findProperTabContent('All products'));
  return (
    <Tabs defaultValue="All products" className="w-full px-2">
      <TabsList className="w-full pl-32 overflow-scroll">
        <TabsTrigger value="All products">All products</TabsTrigger>
        <TabsTrigger value="Best sellers">Best sellers</TabsTrigger>
        <TabsTrigger value="Living room">Living room</TabsTrigger>
        <TabsTrigger value="Bedroom">Bedroom</TabsTrigger>
        <TabsTrigger value="Kitchen">Kitchen</TabsTrigger>
      </TabsList>
      <div className="mx-4">
        <TabsContent value="All products">
          <Products productsList={findProperTabContent('All products')}></Products>
        </TabsContent>
        <TabsContent value="Best sellers">
          <Products productsList={findProperTabContent('Best sellers')}></Products>
        </TabsContent>
      </div>
    </Tabs>

  );
};

export default HomePage;