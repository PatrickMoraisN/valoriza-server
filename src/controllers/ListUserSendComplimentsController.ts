import { Response } from 'express';
import { IRequest } from '../middlewares/EnsureAuthenticated';
import { ListUserSendComplimentsService } from '../services/ListUserSendComplimentsService';

class ListUserSendComplimentsController {
  async handle(request: IRequest, response: Response) {
    const { user_id } = request;

    const listUserSendComplimentsService = new ListUserSendComplimentsService();

    const listCompliments = await listUserSendComplimentsService.execute(
      user_id
    );

    return response.json(listCompliments);
  }
}

export { ListUserSendComplimentsController };
