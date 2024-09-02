import Joi from 'joi';
import { joiOrder, joiPagination } from '../../middlewares/validator';

export const getChildComments = {
  params: {
    parentId: Joi.string().uuid().required(),
  },
  body: {
    pagination: joiPagination,
    order: joiOrder,
  },
};
