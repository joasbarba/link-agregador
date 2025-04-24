import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BookmarkIcon,
  PlusCircleIcon
} from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <BookmarkIcon className="h-6 w-6 text-blue-600" />
          <Link href="/" className="text-xl font-bold text-blue-600">
            Agregador de Links
          </Link>
        </div>
        <nav className="flex gap-4">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link href="/categorias" className="hover:text-blue-600">
            Categorias
          </Link>
        </nav>
        <Button asChild variant="outline" className="gap-2">
          <Link href="/adicionar">
            <PlusCircleIcon className="h-4 w-4" />
            Adicionar Link
          </Link>
        </Button>
      </div>
    </header>
  );
}
