import { httpServer } from "@/configs/api/http-server";

export async function signInAdmin({ email, password }: AuthLogin) {
  return httpServer("login-admin", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function signInClient({ email, password }: AuthLogin) {
  return httpServer("login-client", {
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
