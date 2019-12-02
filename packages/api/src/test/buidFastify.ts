import fastify from 'fastify';
import { getMe, getUser, postLogin, postSignUp } from '../modules/user/userResolvers';

export function buildFastify () {
  const app = fastify();

  // User routes
  app.get('/api/me', (req, res) => getMe(req, res));
  app.get('/api/user/:id', (req, res) => getUser(req, res));
  app.post('/api/login', (req, res) => postLogin(req, res));
  app.post('/api/signUp', (req, res) => postSignUp(req, res));

  return app;
}
