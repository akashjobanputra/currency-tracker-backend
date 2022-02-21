import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class CountryName {
  @Field()
  common: string;

  @Field()
  official: string;
}

@ObjectType()
class Currency {
  @Field()
  abbr: string;

  @Field()
  name: string;

  @Field()
  symbol: string;
}

@ObjectType()
export class Country {
  @Field(() => CountryName)
  name: CountryName;

  @Field(() => [Currency])
  currencies: Currency[];

  @Field()
  population: number;
}
