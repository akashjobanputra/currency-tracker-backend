import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { configService } from './config/config.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CountriesModule } from './modules/countries/countries.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: configService.isDev,
      playground: configService.isDev,
      autoSchemaFile: configService.autoSchemaFilePath,
      sortSchema: true,
    }),
    UsersModule,
    AuthModule,
    CountriesModule,
  ],
})
export class AppModule {}
