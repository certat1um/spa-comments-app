import { BadRequestError, NotFoundError, UseAfter } from 'routing-controllers';
import { IUser } from '../interfaces/user';
import { User } from '../models/User';
import { UserRepository } from '../repositories/user';
import { checkPass, hashPass } from '../../utils/userPassword';
import { generateAccessToken } from '../../utils/generateAccessToken';
import { Inject, Service } from 'typedi';

@Service()
export class UserService {
  @Inject() private userRepository: UserRepository;

  public async getById(id: string): Promise<User> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  public async getBy(data: Partial<IUser>): Promise<User> {
    const user = await this.userRepository.getBy({ email: data.email });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  public async register(
    data: Pick<IUser, 'username' | 'email' | 'password'>,
  ): Promise<{ user: User; token: string }> {
    const isExist = await this.userRepository.getBy({ email: data.email });
    if (isExist) {
      throw new BadRequestError('User is already registered');
    }

    const hashedPass = await hashPass(data.password);
    const user = await this.userRepository.register({
      ...data,
      password: hashedPass,
    });
    const token = generateAccessToken(user.id);

    return { user, token };
  }

  public async login(
    data: Pick<IUser, 'email' | 'password'>,
  ): Promise<{ token: string }> {
    const user = await this.getBy(data);

    const isPasswordCorrect = checkPass(data.password, user.password);
    if (!isPasswordCorrect) {
      throw new BadRequestError('Invalid credentials');
    }

    const token = generateAccessToken(user.id);

    return { token };
  }
}
