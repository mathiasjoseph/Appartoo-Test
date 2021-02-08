import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../services';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { RegisterInput } from '../dto/inputs/registration.input';
import { UsersRepository } from '../repositories/users.repository';
import { RegisterType } from '../dto/types/registration.type';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators';
import { IUser } from '@pangolin/types';

@Resolver()
export class RegistrationResolver {
  constructor(
    private authService: AuthService,
    private usersRepository: UsersRepository
  ) {}

  @Mutation(() => RegisterType)
  async register(
    @Args('payload') payload: RegisterInput
  ): Promise<RegisterType> {
    const userExist = await this.usersRepository.findOneByEmail(payload.email);
    if (userExist) {
      throw new HttpException(
        'Cette email est déja pris par un autre pangolin',
        HttpStatus.BAD_REQUEST
      );
    }
    const newUser = await this.usersRepository.createOne({
      ...payload,
      password: await this.authService.encode(payload.password),
    });
    return newUser;
  }

  @Mutation(() => RegisterType)
  @UseGuards(JwtAuthGuard)
  async inviteUser(
    @CurrentUser() user: IUser,
    @Args('payload') payload: RegisterInput
  ): Promise<RegisterType> {
    const currentUser = await this.usersRepository.findOneById(user.id);
    const userExist = await this.usersRepository.findOneByEmail(payload.email);
    if (userExist) {
      throw new HttpException(
        'Cette email est déja pris par un autre pangolin',
        HttpStatus.BAD_REQUEST
      );
    }
    const newUser = await this.usersRepository.createOne({
      ...payload,
      password: await this.authService.encode(payload.password),
    });
    newUser.friendRequests.push(user.id);
    await newUser.save();
    currentUser.friendRequestSubmissions.push(user.id);
    await currentUser.save();
    return newUser;
  }
}
