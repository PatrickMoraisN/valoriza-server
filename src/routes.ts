import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { EnsureAdmin } from './middlewares/EnsureAdmin';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const ensureAdmin = new EnsureAdmin();

router.post('/users', createUserController.handle);
router.post('/tags', ensureAdmin.handle, createTagController.handle);
router.post('/login', authenticateUserController.handle);

export { router };
