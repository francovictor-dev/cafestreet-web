type Product = {
  id: number;
  name: string;
  photoUrl: string;
  amount: number;
  description?: string;
  ratings?: Rating[];
} & DateTypes;

type CreateProductType = Omit<
  Product,
  "id" | "ratings" | "createdAt" | "updatedAt"
>;

type UpdateProductType = Pick<Product, "id"> & Partial<CreateProductType>;
