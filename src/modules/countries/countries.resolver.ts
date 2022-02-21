import { Resolver, Query, Args } from '@nestjs/graphql';
import { CountriesService } from './countries.service';
import { Country } from './entities/country.entity';

@Resolver(() => Country)
export class CountriesResolver {
  constructor(private readonly countriesService: CountriesService) {}

  @Query(() => [Country], { name: 'countries' })
  findAll(
    @Args('name', { type: () => String, nullable: true }) countryName: string,
  ) {
    return this.countriesService.findAll(countryName);
  }
}
