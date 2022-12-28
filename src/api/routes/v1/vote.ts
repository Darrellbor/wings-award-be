import { Router } from 'express';

import { generalValidator } from '../../validators/general';
import {
  createValidator,
  unconfirmedVotesValidator,
  updateVoteValidator,
} from '../../validators/vote';
import {
  createCtrl,
  findOneVoteCtrl,
  fetchVotesCtrl,
  updateVoteCtrl,
  voteAnalysisCtrl,
  unconfirmedVotesCtrl,
} from '../../controllers/vote.controller';

const router = Router();

router.route('/').post(createValidator, createCtrl);

router.route('/votes').get(generalValidator, fetchVotesCtrl);

router.route('/vote/:voteId').put(updateVoteValidator, updateVoteCtrl);

router.route('/vote/:email/:signature').get(generalValidator, findOneVoteCtrl);

router.route('/voteAnalysis').get(generalValidator, voteAnalysisCtrl);

router.route('/unconfirmedVotes').post(unconfirmedVotesValidator, unconfirmedVotesCtrl);

export default router;
