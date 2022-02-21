import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginInputDto } from './dto/login-input.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { GqlAuthGuard } from './gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponseDto)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginInputDto,
    @Context() context,
  ) {
    console.log(
      '🚀 ~ file: auth.resolver.ts ~ line 15 ~ AuthResolver ~ login ~ loginUserInput',
      loginUserInput,
    );
    return this.authService.login(context.user);
  }

  @Mutation(() => User)
  signUp(@Args('signUpInput') loginUserInput: LoginInputDto) {
    return this.authService.signUp(loginUserInput);
  }
}
