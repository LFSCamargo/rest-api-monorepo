import fastify from 'fastify';
import cors from 'fastify-cors';

import { getMe, getUser, postLogin, postSignUp } from './modules/user/userResolvers';

const app = fastify();
app.register(cors);

// User routes
app.get('/api/me', (req, res) => getMe(req, res));
app.get('/api/user/:id', (req, res) => getUser(req, res));
app.post('/api/login', (req, res) => postLogin(req, res));
app.post('/api/signUp', (req, res) => postSignUp(req, res));

export default app;
