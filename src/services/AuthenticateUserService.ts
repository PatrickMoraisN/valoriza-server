import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { UsersRepositories } from '../repositories/UsersRepositories';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const userExists = await usersRepositories.findOne({ email });

    if (!userExists) {
      throw new Error('Email / Password incorrect!');
    }

    const isAValidPassword = await compare(password, userExists.password);

    if (!isAValidPassword) {
      throw new Error('Email / Password incorrect!');
    }

    const JWT_SECRET_HASH = process.env.JWT_SECRET;

    const token = sign({ email: userExists.email }, JWT_SECRET_HASH, {
      subject: userExists.id,
      expiresIn: '1d',
    });

    return token;
  }
}

export { AuthenticateUserService };
