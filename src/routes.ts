import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { ListUserReceivedComplimentsController } from './controllers/ListUserReceivedComplimentsController';
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController';
import { EnsureAdmin } from './middlewares/EnsureAdmin';
import { EnsureAuthenticated } from './middlewares/EnsureAuthenticated';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController =
  new ListUserSendComplimentsController();
const listUserReceivedComplimentsController =
  new ListUserReceivedComplimentsController();
const ensureAdmin = new EnsureAdmin();
const ensureAuthenticated = new EnsureAuthenticated();

router.post('/users', createUserController.handle);
router.post(
  '/tags',
  ensureAuthenticated.handle,
  ensureAdmin.handle,
  createTagController.handle
);
router.post('/login', authenticateUserController.handle);
router.post(
  '/compliments',
  ensureAuthenticated.handle,
  createComplimentController.handle
);

router.get(
  '/users/compliments/send',
  ensureAuthenticated.handle,
  listUserSendComplimentsController.handle
);

router.get(
  '/users/compliments/received',
  ensureAuthenticated.handle,
  listUserReceivedComplimentsController.handle
);

export { router };
