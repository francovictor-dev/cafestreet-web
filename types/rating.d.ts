type Rating = {
  id: number;
  message: string;
  star: number;
  product?: Product;
  client?: Client;
} & DateTypes;
