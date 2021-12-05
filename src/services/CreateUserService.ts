import { UsersRepositories } from '../repositories/UsersRepositories';

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
}

class CreateUserService {
  async execute({ name, email, admin }: IUserRequest) {
    const usersRepository = new UsersRepositories();

    if (!email) {
      throw new Error('Email required!');
    }

    const userAlreadyExists = usersRepository.findOne({ email });

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
  }
}

export { CreateUserService };
