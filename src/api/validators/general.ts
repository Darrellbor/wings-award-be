import { header } from 'express-validator';
import { signature, appKey } from '../../config';

export const generalValidator = [
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
];
