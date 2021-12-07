import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { ListTagController } from './controllers/ListTagController';
import { ListUserReceivedComplimentsController } from './controllers/ListUserReceivedComplimentsController';
import { ListUsersController } from './controllers/ListUsersController';
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
const listTagController = new ListTagController();
const listUsersController = new ListUsersController();

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

router.get('/tags', ensureAuthenticated.handle, listTagController.handle);

router.get('/users', ensureAuthenticated.handle, listUsersController.handle);

export { router };
