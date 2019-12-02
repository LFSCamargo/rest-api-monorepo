import { generateToken, getUserFromToken } from '../jwt';
import mongoose from 'mongoose';
import { MONGO_TEST } from '../../config';
import UserModel from '../../modules/user/userModel';
import { createUser } from '../../test/createRows';

beforeAll(() => {
  mongoose.connect(MONGO_TEST);
});

afterAll(() => {
  mongoose.disconnect();
});

describe('auth functions test', () => {
  beforeAll(async () => {
    await UserModel.remove({});
  });

  beforeEach(async () => {
    await UserModel.remove({});
  });

  it('should generate a sign a token and get the user back', async () => {
    const user = await createUser();
    const { email, name } = user;

    const token = generateToken(email);
    const recoveredUser = await getUserFromToken(token);

    expect(recoveredUser && recoveredUser.email).toBe(email);
    expect(recoveredUser && recoveredUser.name).toBe(name);
  });
});
