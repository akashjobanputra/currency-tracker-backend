import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { LoginInputDto } from './dto/login-input.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    console.log(
      '🚀 ~ file: auth.service.ts ~ line 11 ~ AuthService ~ validateUser ~ user',
      user,
    );

    const validPassword = await bcrypt.compare(password, user?.password);

    if (user && validPassword) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        subarray: user.id,
      }),
      user,
    };
  }

  async signUp(signUpInput: LoginInputDto) {
    const user = await this.userService.findOne(signUpInput.username);
    if (user) {
      throw new Error('User already exists');
    }

    const password = await bcrypt.hash(signUpInput.password, 16);

    console.log({
      ...signUpInput,
      password,
    });
    return this.userService.create({
      ...signUpInput,
      password,
    });
  }
}
