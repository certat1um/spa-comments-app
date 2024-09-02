import Joi from 'joi';
import { JoiSchemaInterface } from '../../middlewares/validator';

export const getById: JoiSchemaInterface = {
  params: {
    id: Joi.string().uuid().required(),
  },
};
