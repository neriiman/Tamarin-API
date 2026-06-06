export type UserChallenge = {
  id: string;
  userId: string;
  challengeId: string;
  startedAt: string;
  completedAt: string | null;
  status: 'active' | 'completed' | 'paused' | 'abandoned';
};
