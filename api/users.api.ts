import { httpClient, HttpClientOptions } from "@/configs/api/http-client";

export function getUsers(options?: HttpClientOptions<User>) {
  return httpClient("user", options).list();
}

export function getUser(id: number, options?: HttpClientOptions<User>) {
  return httpClient("user", { ...options, params: { id } }).single();
}

export function getMe(options?: HttpClientOptions<User>) {
  return httpClient("me", options).single();
}
