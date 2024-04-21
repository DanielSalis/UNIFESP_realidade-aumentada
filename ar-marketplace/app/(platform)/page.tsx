import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const HomePage = () => {
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
          <p>A expressão Lorem ipsum em design gráfico e editoração é um texto padrão em latim utilizado na produção gráfica para preencher os espaços de texto em publicações (jornais, revistas, e sites) para testar e ajustar aspectos visuais (layout, tipografia, formatação, etc.) antes de utilizar conteúdo real. Também é utilizado em catálogos tipográficos, para demonstrar textos e títulos escritos com as fontes.[1]</p>
        </TabsContent>
        <TabsContent value="Best sellers">
          <p>Teste2</p>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default HomePage;