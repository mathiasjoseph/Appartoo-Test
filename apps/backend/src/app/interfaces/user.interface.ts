// Only Pangolin
import * as mongoose from 'mongoose';

export class User {
  id?: string;
  username: string;
  password: string;
  email: string;
  age?: number;
  family?: string;
  race?: string;
  food?: string;
  team?: string;
  firstname?: string;
  friends?: string[];
  twitter?: string;
  facebook?: string;
}

export interface IUserDocument extends mongoose.Document, User {
  id?: string;
}

export interface IUserModel extends mongoose.Model<IUserDocument> {
  // build(attr: IUser): TodoDoc @TODO
}
