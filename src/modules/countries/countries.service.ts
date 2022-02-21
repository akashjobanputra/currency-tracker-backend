import { Injectable, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CountriesAPIService } from './countries-api.service';

@Injectable()
export class CountriesService {
  private readonly countries = [];

  constructor(private readonly countriesApiService: CountriesAPIService) {
    this.loadAllCountries();
  }

  private async loadAllCountries() {
    const allCountries = await this.countriesApiService.fetchAll();
    this.countries.length = 0;
    this.countries.push(...allCountries);
  }

  @UseGuards(JwtAuthGuard)
  findAll(name: string) {
    const matching = this.countries
      .filter((country) =>
        (country.name.common as string)
          .toLowerCase()
          .startsWith(name.toLowerCase()),
      )
      .sort((a, b) => a.name.common.localeCompare(b.name.common));
    return matching;
  }
}
