type User = {
  id: number;
  email: string;
  profile?: Profile;
} & DateTypes;

type CreateUserType = {
  email: string;
  password: string;
};
