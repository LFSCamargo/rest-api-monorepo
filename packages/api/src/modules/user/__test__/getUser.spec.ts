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

it('should return a non existing user from the endpoint', async () => {
  const [response, err] = await eres(
    app.inject({
      method: 'GET',
      url: 'api/user/5de6571d118664a86ad6fe9d',
    }),
  );

  expect(err).toBe(null);

  if (response) {
    const { statusCode, payload } = response;
    const { error } = JSON.parse(payload);

    expect(error).toBe(errors.userErrors.doesNotExists);
    expect(statusCode).toBe(200);
  }
});

it('should return a user from the endpoint', async () => {
  const { name, email, _id } = await createUser();

  const [response, err] = await eres(
    app.inject({
      method: 'GET',
      url: `api/user/${_id}`,
    }),
  );

  expect(err).toBe(null);

  if (response) {
    const { statusCode, payload } = response;
    const { email: resEmail, name: resName, error } = JSON.parse(payload);

    expect(error).not.toBe(errors.userErrors.doesNotExists);
    expect(statusCode).toBe(200);
    expect(email).toBe(resEmail);
    expect(name).toBe(resName);
  }
});