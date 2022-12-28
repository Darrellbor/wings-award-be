import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { validationResult } from 'express-validator';

import asyncHandler from '../../helpers/asyncHandler';
import VoteService from '../../services/vote';
import { BadRequestDataError, BadRequestError, NotFoundError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';

export const createCtrl = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  //error handling
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new BadRequestDataError('Validation Failed', errors);

  const vote = await VoteService.Create(req.body);

  return new SuccessResponse('Vote Successfully Casted!', { ...vote, signature: '' }).send(res);
});

export const findOneVoteCtrl = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const email = req.params.email;
    const signature = req.params.signature;

    //error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestDataError('Validation Failed', errors);

    const vote = await VoteService.findOneVote({ email, signature });

    if (!vote) throw new NotFoundError(`Vote with email ${email} could not be confirmed!`);

    return new SuccessResponse('Vote Successfully Retrieved!', vote).send(res);
  }
);

export const fetchVotesCtrl = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    //error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestDataError('Validation Failed', errors);

    const votes = await VoteService.fetchAllVotes();

    return new SuccessResponse('Votes Successfully Retrieved!', votes).send(res);
  }
);

export const updateVoteCtrl = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const voteId = <unknown>req.params.voteId;
    //error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestDataError('Validation Failed', errors);

    if (Object.keys(req.body).length === 0)
      throw new BadRequestError('You cannot modify empty fields!');

    const vote = await VoteService.updateVote(<Types.ObjectId>voteId, req.body);

    return new SuccessResponse('Vote Successfully Updated!', vote).send(res);
  }
);

export const voteAnalysisCtrl = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    //error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestDataError('Validation Failed', errors);

    const votes = await VoteService.voteAnalysis();

    return new SuccessResponse('Votes Analysis Retrieved!', votes).send(res);
  }
);

export const unconfirmedVotesCtrl = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const sendReminders = req.query.sendReminders;
    const successText = sendReminders
      ? `Unconfirmed votes have been successfully retrieved and reminder emails sent`
      : `Unconfirmed Votes have been Successfully Retrieved`;

    //error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestDataError('Validation Failed', errors);

    const unconfirmedVotes = await VoteService.unconfirmedVotes(Boolean(sendReminders));

    return new SuccessResponse(successText, {
      votes: unconfirmedVotes,
    }).send(res);
  }
);
