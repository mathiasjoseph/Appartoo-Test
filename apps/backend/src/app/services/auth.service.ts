import { Injectable } from '@nestjs/common';
import {
  IJwtPayload,
  IJwtUserPayload,
  ILoginPayload,
  ILoginResult,
  IUser,
} from '@pangolin/types';
import { IUserDocument } from '../models';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../repositories/users.repository';
import * as bcrypt from 'bcryptjs';
import { jwtConstants } from '../constants';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService
  ) {}

  async validateJwtPayload(
    payload: IJwtPayload
  ): Promise<IUserDocument | undefined> {
    const user = await this.usersRepository.findOneByEmail(payload.email);
    if (user) {
      return user;
    }
    return undefined;
  }

  createJwt(user: IUser): ILoginResult {
    const expiresIn = jwtConstants.expiresIn;
    let expiration: Date | undefined;
    if (expiresIn) {
      expiration = new Date();
      expiration.setTime(expiration.getTime() + expiresIn * 1000);
    }
    const data: IJwtUserPayload = {
      email: user.email,
      username: user.username,
      id: user.id,
    };
    const jwt = this.jwtService.sign(data);
    return {
      user: data,
      expiration,
      token: jwt,
    };
  }

  async validateUserByPassword(
    payload: ILoginPayload
  ): Promise<ILoginResult | undefined> {
    const user = await this.usersRepository.findOneByEmail(payload.email);
    console.log(payload);
    if (!user) {
      return undefined;
    }
    const isMatch = this.verifyPassword(payload.password, user.password);
    if (isMatch) {
      const jtw = this.createJwt(user);
      return {
        user: jtw.user,
        expiration: jtw.expiration,
        token: jtw.token,
      };
    }
    return undefined;
  }

  async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async encode(plainPassword: string) {
    return bcrypt.hashSync(plainPassword, 8);
  }
}
