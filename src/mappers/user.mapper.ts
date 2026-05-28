import type { UserRow } from '../types/user.type.js';

export type SafeUser = Omit<UserRow, 'password_hashed'>;

export const toSafeUser = (data: UserRow): SafeUser => ({
  id: data.id,
  username: data.username,
  email: data.email,
  first_name: data.first_name,
  last_name: data.last_name,
  profile_image: data.profile_image,
  joined_at: data.joined_at,
  updated_at: data.updated_at,
});
