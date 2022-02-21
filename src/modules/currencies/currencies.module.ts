import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { ExchangeRateApiService } from './exchange-rate-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [CurrenciesService, ExchangeRateApiService],
  imports: [HttpModule],
  exports: [CurrenciesService],
})
export class CurrenciesModule {}
