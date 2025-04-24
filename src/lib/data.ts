export type Link = {
  id: string;
  title: string;
  url: string;
  category: string;
  description?: string;
  createdAt: Date;
  clicks?: number; // Track clicks for monetization analytics
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

// Default categories
export const categories: Category[] = [
  { id: "1", name: "Tecnologia", slug: "tecnologia", description: "Links sobre tecnologia, programação e desenvolvimento web" },
  { id: "2", name: "Música", slug: "musica", description: "Links sobre música, artistas, playlists e streaming" },
  { id: "3", name: "Esportes", slug: "esportes", description: "Links sobre esportes, notícias esportivas e eventos" },
  { id: "4", name: "Negócios", slug: "negocios", description: "Links sobre negócios, empreendedorismo e marketing" },
  { id: "5", name: "Educação", slug: "educacao", description: "Links sobre cursos, tutoriais e conteúdo educacional" },
  { id: "6", name: "Outros", slug: "outros", description: "Links diversos que não se encaixam nas outras categorias" },
];

// Initial sample links
export const links: Link[] = [
  {
    id: "1",
    title: "MDN Web Docs - JavaScript",
    url: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript",
    category: "tecnologia",
    description: "Documentação completa sobre JavaScript",
    createdAt: new Date(),
    clicks: 125,
  },
  {
    id: "2",
    title: "React - Biblioteca JavaScript",
    url: "https://react.dev/",
    category: "tecnologia",
    description: "Documentação oficial do React",
    createdAt: new Date(),
    clicks: 87,
  },
  {
    id: "3",
    title: "Spotify",
    url: "https://open.spotify.com/",
    category: "musica",
    description: "Plataforma de streaming de música",
    createdAt: new Date(),
    clicks: 210,
  },
  {
    id: "4",
    title: "SoundCloud",
    url: "https://soundcloud.com/",
    category: "musica",
    description: "Plataforma para músicos e ouvintes",
    createdAt: new Date(),
    clicks: 156,
  },
  {
    id: "5",
    title: "ESPN Brasil",
    url: "https://www.espn.com.br/",
    category: "esportes",
    description: "Notícias e atualizações esportivas",
    createdAt: new Date(),
    clicks: 185,
  },
  {
    id: "6",
    title: "Globo Esporte",
    url: "https://ge.globo.com/",
    category: "esportes",
    description: "Portal de esportes da Globo",
    createdAt: new Date(),
    clicks: 192,
  },
  {
    id: "7",
    title: "Curso de Marketing Digital",
    url: "https://www.coursera.org/specializations/digital-marketing",
    category: "negocios",
    description: "Curso completo de marketing digital no Coursera",
    createdAt: new Date(),
    clicks: 78,
  },
  {
    id: "8",
    title: "Khan Academy",
    url: "https://pt.khanacademy.org/",
    category: "educacao",
    description: "Plataforma de educação gratuita com milhares de cursos",
    createdAt: new Date(),
    clicks: 112,
  },
  {
    id: "9",
    title: "Wikipedia",
    url: "https://pt.wikipedia.org/",
    category: "outros",
    description: "Enciclopédia livre e colaborativa",
    createdAt: new Date(),
    clicks: 245,
  },
];

// Function to get links by category
export function getLinksByCategory(categorySlug: string) {
  return links.filter((link) => link.category === categorySlug);
}

// Function to get all links
export function getAllLinks() {
  return links;
}

// Function to add a new link
export function addLink(link: Omit<Link, "id" | "createdAt" | "clicks">) {
  const newLink: Link = {
    ...link,
    id: (links.length + 1).toString(),
    createdAt: new Date(),
    clicks: 0,
  };

  links.push(newLink);
  return newLink;
}

// Function to find a category by slug
export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

// Function to get all categories
export function getAllCategories() {
  return categories;
}

// Function to add a new category
export function addCategory(category: Omit<Category, "id">) {
  const slug = category.slug || category.name.toLowerCase().replace(/\s+/g, "-");

  // Check if category with this slug already exists
  if (categories.some((c) => c.slug === slug)) {
    throw new Error("Uma categoria com este nome já existe");
  }

  const newCategory: Category = {
    ...category,
    id: (categories.length + 1).toString(),
    slug,
  };

  categories.push(newCategory);
  return newCategory;
}

// Function to track link clicks (for monetization analytics)
export function trackLinkClick(linkId: string) {
  const link = links.find((link) => link.id === linkId);

  if (link) {
    link.clicks = (link.clicks || 0) + 1;
    return link.clicks;
  }

  return 0;
}

// Function to get most clicked links (for highlighting popular content)
export function getMostClickedLinks(limit = 5) {
  return [...links]
    .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
    .slice(0, limit);
}
