import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';

class ListUserReicevedComplimentsService {
  async execute(user_id: string) {
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );

    const compliments = complimentsRepositories.find({
      where: {
        user_receiver: user_id,
      },
    });

    return compliments;
  }
}

export { ListUserReicevedComplimentsService };
