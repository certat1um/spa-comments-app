import {
  joiOrder,
  joiPagination,
  JoiSchemaInterface,
} from '../../middlewares/validator';

export const getParentComments: JoiSchemaInterface = {
  body: {
    pagination: joiPagination,
    order: joiOrder,
  },
};
