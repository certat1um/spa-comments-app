import Joi from 'joi';
import { Joi.Schema } from '../../middlewares/validator';

export const getBy: Joi.Schema = {
  body: {
    id: Joi.string().uuid().optional(),
    username: Joi.string().optional(),
    email: Joi.string().email().optional(),
  },
};
