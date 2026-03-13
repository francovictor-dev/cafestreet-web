import { HttpClientOptions } from "@/configs/api/http-client";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export function useProducts(
  requestFn: (options?: HttpClientOptions<Product>) => Promise<Product[]>,
  options?: HttpClientOptions<Product>,
) {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => requestFn(options),
  });
}

export function useSuspenseProducts(
  requestFn: (options?: HttpClientOptions<Product>) => Promise<Product[]>,
  options?: HttpClientOptions<Product>,
) {
  return useSuspenseQuery({
    queryKey: ["products"],
    queryFn: () => requestFn(options),
  });
}

export function useCreateProduct(
  requestFn: (body: CreateProductType) => Promise<Product>,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requestFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}

export function useUpdateProduct(
  requestFn: (data: UpdateProductType) => Promise<Product>,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requestFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}

export function useDeleteProduct(requestFn: (id: number) => Promise<Product>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requestFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}
