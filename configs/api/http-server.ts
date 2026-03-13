import { HttpError } from "./http-client";

export async function httpServer<T extends ApiServerText>(
  endpoint: T,
  options?: RequestInit,
): Promise<ApiServer["server"][T]> {
  let data: unknown;
  try {
    const response = await fetch(`http://localhost:3000/api/${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    data = await response.json();
    if (!response.ok) {
      const { error } = data as ErrorType;

      throw new HttpError(
        response.status,
        typeof error?.data?.message == "string"
          ? error?.data?.message
          : (error?.data?.message?.join(", ") ?? "error"),
      );
    }
    return data as ApiServer["server"][T];
  } catch (e) {
    data = null;
    if (e instanceof HttpError) {
      throw e;
    }
    throw new Error(e instanceof Error ? e.message : String(e));
  }
}
