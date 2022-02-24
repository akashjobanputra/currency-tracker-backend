import { BadRequestException, Injectable } from '@nestjs/common';
import { CountriesService } from '../countries/countries.service';
import { Country } from '../countries/entities/country.entity';

import { CreateUserInput } from './dto/create-user.input';

type User = {
  id: number;
  username: string;
  password: string;
  watchList?: string[];
};

type UserResponse = {
  id: number;
  username: string;
  password: string;
  watchList?: Country[];
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'abc@yopmail.com',
      password: '$2b$16$aMCxI4Hv17bwm3SYWdrX3u14MS7.MnI1iGinn3XnAt4A07JNvCHKm',
      watchList: [],
    },
    {
      id: 2,
      username: 'abc2@yopmail.com',
      password: '$2b$16$aMCxI4Hv17bwm3SYWdrX3u14MS7.MnI1iGinn3XnAt4A07JNvCHKm',
      watchList: [],
    },
  ];

  constructor(private countryService: CountriesService) {}

  create(createUserInput: CreateUserInput) {
    const user = {
      ...createUserInput,
      id: this.users.length + 1,
    };

    this.users.push(user);

    return user;
  }

  findAll() {
    return this.users;
  }

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }

  async addCountryToList(
    id: number,
    countryCode: string,
  ): Promise<UserResponse> {
    const user = this.users.find((user) => user.id === id);
    const country = this.countryService.findByCountryCode(countryCode);
    if (!country) {
      throw new BadRequestException(`Invalid Country code: ${countryCode}`);
    }
    if (!user.watchList) {
      user.watchList = [];
    }
    if (user.watchList.length) {
      const alreadyMapped = user.watchList.find((c) => c === countryCode);
      if (alreadyMapped) {
        throw new BadRequestException('Already added');
      }
    }
    user.watchList.push(countryCode);
    return {
      ...user,
      watchList: user.watchList.map((countryCode) =>
        this.countryService.findByCountryCode(countryCode),
      ),
    };
  }

  async getUserWatchList(id: number): Promise<UserResponse> {
    const user = this.users.find((user) => user.id === id);
    return {
      ...user,
      watchList: user.watchList.map((countryCode) =>
        this.countryService.findByCountryCode(countryCode),
      ),
    };
  }
}
