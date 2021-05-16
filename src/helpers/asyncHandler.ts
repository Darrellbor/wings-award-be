import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export default (execution: AsyncFunction) =>
  (req: Request, res: Response, next: NextFunction): void => {
    execution(req, res, next).catch(next);
  };
