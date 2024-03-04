import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import UserModel from '../models/model.users';
import bcrypt from 'bcrypt';

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;

  try {
    const user = await UserModel.findById(authenticatedUserId).select('+email');
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const { username, email, password: passwordRaw } = req.body;
  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, 'Missing required fields');
    }

    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
      throw createHttpError(
        409,
        'Username already taken. Please choose different one.'
      );
    }

    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      throw createHttpError(
        409,
        'A user with this Email already exists. Please try to login instead.'
      );
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);
    const newUser = await UserModel.create({
      username,
      email,
      password: passwordHashed,
    });

    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      throw createHttpError(400, 'Missing required fields');
    }

    const user = await UserModel.findOne({ username }).select(
      '+email +password'
    );

    if (!user) {
      throw createHttpError(401, 'Invalid username or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw createHttpError(401, 'Invalid username or password');
    }

    req.session.userId = user._id;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};
