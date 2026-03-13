import { HttpClientOptions } from "@/configs/api/http-client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export function useProfiles(
  requestFn: (options?: HttpClientOptions<Profile>) => Promise<Profile[]>,
  options?: HttpClientOptions<Profile>,
) {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: () => requestFn(options),
  });
}

export function useSuspenseProfiles(
  requestFn: (options?: HttpClientOptions<Profile>) => Promise<Profile[]>,
  options?: HttpClientOptions<Profile>,
) {
  return useSuspenseQuery({
    queryKey: ["profiles"],
    queryFn: () => requestFn(options),
  });
}

export function useProfile(
  userId: number,
  requestFn: (
    userId: number,
    options?: HttpClientOptions<Profile>,
  ) => Promise<Profile>,
  options?: HttpClientOptions<Profile>,
) {
  return useQuery({
    queryKey: ["profiles", userId],
    queryFn: () => requestFn(userId, options),
    enabled: !!userId,
  });
}
