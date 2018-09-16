import { Router } from 'express';
import passport from 'passport';

import * as AuthenticationController from './controllers/auth';
import * as TodoController from './controllers/todos';
import * as UserController from './controllers/users';

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });


export default function routes(app: any) {
  // Initializing route groups
  const apiRoutes = Router();
  const authRoutes = Router();

  /**
   * Auth routes
   */
  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.post('/login', AuthenticationController.login);

  /**
   * Todo routes
   */
  apiRoutes.get('/todos', TodoController.todos);
  apiRoutes.get('/todos/:todoId', TodoController.todo);
  apiRoutes.post('/todos/create', requireAuth, TodoController.createTodo);

  /**
   * Profile routes
   */
  apiRoutes.get('/me', requireAuth, UserController.getMe);

  // Set url for API group routes
  app.use('/api', apiRoutes);
};
