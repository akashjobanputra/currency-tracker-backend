import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class Currency {
  @Field()
  abbr: string;

  @Field()
  name: string;

  @Field()
  symbol: string;

  @Field(() => Float)
  exchangeRate?: number;
}
