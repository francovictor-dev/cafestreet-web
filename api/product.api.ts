import { httpClient, HttpClientOptions } from "@/configs/api/http-client";

export function getProducts(options?: HttpClientOptions<Product>) {
  return httpClient("product", options).list();
}

export function getProduct(id: number, options?: HttpClientOptions<Product>) {
  return httpClient("product", { ...options, params: { id } }).single();
}

export function createProduct(
  body: CreateProductType,
  options?: HttpClientOptions<Product>,
) {
  return httpClient("product", {
    ...options,
    method: "POST",
    body: JSON.stringify(body),
  }).single();
}

export function updateProduct(
  data: UpdateProductType,
  options?: HttpClientOptions<Product>,
) {
  const { id, ...body } = data;
  return httpClient("product", {
    ...options,
    method: "PUT",
    params: { id },
    body: JSON.stringify(body),
  }).single();
}

export function deleteProduct(
  id: number,
  options?: HttpClientOptions<Product>,
) {
  return httpClient("product", {
    ...options,
    method: "DELETE",
    params: { id },
  }).single();
}
