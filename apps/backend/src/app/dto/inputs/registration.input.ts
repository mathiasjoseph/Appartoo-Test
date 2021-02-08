import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
  @Field((type) => String)
  email: string;
  @Field((type) => String)
  username: string;
  @Field((type) => String)
  password: string;
  @Field((type) => Number)
  age: number;
  @Field((type) => String)
  firstname: string;
}
