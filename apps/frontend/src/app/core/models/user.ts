// Only Pangolin
export interface User extends Profile {
  username: string;
  password: string;
  friends: string[];
}

export interface Profile {
  email: string;
  age: number;
  family: string;
  race: string;
  firstname: string;
  food: string;
  team: string;
  prenom: string;
  twitter: string;
  facebook: string;
}
