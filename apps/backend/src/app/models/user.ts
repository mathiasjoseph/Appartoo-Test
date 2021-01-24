import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { IUserDocument, IUserModel } from '../interfaces/user.interface';

const userSchema: Schema<IUserDocument, IUserModel> = new mongoose.Schema({
  email: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  friends: {
    type: [String],
    required: false,
    default: []
  },
  firstname: {
    type: String,
    required: false
  },
  team: {
    type: String,
    required: false
  },
  food: {
    type: String,
    required: false
  },
  race: {
    type: String,
    required: false
  },
  family: {
    type: String,
    required: false
  },
  age: {
    type: Number,
    required: false
  },
  twitter: {
    type: String,
    required: false
  },
  facebook: {
    type: String,
    required: false
  }
});

export const UserModel = mongoose.model<IUserDocument, IUserModel>('User', userSchema);
