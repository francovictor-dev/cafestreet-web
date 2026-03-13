import { z } from "zod";

export const createProductSchema = z.object({
  amount: z.number().min(1, "Não pode ser 0"),
  name: z.string().min(1, "Escreva o nome"),
  photoUrl: z.string().min(1, "Coloque a imagem"),
  description: z.string().optional(),
});

export type CreateProductFormData = z.infer<typeof createProductSchema>;
