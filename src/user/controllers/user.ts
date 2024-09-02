import { Body, Get, JsonController, Param, Post } from 'routing-controllers';
import { IUser } from '../interfaces/user';
import { User } from '../models/User';
import { Inject, Service } from 'typedi';
import { UserService } from '../services/user';

@JsonController('/users')
@Service()
export class UserController {
  @Inject() private userService: UserService;

  @Get('/:id')
  public async getById(@Param('id') id: string): Promise<User> {
    return this.userService.getById(id);
  }

  @Post('/by')
  public async getBy(@Body() data: Partial<IUser>): Promise<User> {
    return this.userService.getBy(data);
  }

  @Post('/signup')
  public async register(
    @Body() data: Pick<IUser, 'username' | 'email' | 'password'>,
  ): Promise<{ user: User; token: string }> {
    return this.userService.register(data);
  }

  @Post('/login')
  public async login(
    @Body() data: Pick<IUser, 'email' | 'password'>,
  ): Promise<{ token: string }> {
    return this.userService.login(data);
  }
}
