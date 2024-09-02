import { Service } from 'typedi';
import { Comment } from '../models/Comment';
import { GetCommentsOptions } from '../interfaces/comment';
import { User } from '../../user/models/User';

@Service()
export class CommentRepository {
  public async getById(id: string): Promise<Comment> {
    return Comment.query().findById(id);
  }

  public async getParentComments(
    options: GetCommentsOptions,
  ): Promise<Comment[]> {
    const { pagination, order } = options;

    return Comment.query()
      .whereNull('parent_comment_id')
      .orderBy(order.column, order.direction)
      .offset((pagination.cur_page - 1) * pagination.page_size)
      .limit(pagination.page_size);
  }

  public async fetchChildComments(
    parentId: string,
    options: GetCommentsOptions,
  ): Promise<Comment[]> {
    const { pagination, order } = options;

    return Comment.query()
      .where('parent_comment_id', parentId)
      .orderBy(order.column, order.direction)
      .offset((pagination.cur_page - 1) * pagination.page_size)
      .limit(pagination.page_size);
  }

  public async makeReply(
    userId: string,
    commentId: string,
    text: string,
    file_url?: string,
  ): Promise<Comment> {
    return Comment.query().insertAndFetch({
      user_id: userId,
      parent_comment_id: commentId,
      text,
      file_url,
    });
  }
}
