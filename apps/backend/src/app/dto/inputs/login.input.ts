import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field((type) => String)
  email: string;
  @Field((type) => String)
  password: string;
}
