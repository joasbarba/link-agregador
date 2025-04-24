import { Suspense } from "react";
import { PageLayout } from "@/components/page-layout";
import { AddLinkForm } from "@/components/add-link-form";

export const metadata = {
  title: "Adicionar Link - Agregador de Links",
  description: "Adicione um novo link útil ao nosso agregador de links.",
};

function AddLinkFormSuspense() {
  return (
    <Suspense fallback={<div>Carregando formulário...</div>}>
      <AddLinkForm />
    </Suspense>
  );
}

export default function AddLinkPage() {
  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900">Adicionar Link</h1>
        <p className="text-lg text-gray-600">
          Compartilhe um link útil com a comunidade. Preencha o formulário abaixo para adicionar um novo link.
        </p>
      </div>

      <AddLinkFormSuspense />
    </PageLayout>
  );
}
