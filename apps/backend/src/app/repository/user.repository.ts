import { IUserDocument, User } from '../interfaces/user.interface';
import { UserModel } from '../models/user';

export class UserRepository {
  async findOneByUsername(username: string): Promise<IUserDocument> {
    return UserModel.findOne(
      { username: username }
    ).exec();
  }

  async createOne(newUser: User): Promise<IUserDocument> {
    const created = new UserModel(newUser);
    return created.save();
  }

  async findOneByEmail(email: string): Promise<IUserDocument> {
    return UserModel.findOne(
      { email: email }
    ).exec();
  }

  async findOneById(userId: string): Promise<IUserDocument> {
    return UserModel.findOne(
      { _id: userId }
    ).exec();
  }

  async update(id: string, partialUser: Partial<User>): Promise<IUserDocument> {
    console.log(partialUser);
    return UserModel.findOneAndUpdate(
      { _id: id }, { $set: partialUser }, { new: true, upsert: true }
    ).exec();
  }

  async addFriend(userId: string, friendId: string): Promise<IUserDocument> {
    const user = await UserModel.findById(userId);
    if (user) {
      if (!user.friends.includes(friendId)) {
        user.friends.push(friendId);
        await user.save();
      }
    }
    const friend = await UserModel.findById(friendId);
    if (friend) {
      if (!friend.friends.includes(userId)) {
        friend.friends.push(userId);
        await friend.save();
      }
    }
    return user;
  }

  async removeFriend(userId: string, friendId: string): Promise<IUserDocument> {
    const user = await UserModel.findById(userId);
    if (user) {
      if (user.friends.includes(friendId)) {
        user.friends = user.friends.filter(e => e !== friendId);
        await user.save();
      }
    }
    const friend = await UserModel.findById(friendId);
    if (friend) {
      if (friend.friends.includes(userId)) {
        friend.friends = friend.friends.filter(e => e !== userId);
        await friend.save();
      }
    }
    return user;
  }


  findAll(): Promise<IUserDocument[]> {
    return UserModel.find().select('-password').exec();
  }
}
