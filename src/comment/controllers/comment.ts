import {
  Body,
  CurrentUser,
  JsonController,
  Param,
  Post,
  UploadedFile,
  UseBefore,
} from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { CommentService } from '../services/comment';
import { Comment } from '../models/Comment';
import { GetCommentsOptions } from '../interfaces/comment';
import { User } from '../../user/models/User';
import { validate } from '../../middlewares/validator';
import { getChildComments, getParentComments, makeReply } from '../validators';

@JsonController('/comments')
@Service()
export class CommentController {
  @Inject() private commentService: CommentService;

  @Post('/parents')
  @UseBefore(validate(getParentComments))
  public async getParentComments(
    @Body() options: GetCommentsOptions,
  ): Promise<Comment[]> {
    return this.commentService.getParentComments(options);
  }

  @Post('/children/:parentId')
  @UseBefore(validate(getChildComments))
  public async getChildComments(
    @Param('parentId') parentId: string,
    @Body() options: GetCommentsOptions,
  ): Promise<Comment[]> {
    return this.commentService.fetchChildComments(parentId, options);
  }

  @Post('/reply/:commentId')
  @UseBefore(validate(makeReply))
  public async makeReply(
    @CurrentUser({ required: true }) user: User,
    @Param('commentId') commentId: string,
    @Body() data: { text: string },
    @UploadedFile('file') file?: Express.Multer.File,
  ): Promise<Comment> {
    return this.commentService.makeReply(user.id, commentId, data.text, file);
  }
}
