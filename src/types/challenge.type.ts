import type { ResultsWithMeta, ResultsWithTotalCount } from './api.type.js';
import type { CategoryRow } from './category.type.js';

export type Challenge = {
  id: string;
  title: string;
  description: string;
  duration_days: number;
  image_url: string;
  created_at: string;
  updated_at: string;
  categories: CategoryRow[];
};

export type ChallengesWithTotalCount = ResultsWithTotalCount<Challenge>;
export type ChallengesWithMeta = ResultsWithMeta<Challenge>;

export type ChallengeWithSlug = Challenge & {
  slug: string;
};
