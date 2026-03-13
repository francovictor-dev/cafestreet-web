import { HttpClientOptions } from "@/configs/api/http-client";
import { useQuery } from "@tanstack/react-query";

export function useMe(
  requestFn: (options?: HttpClientOptions) => Promise<User>,
  options?: HttpClientOptions,
) {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => requestFn(options),
    enabled: options?.enabled ?? true,
  });
}
