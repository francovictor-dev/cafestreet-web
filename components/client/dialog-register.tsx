"use client";

import { createClient } from "@/api/auth.api";
import {
  RegisterClientFormData,
  registerClientSchema,
} from "@/schemas/register-client";
import { dialog } from "@/services/dialog";
import { loading } from "@/services/screen-loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Input } from "../ui/input";

export default function DialogRegisterClient() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterClientFormData>({
    resolver: zodResolver(registerClientSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordRepeat: "",
    },
  });

  const onSubmit = async (data: RegisterClientFormData) => {
    loading.show("Registrando...");
    try {
      await createClient(data);
      dialog.close();
      toast.success("Criado com sucesso!");
    } catch (e) {
      console.error(e);
      toast.error("Erro no registro");
    } finally {
      loading.close();
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Fomulário de registro</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="text"
                placeholder="email@gmail.com"
                error={errors.email}
                {...register("email")}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="name">Nome</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder=""
                error={errors.name}
                {...register("name")}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder=""
                error={errors.password}
                {...register("password")}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="passwordRepeat">Repita a senha</FieldLabel>
              <Input
                id="passwordRepeat"
                type="password"
                placeholder=""
                error={errors.passwordRepeat}
                {...register("passwordRepeat")}
              />
            </Field>
          </FieldGroup>
        </FieldSet>
        <DialogFooter className="mt-4">
          <Button disabled={isSubmitting}>
            <Save /> Registrar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
