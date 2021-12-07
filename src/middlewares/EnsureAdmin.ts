import { NextFunction, Request, Response } from 'express';
import { IRequest } from './EnsureAuthenticated';

class EnsureAdmin {
  handle(request: IRequest, response: Response, next: NextFunction) {
    const { user_id } = request;
    console.log(user_id);

    const admin = true;
    if (!admin) {
      return response.status(401).json({ error: 'Unauthorized' });
    }
    return next();
  }
}

export { EnsureAdmin };
