"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addCategory } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FolderPlusIcon } from "lucide-react";

export function AddCategoryForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "O nome da categoria é obrigatório";
    }

    if (formData.slug && !/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = "O slug deve conter apenas letras minúsculas, números e hífens";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-generate slug based on name
    if (name === "name") {
      const slug = value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      addCategory(formData);

      // Redirect to categories page
      router.push("/categorias");
      router.refresh(); // Refresh the page to show the new category
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
      if (error instanceof Error) {
        setErrors({ form: error.message });
      } else {
        setErrors({ form: "Ocorreu um erro ao adicionar a categoria. Tente novamente." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FolderPlusIcon className="h-5 w-5 text-blue-600" />
          Adicionar Nova Categoria
        </CardTitle>
        <CardDescription>
          Crie uma nova categoria para organizar seus links
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Nome da Categoria <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: Marketing Digital"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">
              Slug (URL)
            </Label>
            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="Ex: marketing-digital"
              className={errors.slug ? "border-red-500" : ""}
            />
            <p className="text-xs text-gray-500">
              O slug será usado na URL. Se não for fornecido, será gerado automaticamente.
            </p>
            {errors.slug && (
              <p className="text-sm text-red-500">{errors.slug}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Descrição
            </Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Uma breve descrição da categoria"
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
            {isSubmitting ? "Adicionando..." : "Adicionar Categoria"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
