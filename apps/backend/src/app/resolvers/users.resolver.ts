import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PublicUserType, WhoAmIType } from '../dto/types/user.type';
import { UsersRepository } from '../repositories/users.repository';
import { RegisterType } from '../dto/types/registration.type';
import { RegisterInput } from '../dto/inputs/registration.input';
import { CurrentUser } from '../decorators';
import { IUser } from '@pangolin/types';
import { AuthService } from '../services';

@Resolver()
export class UsersResolver {
  constructor(
    private usersRepository: UsersRepository,
    private authService: AuthService
  ) {}

  @Query(() => [PublicUserType])
  @UseGuards(JwtAuthGuard)
  async searchUser(@Args('search') search: string): Promise<PublicUserType[]> {
    if (search) {
      return this.usersRepository.search(search);
    } else {
      return [];
    }
  }

  @Query(() => [PublicUserType])
  @UseGuards(JwtAuthGuard)
  async users(): Promise<PublicUserType[]> {
    return this.usersRepository.findAll();
  }

  @Mutation(() => WhoAmIType)
  @UseGuards(JwtAuthGuard)
  async addFriend(
    @CurrentUser() user: IUser,
    @Args('friendId') friendId: string
  ): Promise<WhoAmIType> {
    const currentUser = await this.usersRepository.findOneById(user.id);
    const friend = await this.usersRepository.findOneById(friendId);
    if (!friend) {
      throw new HttpException('pangolin introuvable', HttpStatus.BAD_REQUEST);
    }
    if (
      !currentUser.friendIds.includes(friendId) &&
      !currentUser.friendRequestSubmissions.includes(friendId) &&
      !friend.friendRequests.includes(user.id)
    ) {
      currentUser.friendRequestSubmissions.push(friendId);
      friend.friendRequests.push(currentUser.id);
      await friend.save();
      await currentUser.save();
    }
    return currentUser;
  }

  @Mutation(() => WhoAmIType)
  @UseGuards(JwtAuthGuard)
  async acceptFriend(
    @CurrentUser() user: IUser,
    @Args('friendId') friendId: string
  ): Promise<WhoAmIType> {
    const currentUser = await this.usersRepository.findOneById(user.id);
    const friend = await this.usersRepository.findOneById(friendId);
    if (!friend) {
      throw new HttpException('pangolin introuvable', HttpStatus.BAD_REQUEST);
    }
    if (
      !currentUser.friendIds.includes(friendId) &&
      currentUser.friendRequests.includes(friendId)
    ) {
      currentUser.friendRequests = currentUser.friendRequests.filter(
        (v) => v !== friendId
      );
      friend.friendRequestSubmissions = friend.friendRequestSubmissions.filter(
        (v) => v !== currentUser.id
      );
      console.log(currentUser);
      console.log(friend);
      currentUser.friendIds.push(friendId);
      friend.friendIds.push(currentUser.id);
      await friend.save();
      await currentUser.save();
    }
    return currentUser;
  }

  @Mutation(() => WhoAmIType)
  @UseGuards(JwtAuthGuard)
  async removeFriend(
    @CurrentUser() user: IUser,
    @Args('friendId') friendId: string
  ): Promise<WhoAmIType> {
    const currentUser = await this.usersRepository.findOneById(user.id);
    const friend = await this.usersRepository.findOneById(friendId);
    if (!friend) {
      throw new HttpException('pangolin introuvable', HttpStatus.BAD_REQUEST);
    }
    currentUser.friendIds = currentUser.friendIds.filter((v) => v !== friendId);
    currentUser.friendRequestSubmissions = currentUser.friendRequestSubmissions.filter(
      (v) => v !== friendId
    );
    currentUser.friendRequests = currentUser.friendRequests.filter(
      (v) => v !== friendId
    );
    friend.friendIds = friend.friendIds.filter((v) => v !== currentUser.id);
    friend.friendRequestSubmissions = friend.friendRequestSubmissions.filter(
      (v) => v !== currentUser.id
    );
    friend.friendRequests = friend.friendRequests.filter(
      (v) => v !== currentUser.id
    );
    await friend.save();
    await currentUser.save();
    return currentUser;
  }
}
