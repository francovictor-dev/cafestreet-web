enum UserType {
  ADMIN = "admin",
  CLIENT = "client",
  DELIVERYMAN = "deliveryman",
}

type Profile = {
  userId: number;
  userName: string;
  userType: UserType;
  user?: User;
  client?: Client;
  deliveryman?: Deliveryman;
  admin?: Admin;
  addresses?: Address[];
} & DateTypes;
