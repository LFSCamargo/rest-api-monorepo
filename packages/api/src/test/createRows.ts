import faker from 'faker';
import UserModel from '../modules/user/userModel';

export const createUser = async () => {
  return new UserModel({
    name: `${faker.name.findName()}`,
    email: `${faker.internet.email()}`,
    password: '123456',
    active: true,
  }).save();
};
