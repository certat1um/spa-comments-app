import Joi from 'joi';
import { JoiSchemaInterface } from '../../middlewares/validator';

export const makeReply: JoiSchemaInterface = {
  params: {
    commentId: Joi.string().uuid().required(),
  },
  body: {
    text: Joi.string().max(1000).required(),
  },
};
