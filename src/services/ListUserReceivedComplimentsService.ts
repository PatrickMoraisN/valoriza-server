import { getCustomRepository } from 'typeorm';
import { classToPlain } from 'class-transformer';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';

class ListUserReceivedComplimentsService {
  async execute(user_id: string) {
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );

    const compliments = complimentsRepositories.find({
      where: {
        user_receiver: user_id,
      },
      relations: ['userSender', 'userReceiver', 'tag'],
    });

    return classToPlain(compliments);
  }
}

export { ListUserReceivedComplimentsService };
