export type UserChallenge = {
  id: string;
  user_id: string;
  challenge_id: string;
  started_at: string;
  completed_at: string | null;
  abandoned_at: string | null;
  status: 'active' | 'completed' | 'paused' | 'abandoned';
};
