import { Response } from 'express';
import { IRequest } from '../middlewares/EnsureAuthenticated';
import { ListUserReceivedComplimentsService } from '../services/ListUserReceivedComplimentsService';

class ListUserReceivedComplimentsController {
  async handle(request: IRequest, response: Response) {
    const { user_id } = request;

    const listUserReceivedComplimentsService =
      new ListUserReceivedComplimentsService();

    const receivedCompliments =
      await listUserReceivedComplimentsService.execute(user_id);

    return response.json(receivedCompliments);
  }
}

export { ListUserReceivedComplimentsController };
