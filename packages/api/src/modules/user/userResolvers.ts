import UserModel, { IUser } from "./userModel";
import { getUserFromToken, generateToken } from "../../auth/jwt";
import { errors } from "../../constants";
import { ParamsDictionary, Request, Response } from "express-serve-static-core";

export const getMe = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.send({
      error: errors.userErrors.invalidToken,
    })
  }

  const user = await getUserFromToken(authorization)

  if (!user) {
    throw new Error(errors.userErrors.invalidToken)
  }

  return res.send({
    id: user._id,
    name: user.name,
    email: user.email,
  } as IUser)
}

export const getUser = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { id } = req.params;

  const user = await UserModel.findOne({ _id: id });

  if (!user) {
    return res.send({
      error: errors.userErrors.doesNotExists,
    })
  }

  return res.send({
    id: user._id,
    name: user.name,
    email: user.email,
  } as IUser)
}

export const postLogin = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { body } = req;

  const { email, password } = body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.send({
      error: errors.userErrors.wrongEmailOrPassword
    })
  }

  const { authenticate } = user;

  if (!authenticate(password)) {
    return res.send({
      error: errors.userErrors.wrongEmailOrPassword
    })
  }

  return res.send({
    token: generateToken(email)
  })
};

export const postSignUp = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { body } = req;

  const { email, password, name } = body;

  const user = await UserModel.findOne({ email });

  if (user) {
    return res.send({
      error: errors.userErrors.alreadyRegistered
    })
  }

  const newUser = new UserModel({
    email,
    password,
    name,
  } as IUser);

  await newUser.save();

  return res.send({
    token: generateToken(email)
  })
};