import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { CountriesModule } from '../countries/countries.module';

@Module({
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
  imports: [CountriesModule],
})
export class UsersModule {}
