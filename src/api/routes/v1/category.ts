import { Router } from 'express';

import { generalValidator } from '../../validators/general';
import { createValidator, AddNomineesValidator } from '../../validators/category';
import {
  createCtrl,
  addNomineesCtrl,
  fetchCategoriesCtrl,
} from '../../controllers/category.controller';

const router = Router();

router.route('/').post(createValidator, createCtrl);

router.route('/addNominees/:categoryId').post(AddNomineesValidator, addNomineesCtrl);

router.route('/categories').get(generalValidator, fetchCategoriesCtrl);

export default router;
