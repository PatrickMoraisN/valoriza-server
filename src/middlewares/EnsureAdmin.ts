import { NextFunction, Request, Response } from 'express';

class EnsureAdmin {
  handle(request: Request, response: Response, next: NextFunction) {
    // const { admin } = request.body
    const admin = true;

    if (!admin) {
      return response.status(401).json({ error: 'Unauthorized' });
    }
    return next();
  }
}

export { EnsureAdmin };
