import { HttpClientOptions } from "@/configs/api/http-client";
import { useQuery } from "@tanstack/react-query";

export function useMe(
  requestFn: (options?: HttpClientOptions<User>) => Promise<User>,
  options?: HttpClientOptions<User>,
) {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => requestFn(options),
    enabled: options?.enabled ?? true,
  });
}
