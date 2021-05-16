import { body, param, header } from 'express-validator';
import { signature, appKey } from '../../config';
import { Vote } from '../database/models/vote.model';

export const createValidator = [
  header('signature')
    .notEmpty()
    .withMessage('Access Denied: cannot access route!')
    .custom((value: string) => {
      if (value !== signature) throw Promise.reject('Access Denied: cannot access route!');
    }),

  header('appKey')
    .notEmpty()
    .withMessage('Access Denied: cannot access route!')
    .custom((value: string) => {
      if (value !== appKey) throw Promise.reject('Access Denied: cannot access route!');
    }),
  body('email')
    .isEmail()
    .withMessage('Email cannot be empty!')
    .custom(async (value: string) => {
      const vote = await Vote.findOne({ email: value });
      if (vote) Promise.reject(`${value} has already voted before!`);
    })
    .normalizeEmail(),
  body('votes').notEmpty().withMessage('Votes cannot be empty'),
];

export const updateVoteValidator = [
  header('signature')
    .notEmpty()
    .withMessage('Access Denied: cannot access route!')
    .custom((value: string) => {
      if (value !== signature) throw Promise.reject('Access Denied: cannot access route!');
    }),

  header('appKey')
    .notEmpty()
    .withMessage('Access Denied: cannot access route!')
    .custom((value: string) => {
      if (value !== appKey) throw Promise.reject('Access Denied: cannot access route!');
    }),
  param('voteId').notEmpty().withMessage('Vote id parameter cannot be empty!'),
];
