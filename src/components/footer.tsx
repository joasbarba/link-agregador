import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-white py-6">
      <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Agregador de Links</h2>
          <p className="text-sm text-gray-600">
            Os melhores links sobre tecnologia, música, esportes e mais.
          </p>
        </div>

        <div className="flex gap-8">
          <div>
            <h3 className="mb-2 text-sm font-semibold">Categorias</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/categoria/tecnologia" className="text-gray-600 hover:text-blue-600">
                  Tecnologia
                </Link>
              </li>
              <li>
                <Link href="/categoria/musica" className="text-gray-600 hover:text-blue-600">
                  Música
                </Link>
              </li>
              <li>
                <Link href="/categoria/esportes" className="text-gray-600 hover:text-blue-600">
                  Esportes
                </Link>
              </li>
              <li>
                <Link href="/categoria/outros" className="text-gray-600 hover:text-blue-600">
                  Outros
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold">Links</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categorias" className="text-gray-600 hover:text-blue-600">
                  Todas as Categorias
                </Link>
              </li>
              <li>
                <Link href="/adicionar" className="text-gray-600 hover:text-blue-600">
                  Adicionar Link
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container mt-6 border-t pt-6">
        <p className="text-center text-sm text-gray-600">
          © {currentYear} Agregador de Links. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
