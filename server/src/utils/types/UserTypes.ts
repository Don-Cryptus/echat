import { User } from '../../entity/User';
import { InputType, Field, ObjectType, Int } from 'type-graphql';

@InputType()
export class EmailUsernamePasswordInput {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
export class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
export class UpdatedUser {
  @Field()
  username: string;
  @Field()
  description: string;
  @Field()
  age: Date;
  @Field()
  gender: string;
  @Field()
  discord: string;
  @Field()
  twitter: string;
  @Field()
  facebook: string;
  @Field()
  snapchat: string;
  @Field()
  instagram: string;
  @Field()
  twitch: string;
  @Field()
  steam: string;
  @Field()
  tiktok: string;
  @Field(() => Int)
  countryId: number;
  @Field(() => [ListValues])
  languages: ListValues[];
  @Field(() => [ScheduleValues])
  schedules: ScheduleValues[];
}
// { id: 7, name: 'Sunday', from: 0, to: 23, available: false },
@InputType()
export class ListValues {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}

@InputType()
export class ScheduleValues {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  from: Date;

  @Field()
  to: Date;

  @Field()
  available: boolean;
}
