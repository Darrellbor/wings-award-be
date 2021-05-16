import { Router } from 'express';

import CategoryRoutes from './category';
import VoteRoutes from './vote';

const router = Router();

router.use('/category/v1', CategoryRoutes);
router.use('/vote/v1', VoteRoutes);

export default router;
