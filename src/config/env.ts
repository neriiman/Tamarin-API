import type { SignOptions } from 'jsonwebtoken';

const requireEnv = (variable: string): string => {
  const value = process.env[variable];
  if (!value) throw new Error(`Missing env variable: ${variable}`);
  return value;
};

export const env = {
  JWT_SECRET: requireEnv('TAMARIN_JWT_SECRET'),
  JWT_REFRESH_SECRET: requireEnv('TAMARIN_JWT_REFRESH_SECRET'),
  PORT: requireEnv('PORT'),
  DB_URL: requireEnv('TAMARIN_DB_URL'),
  ACCESS_TOKEN_EXPIRES_IN:
    (requireEnv('TAMARIN_JWT_ACCESS_TOKEN_EXPIRES_IN') as SignOptions['expiresIn']) ?? '1h',
  REFRESH_TOKEN_EXPIRES_IN:
    (requireEnv('TAMARIN_JWT_REFRESH_TOKEN_EXPIRES_IN') as SignOptions['expiresIn']) ?? '1h',
  NODE_ENV: requireEnv('TAMARIN_NODE_ENV'),
  WEB_APP_URL: requireEnv('TAMARIN_WEB_APP_URL'),
  WEB_APP_LOCALHOST: requireEnv('TAMARIN_WEB_APP_LOCALHOST'),
};
