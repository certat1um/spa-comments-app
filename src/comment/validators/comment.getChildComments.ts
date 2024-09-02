import Joi from 'joi';
import {
  JoiSchemaInterface,
  joiOrder,
  joiPagination,
} from '../../middlewares/validator';

export const getChildComments: JoiSchemaInterface = {
  params: {
    parentId: Joi.string().uuid().required(),
  },
  body: {
    pagination: joiPagination,
    order: joiOrder,
  },
};
