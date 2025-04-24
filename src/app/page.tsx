import { getAllLinks, getAllCategories } from "@/lib/data";
import { LinkGrid } from "@/components/link-grid";
import { CategoryGrid } from "@/components/category-grid";
import { PageLayout } from "@/components/page-layout";
import { PopularLinks } from "@/components/popular-links";
import { Button } from "@/components/ui/button";
import { LinkIcon, FolderPlusIcon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const links = getAllLinks();
  const categories = getAllCategories();

  return (
    <PageLayout>
      <section className="mb-12">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
            Agregador de Links
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Encontre os melhores links sobre tecnologia, música, esportes e muito mais.
            Navegue pelas categorias e descubra conteúdos úteis e atualizados.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button asChild className="gap-2">
              <Link href="/adicionar">
                <PlusCircleIcon className="h-4 w-4" />
                Adicionar Link
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <Link href="/categorias/adicionar">
                <FolderPlusIcon className="h-4 w-4" />
                Adicionar Categoria
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h2 className="mb-6 text-2xl font-semibold">Categorias</h2>
            <CategoryGrid categories={categories} />
          </div>

          <div>
            <div className="mb-6 flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-blue-600" />
              <h2 className="text-2xl font-semibold">Links Recentes</h2>
            </div>
            <LinkGrid
              links={links.sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              ).slice(0, 6)}
              emptyMessage="Nenhum link adicionado ainda."
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border bg-gradient-to-b from-blue-50 to-white p-6">
            <h3 className="mb-3 text-lg font-semibold">Compartilhe seus links!</h3>
            <p className="mb-4 text-sm text-gray-600">
              Tem um link interessante para compartilhar? Adicione-o à nossa plataforma e ajude outros usuários a encontrarem conteúdo relevante.
            </p>
            <Button asChild size="sm" className="w-full">
              <Link href="/adicionar">Adicionar um Link</Link>
            </Button>
          </div>

          <PopularLinks limit={5} />
        </div>
      </div>
    </PageLayout>
  );
}
