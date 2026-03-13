"use client";

import { updateProduct } from "@/api/product.api";
import { useUpdateProduct } from "@/hooks/api/use-products";
import { useDebounce } from "@/hooks/use-debounce";
import {
  CreateProductFormData,
  createProductSchema,
} from "@/schemas/create-product.schema";
import { dialog } from "@/services/dialog";
import { loading } from "@/services/screen-loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2 } from "lucide-react";
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

export function DialogEditProductForm(data: Product) {
  const { mutateAsync } = useUpdateProduct(updateProduct);
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
      ...data,
    },
  });

  const photoUrl = useDebounce(watch("photoUrl"));

  const [isValidImage, setIsValidImage] = useState(false);

  const handleValidImage = useCallback(async () => {
    if (!photoUrl || photoUrl.length == 0) return false;
    const res = await fetch(photoUrl);
    setIsValidImage(res.ok);
  }, [photoUrl]);

  const onSubmit = async (formData: CreateProductFormData) => {
    loading.show("Editando produto...");
    try {
      await mutateAsync({ ...formData, id: data.id });
      dialog.close();
      toast.success("Editado com sucesso!");
    } catch (e) {
      toast.error("Erro na edição do produto");
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
        <DialogTitle>Fomulário de edição</DialogTitle>
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
            <Edit2 />
            Editar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
