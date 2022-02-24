import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CountriesService } from './countries.service';
import { Country } from './entities/country.entity';

@Resolver(() => Country)
export class CountriesResolver {
  constructor(private readonly countriesService: CountriesService) {}

  @Query(() => [Country], { name: 'searchCountries' })
  @UseGuards(JwtAuthGuard)
  findByNameStart(
    @Args('searchText', { type: () => String, nullable: true })
    searchText: string,
  ) {
    return this.countriesService.findByNameStart(searchText);
  }

  @Query(() => [Country], { name: 'allCountries' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.countriesService.getAllCountries();
  }
}
