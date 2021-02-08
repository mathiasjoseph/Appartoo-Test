import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProfileInput {
  @Field((type) => String, { nullable: true })
  firstname?: string;
  @Field((type) => String, { nullable: true })
  team?: string;
  @Field((type) => String, { nullable: true })
  food?: string;
  @Field((type) => String, { nullable: true })
  race?: string;
  @Field((type) => String, { nullable: true })
  family?: string;
  @Field((type) => Number, { nullable: true })
  age?: number;
  @Field((type) => String, { nullable: true })
  twitter?: string;
  @Field((type) => String, { nullable: true })
  facebook?: string;
}
