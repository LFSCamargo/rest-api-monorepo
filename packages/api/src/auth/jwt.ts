import jwt from 'jsonwebtoken';
import { JWT } from '../config';
import UserModel, { IUser } from '../modules/user/userModel';

export const generateToken = (email: string): string => `Bearer ${jwt.sign({ id: email }, JWT)}`;

export const getUserFromToken = async (token: string): Promise<IUser | null> => {
  if (!token) {
    return null;
  }
  try {
    const userEmail: any = jwt.verify(token.substring(7), JWT);
    return await UserModel.findOne({ email: userEmail.id });
  } catch (e) {
    return null;
  }
};
