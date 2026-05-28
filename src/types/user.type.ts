export type UserRow = {
  id: string;
  username: string;
  email: string;
  password_hashed: string;
  first_name: string;
  last_name: string;
  profile_image: string | null;
  joined_at: string;
  updated_at: string;
};
