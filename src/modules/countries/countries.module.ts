import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesResolver } from './countries.resolver';
import { CountriesAPIService } from './countries-api.service';
import { HttpModule } from '@nestjs/axios';
import { CurrenciesModule } from '../currencies/currencies.module';
import { CountriesRespository } from './countries.repository';

@Module({
  providers: [
    CountriesResolver,
    CountriesService,
    CountriesAPIService,
    CountriesRespository,
  ],
  imports: [HttpModule, CurrenciesModule],
  exports: [CountriesService],
})
export class CountriesModule {}
