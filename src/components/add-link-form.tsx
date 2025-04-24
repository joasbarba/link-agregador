"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { categories, addLink } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookmarkIcon, LinkIcon, InfoIcon } from "lucide-react";

export function AddLinkForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check if a category was provided in the URL
  const categoryFromUrl = searchParams.get("category");

  const [formData, setFormData] = useState({
    title: "",
    url: "",
    category: categoryFromUrl || "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "O título é obrigatório";
    }

    if (!formData.url.trim()) {
      newErrors.url = "A URL é obrigatória";
    } else {
      try {
        new URL(formData.url);
      } catch (e) {
        newErrors.url = "URL inválida (inclua http:// ou https://)";
      }
    }

    if (!formData.category) {
      newErrors.category = "Selecione uma categoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      addLink(formData);

      // Redirect to category page
      router.push(`/categoria/${formData.category}`);
      router.refresh(); // Refresh the page to show the new link
    } catch (error) {
      console.error("Erro ao adicionar link:", error);
      setErrors({ form: "Ocorreu um erro ao adicionar o link. Tente novamente." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookmarkIcon className="h-5 w-5 text-blue-600" />
          Adicionar Novo Link
        </CardTitle>
        <CardDescription>
          Compartilhe um link útil com a comunidade
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              Título <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: MDN Web Docs - JavaScript"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">
              URL <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-center space-x-2">
              <LinkIcon className="h-4 w-4 text-gray-500" />
              <Input
                id="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="https://exemplo.com"
                className={errors.url ? "border-red-500" : ""}
              />
            </div>
            {errors.url && (
              <p className="text-sm text-red-500">{errors.url}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">
              Categoria <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.category}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-1">
              Descrição <InfoIcon className="h-3 w-3 text-gray-500" />
            </Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Uma breve descrição do link (opcional)"
            />
          </div>

          {errors.form && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">
              {errors.form}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adicionando..." : "Adicionar Link"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
