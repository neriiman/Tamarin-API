export type ChallengeDay = {
  challengeId: string;
  dayNumber: number;
  isRestDay: boolean;
};
export type ChallengeDaySummary = Omit<ChallengeDay, 'challengeId'>;
