import { joiOrder, joiPagination } from '../../middlewares/validator';

export const getParentComments = {
  body: {
    pagination: joiPagination,
    order: joiOrder,
  },
};
