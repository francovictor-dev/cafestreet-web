type UserType = "admin" | "client" | "deliveryman";

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

type CreateProfileType = {
  userId?: number;
  userName: string;
  userType: UserType;
};
