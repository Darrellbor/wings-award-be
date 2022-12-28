import { appKey, signature } from '../../config';
import { body, param, header } from 'express-validator';

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
  body('name').notEmpty().withMessage('Category name cannot be empty!'),
  body('description').notEmpty().withMessage('Category description cannot be empty!'),
];

export const AddNomineesValidator = [
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
  param('categoryId').notEmpty().withMessage('Category id parameter cannot be empty!'),
  body('*.name').notEmpty().withMessage('Nominee name cannot be empty!'),
  body('*.image').notEmpty().withMessage('Nominee image cannot be empty!'),
];
