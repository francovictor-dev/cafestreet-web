import { httpClient } from "@/configs/api/http-client";

export function createClient(data: CreateClientType) {
  return httpClient("client", {
    method: "POST",
    body: JSON.stringify(data),
  }).single();
}
