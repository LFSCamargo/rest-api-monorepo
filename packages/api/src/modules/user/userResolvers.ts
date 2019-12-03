import UserModel, { IUser } from './userModel';
import { getUserFromToken, generateToken } from '../../auth/jwt';
import { errors } from '../../constants';
import bcrypt from 'bcryptjs';

export const getMe = async (req: any, res: any) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.send({
        error: errors.userErrors.invalidToken,
      });
    }

    const user = await getUserFromToken(authorization);

    if (!user) {
      throw new Error(errors.userErrors.invalidToken);
    }

    return res.send({
      id: user._id,
      name: user.name,
      email: user.email,
    } as IUser);
  } catch {
    return res.send({
      error: errors.userErrors.invalidToken,
    });
  }
};

export const getUser = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      return res.send({
        error: errors.userErrors.doesNotExists,
      });
    }

    return res.send({
      id: user._id,
      name: user.name,
      email: user.email,
    } as IUser);
  } catch (error) {
    return res.send({
      error: errors.server.internalServerError,
    });
  }
};

export const postLogin = async (req: any, res: any) => {
  const { body } = req;

  const { email, password } = body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.send({
        error: errors.userErrors.wrongEmailOrPassword,
      });
    }

    const { password: hash } = user;

    const isValidPassword = await bcrypt.compare(password, hash || '');

    if (!isValidPassword) {
      return res.send({
        error: errors.userErrors.wrongEmailOrPassword,
      });
    }

    const token = generateToken(email);

    return res.send({
      token,
    });
  } catch (error) {
    return res.send({
      error: errors.server.internalServerError,
    });
  }
};

export const postSignUp = async (req: any, res: any) => {
  const { body } = req;

  const { email, password, name } = body;

  const user = await UserModel.findOne({ email });

  if (user) {
    return res.send({
      error: errors.userErrors.alreadyRegistered,
    });
  }

  const newUser = new UserModel({
    email,
    password,
    name,
  } as IUser);

  await newUser.save();

  return res.send({
    token: generateToken(email),
  });
};
