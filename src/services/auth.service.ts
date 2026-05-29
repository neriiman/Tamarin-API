import { toSafeUser, type SafeUser } from '../mappers/user.mapper.js';
import type { SignInBody, SignUpBody } from '../validators/auth.validation.js';
import bcrypt from 'bcrypt';
import {
  createUserInDb,
  findUserByEmailInDb,
  findUserByUsernameOrEmail,
} from '../db/users.repo.js';
import { AppError } from '../errors/AppError.js';

export const createUser = async (data: SignUpBody): Promise<SafeUser> => {
  const passwordHashed = await bcrypt.hash(data.password, 10);

  const user = await createUserInDb({
    username: data.username,
    email: data.email,
    passwordHashed,
    firstName: data.firstName,
    lastName: data.lastName,
    profileImage: data.profileImage,
  });

  return toSafeUser(user);
};

export const assertUserNotExtists = async (username: string, email: string) => {
  const user = await findUserByUsernameOrEmail(username, email);
  if (user) throw new AppError('Username or email already exists', 409);
};

export const signIn = async (data: SignInBody) => {
  const user = await findUserByEmailInDb(data.email);

  if (!user) throw new AppError('Invalid credentials', 401);

  const isValid = bcrypt.compare(data.password, user.password_hashed);

  if (!isValid) throw new AppError('Invalid credentials', 401);

  return toSafeUser(user);
};
