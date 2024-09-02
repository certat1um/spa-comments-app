import { ObjectionModel } from '../../../database/knex';
import { Comment } from '../../comment/models/Comment';
import { IUser } from '../interfaces/user';

export class User extends ObjectionModel implements IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  created_at?: string;
  updated_at?: string;

  static get tableName(): string {
    return 'users';
  }

  static get relationMappings() {
    return {
      comments: {
        relation: ObjectionModel.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'users.id',
          to: 'comments.user_id',
        },
      },
    };
  }

  $beforeInsert(): void {
    this.created_at = new Date().toISOString();
  }
  $beforeUpdate(): void {
    this.updated_at = new Date().toISOString();
  }
}
