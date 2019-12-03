// tslint:disable no-console
import mongoose from 'mongoose';
import { MONGO, PORT } from './config';
import app from './routes';

mongoose.connect(MONGO, {}, (error) => {
  if (error) {
    console.log('Error: ', error);
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`⚡️ @blog/api its running at port ${PORT}`);
  })
})
