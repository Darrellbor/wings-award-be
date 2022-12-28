import { frontendUrl } from '../config';
import { BadRequestError } from '../core/ApiError';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from './asyncHandler';

export default asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.origin === frontendUrl) return next();
  else throw new BadRequestError('Invalid Request');
});
