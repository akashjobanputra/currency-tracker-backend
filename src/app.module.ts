import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';

import { configService } from './config/config.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CountriesModule } from './modules/countries/countries.module';
import { CurrenciesModule } from './modules/currencies/currencies.module';
import { APP_GUARD } from '@nestjs/core';
import { GqlThrottlerGuard } from './modules/guards/gql-throttle.guard';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: configService.isDev,
      playground: configService.isDev,
      autoSchemaFile: configService.autoSchemaFilePath,
      sortSchema: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    UsersModule,
    AuthModule,
    CountriesModule,
    CurrenciesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
  ],
})
export class AppModule {}
