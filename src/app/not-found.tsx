import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/page-layout";

export default function NotFound() {
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h1 className="mb-4 text-6xl font-bold text-blue-600">404</h1>
        <h2 className="mb-6 text-3xl font-semibold text-gray-900">Página não encontrada</h2>
        <p className="mb-8 max-w-md text-lg text-gray-600">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>
        <Button asChild>
          <Link href="/">Voltar para a página inicial</Link>
        </Button>
      </div>
    </PageLayout>
  );
}
