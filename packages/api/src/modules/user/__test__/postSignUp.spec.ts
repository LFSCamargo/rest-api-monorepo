import mongoose from 'mongoose';
import app from '../../../routes';
import { MONGO_TEST } from '../../../config';
import UserModel from '../userModel';
import { eres } from '../../../utils/promise';
import { createUser } from '../../../test/createRows';
import { errors } from '../../../constants';

beforeAll(async () => {
  mongoose.connect(MONGO_TEST);
  UserModel.remove({});
});

beforeEach(async () => {
  UserModel.remove({});
});

afterAll(async () => {
  UserModel.remove({});
  mongoose.disconnect();
});

it('should create user and give back a token', async () => {
  const [response, err] = await eres(
    app.inject({
      method: 'POST',
      url: 'api/signUp',
      payload: {
        email: 'test@jest.com',
        password: '123456',
        name: 'Jest',
      },
    }),
  );

  expect(err).toBe(null);

  if (response) {
    const { statusCode, payload } = response;
    const { error, token } = JSON.parse(payload);

    expect(statusCode).toBe(200);
    expect(error).not.toBe(errors.userErrors.alreadyRegistered);
    expect(token).not.toBe(null);
  }
});

it('should not create user with same email', async () => {
  const { email, name } = await createUser();

  const [response, err] = await eres(
    app.inject({
      method: 'POST',
      url: 'api/signUp',
      payload: {
        email,
        name,
        password: '123456',
      },
    }),
  );

  expect(err).toBe(null);

  if (response) {
    const { statusCode, payload } = response;
    const { error } = JSON.parse(payload);

    expect(statusCode).toBe(200);
    expect(error).toBe(errors.userErrors.alreadyRegistered);
  }
});
