import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegisterType {
  @Field((type) => String)
  email: string;
  @Field((type) => String)
  username: string;
}
