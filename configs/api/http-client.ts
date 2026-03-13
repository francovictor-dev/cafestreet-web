export class HttpError extends Error {
  constructor(
    public status: number,
    public data?: unknown,
  ) {
    super(`HTTP Error ${status}`);
  }
}

/* export interface HttpClientOptions extends RequestInit {
  params?: Record<string, string | string[] | number | boolean | undefined>;
} */

export interface HttpClientOptions<T> extends RequestInit {
  params?: ParamsQuery;
  enabled?: boolean;
  where?: WhereFilter<T>;
}

async function fetchTable<T>(
  table: string,
  options: HttpClientOptions<T> = {},
): Promise<T> {
  const { params, headers, where, ...rest } = options;

  let filter = "";
  let paramsQuery = "";
  const query = [];

  if (params) {
    paramsQuery = new URLSearchParams(
      Object.entries(params ?? "")
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)]),
    ).toString();

    query.push(paramsQuery);
  }

  if (!!where) {
    const entries = Object.entries(where as never);
    const [field, ops] = entries[0];
    const [op, value] = Object.entries(ops as never)[0];

    filter = `where=${field}.${op}.${value}`;
    query.push(filter);
  }

  if (query.length > 0) query.unshift("?");

  /*  const query = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params ?? "")
          .filter(([, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)]),
      ).toString()
    : ""; */

  const response = await fetch(
    `http://localhost:3001/${table}${query.join("&")}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      credentials: "include",
      ...rest,
    },
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new HttpError(response.status, data);
  }

  return data as T;
}

export function httpClient<T extends TablesText>(
  table: T,
  options: HttpClientOptions<Tables["public"][T]> = {},
): QueryBuilder<Tables["public"][T]> {
  //const runList = () => fetchTable<Tables["public"][T][]>(table, options);

  return {
    // permite: await httpClient("profile")
    async list() {
      //return runList().then.bind(runList())
      const data = await fetchTable<Tables["public"][T][]>(
        `${table}`,
        options as never,
      );

      if (!data) {
        throw new Error("Registros não encontrados");
      }

      return data;
    },

    async single() {
      const data = await fetchTable<Tables["public"][T]>(
        `${table}/${!!options.params?.id ? options.params?.id : ""}`,
        {
          ...options,
          params: {
            ...options.params,
          },
        },
      );

      if (!data) {
        throw new Error("Registro não encontrado");
      }

      return data;
    },
  };
}

/* export async function httpClient<T extends TablesText>(
    table: T,
    options: HttpClientOptions = {},
): Promise<Tables['public'][T]> {
  const { params, headers, ...rest } = options;

  const query = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params)
          .filter(([, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)]),
      ).toString()
    : "";

  const response = await fetch(
    //`${process.env.NEXT_PUBLIC_API_URL}${url}${query}`,
    `http://localhost:3001/${table}${query}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      credentials: "include",
      ...rest,
    },
  );

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new HttpError(response.status, data);
  }

  return data as Tables['public'][T]
}
 */
