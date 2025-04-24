"use client";

import type { Link as LinkType } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { getCategoryBySlug } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface LinkCardProps {
  link: LinkType;
}

export function LinkCard({ link }: LinkCardProps) {
  const [clicks, setClicks] = useState(link.clicks || 0);
  const category = getCategoryBySlug(link.category);
  const formattedDate = new Date(link.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const handleLinkClick = async () => {
    try {
      const response = await fetch("/api/track-click", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ linkId: link.id }),
      });

      if (response.ok) {
        const data = await response.json();
        setClicks(data.clicks);
      }
    } catch (error) {
      console.error("Failed to track click:", error);
    }
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <Link
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="line-clamp-1 flex-1 text-blue-600 hover:underline"
            onClick={handleLinkClick}
          >
            {link.title}
          </Link>
          <Link
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex h-6 w-6 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-blue-600"
            onClick={handleLinkClick}
          >
            <ExternalLinkIcon className="h-4 w-4" />
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {link.description || "Sem descrição disponível"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-gray-500 truncate">{link.url}</div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t pt-4">
        <Badge variant="outline" className="bg-blue-50">
          <Link href={`/categoria/${link.category}`}>
            {category?.name || link.category}
          </Link>
        </Badge>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <div>{clicks} cliques</div>
          <div>|</div>
          <div>Adicionado em {formattedDate}</div>
        </div>
      </CardFooter>
    </Card>
  );
}
