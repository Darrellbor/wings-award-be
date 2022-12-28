import { Router } from 'express';
import checkOrigin from '../../../helpers/checkOrigin';

import CategoryRoutes from './category';
import VoteRoutes from './vote';

const router = Router();

router.use('/category/v1', checkOrigin, CategoryRoutes);
router.use('/vote/v1', checkOrigin, VoteRoutes);

export default router;
