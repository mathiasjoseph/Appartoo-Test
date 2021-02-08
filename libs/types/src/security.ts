export interface IJwtPayload {
  email: string;
  username: string;
  expiration?: Date;
}

export interface IJwtUserPayload {
  id: string;
  email: string;
  username: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResult {
  user: IJwtUserPayload;
  expiration: any;
  token: string;
}
