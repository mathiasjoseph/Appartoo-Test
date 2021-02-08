import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class UserPayloadType {
  @Field()
  @IsString()
  id: string;

  @Field()
  @IsString()
  email: string;

  @Field()
  @IsString()
  username: string;
}

@ObjectType()
export class LoginType {
  @Field(() => UserPayloadType)
  user: UserPayloadType;

  @Field()
  @IsString()
  token: string;
}
