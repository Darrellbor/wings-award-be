import { appKey, signature } from '../../config';
import { body, query, param, header } from 'express-validator';
import { Vote } from '../database/models/vote.model';

export const createValidator = [
  header('signature')
    .notEmpty()
    .custom((value: string) => {
      if (signature !== value) return Promise.reject('Invalid signature supplied');
      else return true;
    })
    .withMessage('Access Denied: cannot access route!'),
  header('appKey')
    .notEmpty()
    .custom((value: string) => {
      if (appKey !== value) return Promise.reject('Invalid app key supplied');
      else return true;
    })
    .withMessage('Access Denied: cannot access route!'),
  body('email')
    .isEmail()
    .withMessage('Email cannot be empty!')
    .custom(async (value: string) => {
      if (value.indexOf('+') !== -1)
        return Promise.reject(`Please use a covenant university email to vote`);
      else if (value.split('.').length > 5)
        return Promise.reject(`Please use a covenant university email to vote`);
      else if (/\d/.test(value))
        return Promise.reject(`Please use a covenant university email to vote`);

      const emailExt = value.split('@');
      if (emailExt[1] !== 'stu.cu.edu.ng')
        return Promise.reject(`Please use a covenant university email to vote`);
      const vote = await Vote.findOne({ email: value });
      if (vote) return Promise.reject(`${value} has already voted before!`);

      return true;
    })
    .normalizeEmail(),
  body('confirmed').isEmpty().withMessage('You cannot confirm a created vote'),
  body('votes.*.category').notEmpty().withMessage('Votes category cannot be empty'),
  body('votes.*.nominee').notEmpty().withMessage('Votes nominee cannot be empty'),
];

export const updateVoteValidator = [
  header('signature')
    .notEmpty()
    .custom((value: string) => {
      if (signature !== value) return Promise.reject('Invalid signature supplied');
      else return true;
    })
    .withMessage('Access Denied: cannot access route!'),
  header('appKey')
    .notEmpty()
    .custom((value: string) => {
      if (appKey !== value) return Promise.reject('Invalid app key supplied');
      else return true;
    })
    .withMessage('Access Denied: cannot access route!'),
  param('voteId').notEmpty().withMessage('Vote id parameter cannot be empty!'),
];

export const unconfirmedVotesValidator = [
  header('signature')
    .notEmpty()
    .custom((value: string) => {
      if (signature !== value) return Promise.reject('Invalid signature supplied');
      else return true;
    })
    .withMessage('Access Denied: cannot access route!'),
  header('appKey')
    .notEmpty()
    .custom((value: string) => {
      if (appKey !== value) return Promise.reject('Invalid app key supplied');
      else return true;
    })
    .withMessage('Access Denied: cannot access route!'),
  query('sendReminders').optional(),
];
