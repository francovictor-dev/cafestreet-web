"use client";

import { createProduct } from "@/api/product.api";
import { useCreateProduct } from "@/hooks/api/use-products";
import { useDebounce } from "@/hooks/use-debounce";
import {
  CreateProductFormData,
  createProductSchema,
} from "@/schemas/create-product.schema";
import { dialog } from "@/services/dialog";
import { loading } from "@/services/screen-loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
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
import { Textarea } from "../ui/textarea";

export function DialogAddForm() {
  const { mutateAsync } = useCreateProduct(createProduct);
  const {
    watch,
    getValues,
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      amount: 1,
      photoUrl: "",
    },
  });
  const photoUrl = useDebounce(watch("photoUrl"));

  const [isValidImage, setIsValidImage] = useState(false);

  const handleValidImage = useCallback(async () => {
    if (!photoUrl || photoUrl.length == 0) return false;
    const res = await fetch(photoUrl);
    setIsValidImage(res.ok);
  }, [photoUrl]);

  const onSubmit = async (data: CreateProductFormData) => {
    loading.show("Criando produto...");
    try {
      await mutateAsync(data);
      dialog.close();
      toast.success("Criado com sucesso!");
    } catch (e) {
      toast.error("Erro na criação do produto");
      console.error(e);
    } finally {
      loading.close();
    }
  };

  useEffect(() => {
    handleValidImage();
  }, [handleValidImage]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Fomulário de criação</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nome</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Nome do produto"
                error={errors.name}
                {...register("name")}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="photoUrl">Imagem</FieldLabel>
              <Input
                id="photoUrl"
                type="text"
                placeholder="Link URL de imagem"
                error={errors.photoUrl}
                {...register("photoUrl")}
              />
              {isValidImage && (
                <Image
                  src={getValues("photoUrl")}
                  alt="Imagem"
                  height={100}
                  width={100}
                  style={{
                    width: 100,
                    height: 100,
                    alignSelf: "center",
                    borderRadius: 16,
                  }}
                />
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="amount">Preço</FieldLabel>
              <Controller
                control={control}
                name="amount"
                render={({ field }) => (
                  <NumericFormat
                    //{...field}
                    placeholder="R$ 1,00"
                    customInput={Input}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="R$ "
                    decimalScale={2}
                    fixedDecimalScale
                    onValueChange={({ floatValue }) => {
                      field.onChange(floatValue ?? 0);
                    }}
                    error={errors.amount}
                    value={field.value}
                    onBlur={field.onBlur}
                  />
                )}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="photoUrl">Descrição</FieldLabel>
              <Textarea
                id="description"
                placeholder="..."
                error={errors.description}
                rows={3}
                {...register("description")}
              />
            </Field>
          </FieldGroup>
        </FieldSet>
        <DialogFooter className="mt-4">
          <Button disabled={isSubmitting || !isValidImage}>
            <Save /> Criar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
