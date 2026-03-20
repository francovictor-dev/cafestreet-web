type ResourceResult<T> = {
  single: T;
  list: T[];
};

type Tables = {
  public: {
    user: User;
    profile: Profile;
    product: Product;
    "auth/login": ResponseLogin;
    me: User;
  };
};

type ApiServer = {
  server: {
    "login-admin": ResponseLogin;
    "login-client": ResponseLogin;
    logout: never;
    "verify-account": never;
  };
};

type TablesText = keyof Tables["public"];
type ApiServerText = keyof ApiServer["server"];

type HttpClientParams<T> = {
  table: T;
  mode?: keyof Tables["public"][TablesText];
  options?: HttpClientOptions;
};

type QueryBuilder<T> = {
  list(): Promise<T[]>; //["then"]; // permite await direto
  single(): Promise<T>;
};

/* type WhereFilter<T> = {
  [K in typeof T]: `${K & string}.`;
}[keyof T]; */

type ValueByType<T> = T extends boolean
  ? "true" | "false"
  : T extends number
    ? `${number}`
    : T extends string
      ? T | `${string}`
      : never;

/* type WhereFilter<T> = {
  [K in keyof T]:
  `${K & string}.${WhereOperation}.${T[K] & string}`
  }[keyof T]; */

/* type WhereFilter<T> = 
  `${keyof T}.${WhereOperation}`;
  */

type WhereOperation = "eq" | "like" | "in" | "lt" | "lte" | "gt" | "gte";
type WhereFilter<T> = {
  [K in keyof T]?: Partial<Record<WhereOperation, string>>;
};

type ParamsQuery = {
  relations?: string;
  select?: string;
  //where?: WhereFilter<T>;
  id?: number;
};
