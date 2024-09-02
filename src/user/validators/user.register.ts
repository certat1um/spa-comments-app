import Joi from 'joi';
import { Joi.Schema } from '../../middlewares/validator';

export const register: Joi.Schema = {
  body: {
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  },
};
