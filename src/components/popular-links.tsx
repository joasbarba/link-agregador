import { getMostClickedLinks } from "@/lib/data";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUpIcon, ExternalLinkIcon } from "lucide-react";
import { getCategoryBySlug } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

interface PopularLinksProps {
  limit?: number;
}

export function PopularLinks({ limit = 5 }: PopularLinksProps) {
  const popularLinks = getMostClickedLinks(limit);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUpIcon className="h-5 w-5 text-blue-600" />
          Links Populares
        </CardTitle>
      </CardHeader>
      <CardContent>
        {popularLinks.length === 0 ? (
          <p className="text-center text-sm text-gray-500">
            Ainda não há links populares.
          </p>
        ) : (
          <ul className="space-y-3">
            {popularLinks.map((link) => {
              const category = getCategoryBySlug(link.category);

              return (
                <li key={link.id} className="border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {link.title}
                      </Link>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-50 text-xs">
                          <Link href={`/categoria/${link.category}`}>
                            {category?.name || link.category}
                          </Link>
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {link.clicks || 0} cliques
                        </span>
                      </div>
                    </div>
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-gray-100"
                    >
                      <ExternalLinkIcon className="h-4 w-4 text-gray-500" />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
