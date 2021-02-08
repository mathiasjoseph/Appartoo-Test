import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WhoAmIType {
  @Field((type) => String)
  id?: string;
  @Field((type) => String)
  email: string;
  @Field((type) => String)
  username: string;
  @Field((type) => [String], { nullable: true })
  friendIds?: string[];
  @Field((type) => [String], { nullable: true })
  friendRequests?: string[];
  @Field((type) => [String], { nullable: true })
  friendRequestSubmissions?: string[];
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

@ObjectType()
export class PublicUserType {
  @Field((type) => String)
  id?: string;
  @Field((type) => String)
  email: string;
  @Field((type) => String)
  username: string;
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
