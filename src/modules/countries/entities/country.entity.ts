import { ObjectType, Field } from '@nestjs/graphql';
import { Currency } from '../../currencies/entities/currency.entity';

@ObjectType()
class CountryName {
  @Field()
  common: string;

  @Field()
  official: string;
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
