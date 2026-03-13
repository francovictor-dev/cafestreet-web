type Address = {
  id: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  complement: string;
  latitude: number;
  longitude: number;
  updatedAt: Date;
  profile?: Profile;
} & DateTypes;
