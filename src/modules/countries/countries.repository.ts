import { Injectable } from '@nestjs/common';
import { Country } from './entities/country.entity';

@Injectable()
export class CountriesRespository {
  // We're not using any db level persistence so storing as array here.
  // Ideally we'd use a db layer with TypeORM.
  private readonly countries: Country[] = [];

  setCountries(countries: Country[]) {
    this.countries.length = 0;
    this.countries.push(...countries);
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

  findByCountryCommonName(countryCommonName: string) {
    const matching = this.countries.find(
      (country) =>
        country.name.common.toLowerCase() === countryCommonName.toLowerCase(),
    );
    return matching;
  }
}
