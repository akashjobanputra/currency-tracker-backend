import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    // console.log({ username, password });
    const user = await this.authService.validateUser(username, password);
    console.log(
      '🚀 ~ file: local.strategy.ts ~ line 15 ~ LocalStrategy ~ validate ~ user',
      user,
    );
    if (!user) {
      return new UnauthorizedException();
    }
    return user;
  }
}
