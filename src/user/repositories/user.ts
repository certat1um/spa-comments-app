import { Service } from 'typedi';
import { IUser } from '../interfaces/user';
import { User } from '../models/User';

@Service()
export class UserRepository {
  public async getById(id: string): Promise<User | undefined> {
    return User.query().findById(id);
  }

  public async getBy(data: Partial<IUser>): Promise<User | undefined> {
    return User.query().findOne({ ...data });
  }

  public async register(
    data: Pick<IUser, 'username' | 'email' | 'password'>,
  ): Promise<User> {
    return User.query().insertAndFetch({ ...data });
  }
}
