import mongoose from 'mongoose';
import { eres } from '../../../utils/promise';
import { MONGO_TEST } from '../../../config';
import { generateToken } from '../../../auth/jwt';
import { createUser } from '../../../test/createRows';
import UserModel from '../userModel';
import app from '../../../routes';
import { errors } from '../../../constants';

const fastify = app;

beforeAll(async () => {
  mongoose.connect(MONGO_TEST);
  UserModel.remove({});
});

afterEach(async () => {
  UserModel.remove({});
});

afterAll(async () => {
  UserModel.remove({});
  mongoose.disconnect();
});

it('should query the user with the token', async () => {
  const { email, name } = await createUser();
  const token = generateToken(email);

  const [response, err] = await eres(
    fastify.inject({
      method: 'GET',
      url: '/api/me',
      headers: {
        authorization: token,
      },
    }),
  );
  expect(err).toBe(null);

  if (response) {
    const { statusCode, payload } = response;
    const { email: resEmail, name: resName, error } = JSON.parse(payload);

    expect(error).not.toBe(errors.userErrors.invalidToken);
    expect(statusCode).toBe(200);
    expect(email).toBe(resEmail);
    expect(name).toBe(resName);
  }
});

it('should not query the user with no token', async () => {
  const [response, err] = await eres(
    fastify.inject({
      method: 'GET',
      url: '/api/me',
      headers: {
        authorization: '',
      },
    }),
  );
  expect(err).toBe(null);

  if (response) {
    const { statusCode, payload } = response;
    const { error } = JSON.parse(payload);

    expect(error).toBe(errors.userErrors.invalidToken);
    expect(statusCode).toBe(200);
  }
});
