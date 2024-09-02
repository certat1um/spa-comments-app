import Joi from 'joi';
import { Joi.Schema } from '../../middlewares/validator';

export const getById: Joi.Schema = {
  params: {
    id: Joi.string().uuid().required(),
  },
};
