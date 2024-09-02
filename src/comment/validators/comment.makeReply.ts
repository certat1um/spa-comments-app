import Joi from 'joi';

export const makeReply = {
  params: {
    commentId: Joi.string().uuid().required(),
  },
  body: {
    text: Joi.string().max(1000).required(),
  },
};
