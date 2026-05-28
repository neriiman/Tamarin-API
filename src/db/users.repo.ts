import type z from 'zod';
import { pool } from '../config/db.js';
import { signUpSchema } from '../validators/auth.validation.js';

type SafeCreateUserInput = Omit<z.infer<typeof signUpSchema>, 'password'> & {
  passwordHashed: string;
};

export const createUserInDb = async (data: SafeCreateUserInput) => {
  const result = await pool.query(
    `INSERT INTO users (
              username,
              email,
              password_hashed,
              first_name,
              last_name,
              profile_image
              )
              VALUES ($1, $2, $3, $4, $5, $6 )
              RETURNING *
              `,
    [
      data.username,
      data.email,
      data.passwordHashed,
      data.firstName ?? null,
      data.lastName ?? null,
      data.profileImage ?? null,
    ],
  );
  return result.rows[0];
};

export const findUserByUsernameInDb = async (username: string) => {
  const result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE username = $1 
    LIMIT 1
    `,
    [username],
  );

  return result.rows[0] ?? null;
};

export const findUserByEmailInDb = async (email: string) => {
  const result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE email = $1 
    LIMIT 1
    `,
    [email],
  );

  return result.rows[0] ?? null;
};

export const findUserByUsernameOrEmail = async (username: string, email: string) => {
  const result = await pool.query(
    `
    SELECT * 
    FROM users 
    WHERE username = $1 
      OR email = $2 
    LIMIT 1
    `,
    [username, email],
  );

  return result.rows[0] ?? null;
};

export const findUserByIdInDb = async (id: string) => {
  const result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE id = $1 
    LIMIT 1
    `,
    [id],
  );

  return result.rows[0] ?? null;
};
