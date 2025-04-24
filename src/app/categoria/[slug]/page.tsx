import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLinksByCategory, getCategoryBySlug, getAllCategories } from "@/lib/data";
import { LinkGrid } from "@/components/link-grid";
import { PageLayout } from "@/components/page-layout";
import { PopularLinks } from "@/components/popular-links";
import { Button } from "@/components/ui/button";
import {
  LaptopIcon,
  MusicIcon,
  TrophyIcon,
  BookmarkIcon,
  PlusCircleIcon,
} from "lucide-react";
import Link from "next/link";

// Gera os parâmetros estáticos para todas as categorias
export function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

// Gera metadados dinâmicos com base na categoria
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = typeof params?.slug === "string" ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : "";
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Categoria não encontrada - Agregador de Links",
      description: "A categoria que você está procurando não foi encontrada.",
    };
  }

  return {
    title: `${category.name} - Agregador de Links`,
    description: `Explore os melhores links sobre ${category.name.toLowerCase()} em nosso agregador de links.`,
  };
}

// Retorna o ícone apropriado com base no slug da categoria
const getCategoryIcon = (slug: string) => {
  switch (slug) {
    case "tecnologia":
      return <LaptopIcon className="h-8 w-8" />;
    case "musica":
      return <MusicIcon className="h-8 w-8" />;
    case "esportes":
      return <TrophyIcon className="h-8 w-8" />;
    default:
      return <BookmarkIcon className="h-8 w-8" />;
  }
};

// Página de detalhes da categoria (exibe links, info, botão adicionar)
export default function Page({ params }: { params: { slug: string } }) {
  // Suporte para slug ser string ou array (edge case)
  const slug = typeof params?.slug === "string" ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : "";
  const category = getCategoryBySlug(slug);

  // Se não encontrar a categoria, retorna 404
  if (!category) {
    notFound();
  }

  // Obtém os links da categoria selecionada
  const links = getLinksByCategory(slug);

  return (
    <PageLayout>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                {getCategoryIcon(slug)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
                <p className="mt-2 text-lg text-gray-600">
                  {category.description || `Explore os melhores links sobre ${category.name.toLowerCase()}.`}
                </p>
              </div>
            </div>
            {/* Botão para adicionar novo link nesta categoria */}
            <Button asChild className="mt-4 gap-2 sm:mt-0">
              <Link href={`/adicionar?category=${slug}`}>
                <PlusCircleIcon className="h-4 w-4" />
                Adicionar Link
              </Link>
            </Button>
          </div>
          {/* Lista os links agregados dessa categoria */}
          <LinkGrid
            links={links}
            emptyMessage={`Ainda não há links na categoria ${category.name}. Seja o primeiro a adicionar!`}
          />
        </div>
        {/* Lateral direita: informações da categoria + links populares */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-gradient-to-b from-blue-50 to-white p-6">
            <h3 className="mb-3 text-lg font-semibold">Sobre {category.name}</h3>
            <p className="mb-4 text-sm text-gray-600">
              {category.description || `Esta categoria contém links relacionados a ${category.name.toLowerCase()}.`}
            </p>
            <p className="text-sm text-gray-600">
              Atualmente, há {links.length} links nesta categoria.
            </p>
          </div>
          <PopularLinks limit={5} />
        </div>
      </div>
    </PageLayout>
  );
}
