import { AddCategoryForm } from "@/components/add-category-form";
import { PageLayout } from "@/components/page-layout";

export const metadata = {
  title: "Adicionar Categoria - Agregador de Links",
  description: "Adicione uma nova categoria para organizar seus links no agregador.",
};

export default function AddCategoryPage() {
  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900">Adicionar Categoria</h1>
        <p className="text-lg text-gray-600">
          Crie uma nova categoria para organizar melhor os links. Uma boa categoria ajuda os usuários a encontrarem o conteúdo que procuram.
        </p>
      </div>

      <AddCategoryForm />
    </PageLayout>
  );
}
