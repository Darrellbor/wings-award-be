import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { validationResult } from 'express-validator';

import asyncHandler from '../../helpers/asyncHandler';
import CategoryService from '../../services/category';
import { BadRequestDataError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';

export const createCtrl = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  //error handling
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new BadRequestDataError('Validation Failed', errors);

  const category = await CategoryService.Create(req.body);

  return new SuccessResponse('Category Successfully Created!', category).send(res);
});

export const addNomineesCtrl = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const categoryId = <unknown>req.params.categoryId;
    //error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestDataError('Validation Failed', errors);

    const nominees = await CategoryService.AddNominees(<Types.ObjectId>categoryId, req.body);

    return new SuccessResponse('Nominees Successfully Added!', nominees).send(res);
  }
);

export const fetchCategoriesCtrl = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    //error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestDataError('Validation Failed', errors);

    const categories = await CategoryService.fetchAllCategories();

    return new SuccessResponse('Categories Successfully Retrieved!', categories).send(res);
  }
);
