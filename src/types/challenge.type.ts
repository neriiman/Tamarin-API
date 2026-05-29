export type ChallengeRow = {
  id: string;
  title: string;
  description: string;
  duration_days: number;
  image_url: string;
  created_at: string;
  updated_at: string;
};

export type ChallengesWithMeta = {
  data: ChallengeRow[];
  totalCount: number;
};

export type Challenge = ChallengeRow & {
  slug: string;
};
