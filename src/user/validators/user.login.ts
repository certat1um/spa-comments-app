import Joi from 'joi';
import { Joi.Schema } from '../../middlewares/validator';

export const login: Joi.Schema = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  },
};
