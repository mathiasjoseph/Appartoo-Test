import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersRepository } from '../repositories/users.repository';
import { WhoAmIType } from '../dto/types/user.type';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators';
import { IUser } from '@pangolin/types';
import { ProfileInput } from '../dto/inputs/profile.input';

@Resolver()
export class ProfileResolver {
  constructor(private usersRepository: UsersRepository) {}

  @Mutation(() => WhoAmIType)
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @CurrentUser() user: IUser,
    @Args('profile') profile: ProfileInput
  ): Promise<WhoAmIType> {
    return this.usersRepository.update(user.id, profile);
  }
}
