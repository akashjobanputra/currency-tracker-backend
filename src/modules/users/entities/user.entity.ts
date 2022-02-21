import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Country } from '../../countries/entities/country.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  password: string;

  @Field(() => [Country])
  watchList?: Country[];
}
