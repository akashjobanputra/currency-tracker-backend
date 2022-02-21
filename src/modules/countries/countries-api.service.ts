import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { pick } from 'lodash';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CountriesAPIService {
  constructor(private readonly httpService: HttpService) {}

  private get BASE_URL() {
    return 'https://restcountries.com/v3.1';
  }

  async fetchAll() {
    const url = `${this.BASE_URL}/all`;
    const result = await lastValueFrom(this.httpService.get(url));
    return this.pickKeys(result?.data);
  }

  private pickKeys(countries: any[]): any[] | null {
    if (!countries) {
      return null;
    }

    return countries.map((country) => {
      const trimmedCountry = pick(country, [
        'name.common',
        'name.official',
        'population',
      ]);
      trimmedCountry['currencies'] = [];
      for (const currency in country.currencies) {
        trimmedCountry['currencies'].push({
          abbr: currency,
          name: country.currencies[currency].name,
          symbol: country.currencies[currency].symbol,
        });
      }
      return trimmedCountry;
    });
  }
}
