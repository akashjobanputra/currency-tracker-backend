import { Injectable } from '@nestjs/common';

import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      username: 'abc@yopmail.com',
      password: '$2b$16$aMCxI4Hv17bwm3SYWdrX3u14MS7.MnI1iGinn3XnAt4A07JNvCHKm',
    },
    {
      id: 2,
      username: 'abc2@yopmail.com',
      password: '$2b$16$aMCxI4Hv17bwm3SYWdrX3u14MS7.MnI1iGinn3XnAt4A07JNvCHKm',
    },
  ];

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
}
