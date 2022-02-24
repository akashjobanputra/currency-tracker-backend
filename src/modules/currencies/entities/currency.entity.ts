import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class Currency {
  @Field()
  abbr: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  symbol?: string;

  @Field(() => Float, { nullable: true })
  exchangeRate?: number;
}
