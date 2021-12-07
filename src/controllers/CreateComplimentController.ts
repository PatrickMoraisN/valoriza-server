import { Request, Response } from 'express';
import { IRequest } from '../middlewares/EnsureAuthenticated';
import { CreateComplimentService } from '../services/CreateComplimentService';

class CreateComplimentController {
  async handle(request: IRequest, response: Response) {
    const { tag_id, user_receiver, message } = request.body;
    const user_sender = request.user_id;

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      tag_id,
      user_sender,
      user_receiver,
      message,
    });

    return response.json(compliment);
  }
}

export { CreateComplimentController };
