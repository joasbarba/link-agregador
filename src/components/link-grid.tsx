import type { Link as LinkType } from "@/lib/data";
import { LinkCard } from "@/components/link-card";

interface LinkGridProps {
  links: LinkType[];
  emptyMessage?: string;
}

export function LinkGrid({ links, emptyMessage = "Nenhum link encontrado." }: LinkGridProps) {
  if (links.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border bg-gray-50">
        <p className="text-center text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  );
}
