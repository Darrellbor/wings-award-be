import { Router } from 'express';

import { generalValidator } from '../../validators/general';
import { createValidator, updateVoteValidator } from '../../validators/vote';
import {
  createCtrl,
  findOneVoteCtrl,
  fetchVotesCtrl,
  updateVoteCtrl,
  voteAnalysisCtrl,
} from '../../controllers/vote.controller';

const router = Router();

router.route('/').post(createValidator, createCtrl);

router.route('/votes').get(generalValidator, fetchVotesCtrl);

router.route('/vote/:voteId').put(updateVoteValidator, updateVoteCtrl);

router.route('/vote/:email/:signature').get(generalValidator, findOneVoteCtrl);

router.route('/voteAnalysis').get(generalValidator, voteAnalysisCtrl);

export default router;
