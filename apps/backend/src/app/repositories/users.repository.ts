import { FilterQuery } from 'mongoose';
import { IUserDocument, UserModel } from '../models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser, IUserFilter } from '@pangolin/types';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel('User') private userModel) {}

  async findOneByEmail(email: string): Promise<IUserDocument> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async findOneById(id: string): Promise<IUserDocument> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async search(text: string): Promise<IUserDocument[]> {
    const regex = new RegExp(text, 'i');
    return this.userModel
      .find({
        $and: [{ $or: [{ username: regex }, { email: regex }] }],
      })
      .exec();
  }

  async createOne(newUser: IUser): Promise<IUserDocument> {
    const created = new this.userModel(newUser);
    return created.save();
  }

  async update(
    id: string,
    partialUser: Partial<IUser>
  ): Promise<IUserDocument> {
    return this.userModel
      .findOneAndUpdate(
        { _id: id },
        { $set: partialUser },
        { new: true, upsert: true }
      )
      .exec();
  }

  findAll(): Promise<IUserDocument[]> {
    return this.userModel.find().select('-password').exec();
  }

  tranformFilter(filter: IUserFilter): FilterQuery<IUserDocument> {
    return {};
  }
}
