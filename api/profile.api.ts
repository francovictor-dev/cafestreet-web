import { httpClient, HttpClientOptions } from "@/configs/api/http-client";

/* type CRUDFunctionsType<T> = {
  getProfiles: (options?: HttpClientOptions) => Promise<T[]>;
  getProfile: (id: number, options?: HttpClientOptions) => Promise<T>;
} */

export function getProfiles(options?: HttpClientOptions<Profile>) {
  return httpClient("profile", options).list();
  //está retornando Profile, deveria Profile[]
}

export function getProfile(id: number, options?: HttpClientOptions<Profile>) {
  return httpClient("profile", { ...options, params: { id } }).single();
  //ou return httpClient(`profile/${id}`);
}

export function createProfile(data: CreateProfileType) {
  return httpClient("profile", {
    method: "POST",
    body: JSON.stringify(data),
  }).single();
}
