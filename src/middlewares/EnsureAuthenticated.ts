import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export interface IRequest extends Request {
  user_id: string;
}

interface IVerifyPayload {
  sub: string;
}

class EnsureAuthenticated {
  handle(request: IRequest, response: Response, next: NextFunction) {
    const token = request.headers.authorization;

    if (!token) {
      return response.status(404).json({ message: 'invalid token' });
    }

    const [, authToken] = token.split(' ');

    try {
      const { sub } = verify(
        authToken,
        process.env.JWT_SECRET
      ) as IVerifyPayload;
      request.user_id = sub;
      return next();
    } catch (error) {
      return response.status(404).json({ error: error.message });
    }
  }
}

export { EnsureAuthenticated };
