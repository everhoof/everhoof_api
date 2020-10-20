import { Query, Resolver } from '@nestjs/graphql';
import { UseFilters, UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { User } from '@modules/users/entities/users.entity';
import { CurrentUser, GqlAuthGuard } from '@common/guards/auth.guard';

@UseFilters(HttpExceptionFilter)
@Resolver('Users')
export class UsersResolver {
  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async getCurrentUser(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
