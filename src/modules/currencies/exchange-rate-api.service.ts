import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { configService } from '../../config/config.service';

@Injectable()
export class ExchangeRateApiService {
  constructor(private httpService: HttpService) {}

  private get BASE_URL() {
    return 'http://data.fixer.io/api';
  }

  async fetchLatest(): Promise<FixerResponse> {
    const url = `${this.BASE_URL}/latest`;
    const result = await lastValueFrom(
      this.httpService.get(url, {
        params: { access_key: configService.fixerAccessKey },
      }),
    );
    return result?.data;
  }

  async fetchRelatedTo(base = 'SEK') {
    const apiResponse = await this.fetchLatest();
    const multiplier = 1 / apiResponse.rates[base];
    const ratesAsPerNewBase = {};
    for (const cur in apiResponse.rates) {
      ratesAsPerNewBase[cur] = apiResponse.rates[cur] * multiplier;
    }
    return ratesAsPerNewBase;
  }
}

type FixerResponse = {
  success: boolean;
  timestamp: number;
  base: string; // EUR
  date: string; // YYYY-MM-DD
  rates: Record<string, number>;
};
