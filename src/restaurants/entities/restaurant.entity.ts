import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Restaurant {
  @Field(type => String)
  name: string;

    // can be Boolean or Nullable. This is how you create an object type.
  @Field(type => Boolean, { nullable: true })
  isGood?: boolean;

  @Field(type => Boolean)
  isVegan: boolean;

  @Field(type => String)
  address: string;

  @Field(type => String)
  ownersName: string;
}