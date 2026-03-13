import { httpServer } from "@/configs/api/http-server";

export async function signIn({ email, password }: AuthLogin) {
  /*  return httpClient("auth/login", {
    body: JSON.stringify({ email, password }),
    method: "POST",
  }).single(); */
  return httpServer("login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function signOut() {
  return httpServer("logout", {
    method: "POST",
  });
}
