import { NotFoundError } from 'routing-controllers';
import { User } from '../../user/models/User';
import { GetCommentsOptions } from '../interfaces/comment';
import { Comment } from '../models/Comment';
import { CommentRepository } from '../repositories/comment';
import { Inject, Service } from 'typedi';
import { UserService } from '../../user/services/user';
import { cleanHTML } from '../../utils/cleanHTML';
import { uploadToS3 } from '../../../aws/uploadToS3';

@Service()
export class CommentService {
  @Inject() private commentRepository: CommentRepository;
  @Inject() private userService: UserService;

  public async getById(id: string): Promise<Comment> {
    const comment = await this.commentRepository.getById(id);
    if (!comment) {
      throw new NotFoundError('Comment not found.');
    }
    return comment;
  }

  public async getParentComments(
    options: GetCommentsOptions,
  ): Promise<Comment[]> {
    return this.commentRepository.getParentComments(options);
  }

  public async fetchChildComments(
    parentId: string,
    options: GetCommentsOptions,
  ): Promise<Comment[]> {
    return this.commentRepository.fetchChildComments(parentId, options);
  }

  public async makeReply(
    userId: string,
    commentId: string,
    text: string,
    file?: Express.Multer.File,
  ): Promise<Comment> {
    const comment = await this.getById(commentId);
    let cleanedText = cleanHTML(text);
    let uploadedFileUrl;

    // add mention for a user if reply on child comment
    if (comment.parent_comment_id) {
      const childCommentUser = await this.userService.getById(comment.user_id);
      const userMention = `<b>@${childCommentUser.username}</b>`;
      cleanedText = `${userMention}, ${cleanedText}`;
    }

    if (file) {
      uploadedFileUrl = await uploadToS3(file);
    }

    return this.commentRepository.makeReply(
      userId,
      commentId,
      cleanedText,
      uploadedFileUrl,
    );
  }
}
