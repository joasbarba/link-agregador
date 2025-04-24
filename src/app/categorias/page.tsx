import { getAllCategories } from "@/lib/data";
import { CategoryGrid } from "@/components/category-grid";
import { PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import { FolderPlusIcon } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Categorias - Agregador de Links",
  description: "Explore todas as categorias disponíveis em nosso agregador de links.",
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <PageLayout>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-3 text-3xl font-bold text-gray-900">Categorias</h1>
          <p className="text-lg text-gray-600">
            Explore todas as categorias disponíveis em nosso agregador de links.
            Escolha uma categoria para ver os links relacionados.
          </p>
        </div>

        <Button asChild className="mt-4 gap-2 sm:mt-0">
          <Link href="/categorias/adicionar">
            <FolderPlusIcon className="h-4 w-4" />
            Adicionar Categoria
          </Link>
        </Button>
      </div>

      <CategoryGrid categories={categories} />
    </PageLayout>
  );
}
