import { Injectable } from '@nestjs/common';
import { ExchangeRateApiService } from './exchange-rate-api.service';

@Injectable()
export class CurrenciesService {
  private exchangeRates = {};
  constructor(readonly exchangeRateApiService: ExchangeRateApiService) {
    this.loadExchangeRates();
  }

  async loadExchangeRates() {
    this.exchangeRates = await this.exchangeRateApiService.fetchRelatedTo(
      'SEK',
    );
  }

  findOne(curr: string) {
    return this.exchangeRates[curr];
  }
}
