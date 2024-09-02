import Joi from 'joi';
import { JoiSchemaInterface } from '../../middlewares/validator';

export const register: JoiSchemaInterface = {
  body: {
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  },
};
