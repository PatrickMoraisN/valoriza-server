import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { EnsureAdmin } from './middlewares/EnsureAdmin';
import { EnsureAuthenticated } from './middlewares/EnsureAuthenticated';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
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

export { router };
