import { z } from "zod";

export const registerClientSchema = z
  .object({
    email: z.email({ error: "Email inválido" }),
    name: z.string("Campo obrigatório").min(3, "Mínimo de 3 caracteres"),
    password: z.string("Campo obrigatório").min(8, "Mínimo de 8 caracteres"),
    passwordRepeat: z
      .string("Campo obrigatório")
      .min(8, "Mínimo de 8 caracteres"),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "As senhas não coincidem",
    path: ["passwordRepeat"], // mostra o erro no campo de confirmação
  });

export type RegisterClientFormData = z.infer<typeof registerClientSchema>;
