import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  /* @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  } */

  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('username', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  mapCountryToUser(
    @Args('countryCommonName', { type: () => String })
    countryCommonName: string,
    @Context() context,
  ) {
    const { user } = context.req;
    return this.usersService.addCountryToList(user.userId, countryCommonName);
  }

  @Query(() => User, { name: 'userWatchList' })
  @UseGuards(JwtAuthGuard)
  getWatchList(@Context() context) {
    const { user } = context.req;
    return this.usersService.getUserWatchList(user.userId);
  }
}
