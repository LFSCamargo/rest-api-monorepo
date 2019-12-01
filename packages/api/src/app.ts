import express from 'express';
import mongoose from 'mongoose';
import { MONGO, PORT } from './config';
import { getMe, getUser, postLogin, postSignUp } from './modules/user/userResolvers';

const app = express();

// User routes
app.get('/api/me', getMe);
app.get('/api/user/:id', getUser);
app.post('/api/login', postLogin);
app.post('/api/signUp', postSignUp);

mongoose.connect(MONGO, {}, (error) => {
  if (error) {
    console.log('Error: ', error);
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`⚡️ @blog/api its running at port ${PORT}`)
  })
})
