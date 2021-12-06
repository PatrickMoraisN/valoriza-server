import { Router } from 'express';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { EnsureAdmin } from './middlewares/EnsureAdmin';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const ensureAdmin = new EnsureAdmin();

router.post('/users', createUserController.handle);
router.post('/tags', ensureAdmin.handle, createTagController.handle);

export { router };
