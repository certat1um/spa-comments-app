import Joi from 'joi';
import { JoiSchemaInterface } from '../../middlewares/validator';

export const getBy: JoiSchemaInterface = {
  body: {
    id: Joi.string().uuid().optional(),
    username: Joi.string().optional(),
    email: Joi.string().email().optional(),
  },
};
