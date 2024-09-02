import {
  Body,
  Get,
  JsonController,
  Param,
  Post,
  UseBefore,
} from 'routing-controllers';
import { IUser } from '../interfaces/user';
import { User } from '../models/User';
import { Inject, Service } from 'typedi';
import { UserService } from '../services/user';
import { validate } from '../../middlewares/validator';
import { getBy, getById, login, register } from '../validators';

@JsonController('/users')
@Service()
export class UserController {
  @Inject() private userService: UserService;

  @Get('/:id')
  @UseBefore(validate(getById))
  public async getById(@Param('id') id: string): Promise<User> {
    return this.userService.getById(id);
  }

  @Post('/by')
  @UseBefore(validate(getBy))
  public async getBy(@Body() data: Partial<IUser>): Promise<User> {
    return this.userService.getBy(data);
  }

  @Post('/signup')
  @UseBefore(validate(register))
  public async register(
    @Body() data: Pick<IUser, 'username' | 'email' | 'password'>,
  ): Promise<{ user: User; token: string }> {
    return this.userService.register(data);
  }

  @Post('/login')
  @UseBefore(validate(login))
  public async login(
    @Body() data: Pick<IUser, 'email' | 'password'>,
  ): Promise<{ token: string }> {
    return this.userService.login(data);
  }
}
