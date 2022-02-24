import { Injectable } from '@nestjs/common';
import { CurrenciesService } from '../currencies/currencies.service';
import { CountriesAPIService } from './countries-api.service';
import { Country } from './entities/country.entity';

@Injectable()
export class CountriesService {
  private readonly countries: Country[] = [];

  constructor(
    private readonly countriesApiService: CountriesAPIService,
    private readonly currencyService: CurrenciesService,
  ) {
    this.loadAllCountries();
  }

  private async loadAllCountries() {
    const allCountries = await this.countriesApiService.fetchAll();
    allCountries.forEach((country) => {
      country.currencies.forEach((curr) => {
        curr.exchangeRate = this.currencyService.findOne(curr.abbr);
      });
    });
    this.countries.length = 0;
    this.countries.push(...allCountries);
  }

  getAllCountries() {
    return this.countries;
  }

  findByNameStart(name: string) {
    const matching = this.countries
      .filter((country) =>
        (country.name.common as string)
          .toLowerCase()
          .startsWith(name.toLowerCase()),
      )
      .sort((a, b) => a.name.common.localeCompare(b.name.common));
    return matching;
  }

  findByCountryCode(countryCode: string) {
    const matching = this.countries.find(
      (country) => country.name.common === countryCode,
    );
    return matching;
  }
}
