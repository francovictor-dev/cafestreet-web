type Client = {
  userId: number;
  profile?: Profile;
  //ratings?: Rating[];
  //orders: Order[];
} & DateTypes;

type CreateClientType = {
  userId: number;
};
