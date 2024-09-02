import Joi from 'joi';
import { JoiSchemaInterface } from '../../middlewares/validator';

export const login: JoiSchemaInterface = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  },
};
