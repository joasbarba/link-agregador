import type { Category } from "@/lib/data";
import Link from "next/link";
import {
  LaptopIcon,
  MusicIcon,
  TrophyIcon,
  BookmarkIcon
} from "lucide-react";

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  // Function to get the appropriate icon for each category
  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case "tecnologia":
        return <LaptopIcon className="h-10 w-10" />;
      case "musica":
        return <MusicIcon className="h-10 w-10" />;
      case "esportes":
        return <TrophyIcon className="h-10 w-10" />;
      default:
        return <BookmarkIcon className="h-10 w-10" />;
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categoria/${category.slug}`}
          className="flex flex-col items-center justify-center rounded-lg border bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
        >
          <div className="mb-3 rounded-full bg-blue-100 p-3 text-blue-600">
            {getCategoryIcon(category.slug)}
          </div>
          <h3 className="mb-1 text-lg font-semibold">{category.name}</h3>
          <p className="text-sm text-gray-600">
            Explore links sobre {category.name.toLowerCase()}
          </p>
        </Link>
      ))}
    </div>
  );
}
