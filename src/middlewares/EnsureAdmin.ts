import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';
import { IRequest } from './EnsureAuthenticated';

class EnsureAdmin {
  async handle(request: IRequest, response: Response, next: NextFunction) {
    const { user_id } = request;

    const usersRepositories = getCustomRepository(UsersRepositories);

    const { admin } = await usersRepositories.findOne({ id: user_id });

    if (!admin) {
      return response.status(401).json({ error: 'Unauthorized' });
    }
    return next();
  }
}

export { EnsureAdmin };
