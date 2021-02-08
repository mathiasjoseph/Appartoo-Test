import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '../services';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { IUser } from '@pangolin/types';
import { LoginType } from '../dto/types/login.type';
import { LoginInput } from '../dto/inputs/login.input';
import { CurrentUser } from '../decorators';
import { WhoAmIType } from '../dto/types/user.type';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginType)
  async login(@Args('payload') payload: LoginInput): Promise<LoginType> {
    const result = await this.authService.validateUserByPassword(payload);
    if (result) return result;
    throw new UnauthorizedException(
      'Could not log-in with the provided credentials'
    );
  }
  @Query(() => String)
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Context('req') request: any): Promise<string> {
    const user: IUser = request.user;
    if (!user)
      throw new UnauthorizedException(
        'Could not log-in with the provided credentials'
      );
    const result = await this.authService.createJwt(user);
    if (result) return result.token;
    throw new UnauthorizedException(
      'Could not log-in with the provided credentials'
    );
  }

  @Query(() => WhoAmIType)
  @UseGuards(JwtAuthGuard)
  async whoAmI(@CurrentUser() user: IUser): Promise<WhoAmIType> {
    return user;
  }
}
