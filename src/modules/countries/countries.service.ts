import { Injectable } from '@nestjs/common';
import { CurrenciesService } from '../currencies/currencies.service';
import { CountriesAPIService } from './countries-api.service';
import { CountriesRespository } from './countries.repository';

@Injectable()
export class CountriesService {
  constructor(
    private readonly countriesApiService: CountriesAPIService,
    private readonly currencyService: CurrenciesService,
    private readonly countriesRespository: CountriesRespository,
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
    this.countriesRespository.setCountries(allCountries);
  }

  getAllCountries() {
    return this.countriesRespository.getAllCountries();
  }

  findByNameStart(name: string) {
    return this.countriesRespository.findByNameStart(name);
  }

  findByCountryCommonName(countryCommonName: string) {
    return this.countriesRespository.findByCountryCommonName(countryCommonName);
  }
}
