import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

export interface JoiSchemaInterface {
  params?: { [name: string]: Joi.AnySchema };
  query?: { [name: string]: Joi.AnySchema };
  body?: { [name: string]: Joi.AnySchema } | Joi.ObjectSchema;
  headers?: { [name: string]: Joi.AnySchema };
}

export const joiPagination = Joi.object()
  .keys({
    cur_page: Joi.number().integer().min(1),
    page_size: Joi.number().integer().min(1).max(100),
  })
  .default({ cur_page: 1, page_size: 25 })
  .optional();

export const joiOrder = Joi.object()
  .keys({
    column: Joi.string().required(),
    direction: Joi.string().valid('asc', 'desc').default('asc'),
  })
  .optional();

export const validate = (schema: JoiSchemaInterface) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { params, query, body, headers } = req;
    const propsToValidate = { params, query, body, headers };

    const { error } = Joi.object(schema).validate(propsToValidate);
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        message: error.details.map((d) => d.message).join(', '),
      });
    }

    next();
  };
};
