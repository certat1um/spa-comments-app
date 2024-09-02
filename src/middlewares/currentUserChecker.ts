import { Action } from 'routing-controllers';
import { User } from '../user/models/User';
import jwt from 'jsonwebtoken';

export const currentUserChecker = async (
  action: Action,
): Promise<User | undefined> => {
  const token = action.request.headers['authorization'];
  const decoded = jwt.decode(token) as { id: string };

  return User.query().select(['id', 'username', 'email']).findById(decoded.id);
};
