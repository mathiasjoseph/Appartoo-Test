export interface IUser {
  id?: string;
  username: string;
  password?: string;
  email: string;
  age?: number;
  family?: string;
  race?: string;
  food?: string;
  team?: string;
  firstname?: string;
  friendIds?: string[];
  friendRequests?: string[];
  friendRequestSubmissions?: string[];
  twitter?: string;
  facebook?: string;
}

export type IProfile = Pick<
  IUser,
  | 'age'
  | 'family'
  | 'race'
  | 'firstname'
  | 'food'
  | 'team'
  | 'twitter'
  | 'facebook'
>;

export interface IUserFilter {
  username: string;
}
