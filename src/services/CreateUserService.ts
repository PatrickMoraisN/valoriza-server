import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
}

class CreateUserService {
  async execute({ name, email, admin }: IUserRequest) {
    try {
      const usersRepository = await getCustomRepository(UsersRepositories);

      if (!email) {
        throw new Error('Email required!');
      }

      const userAlreadyExists = await usersRepository.findOne({ email });

      if (userAlreadyExists) {
        throw new Error('Users already exists!');
      }

      const user = usersRepository.create({
        name,
        email,
        admin,
      });

      await usersRepository.save(user);

      return user;
    } catch (error) {
      return { error: error.message };
    }
  }
}

export { CreateUserService };
