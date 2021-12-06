import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { EnsureAdmin } from './middlewares/EnsureAdmin';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const ensureAdmin = new EnsureAdmin();

router.post('/users', createUserController.handle);
router.post('/tags', ensureAdmin.handle, createTagController.handle);
router.post('/login', authenticateUserController.handle);
router.post('/compliments', createComplimentController.handle);

export { router };
