import { ObjectionModel } from '../../../database/knex';
import { IComment } from '../interfaces/comment';
import { User } from '../../user/models/User';

export class Comment extends ObjectionModel implements IComment {
  id: string;
  text: string;
  user_id: string;
  parent_comment_id?: string;
  file_url?: string;
  created_at?: string;
  updated_at?: string;

  static get tableName(): string {
    return 'comments';
  }

  static get relationMappings() {
    return {
      user: {
        relation: ObjectionModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'comments.user_id',
          to: 'users.id',
        },
      },
      child_comments: {
        relation: ObjectionModel.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'comments.id',
          to: 'comments.parent_comment_id',
        },
      },
      parent_comment: {
        relation: ObjectionModel.BelongsToOneRelation,
        modelClass: Comment,
        join: {
          from: 'comments.parent_comment_id',
          to: 'comments.id',
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
