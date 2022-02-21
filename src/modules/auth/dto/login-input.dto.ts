import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInputDto {
  @Field()
  username: string;

  @Field()
  password: string;
}
