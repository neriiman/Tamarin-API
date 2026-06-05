import type { ChallengeDaySummary } from './challengeDays.type.js';
import type { Video } from './video.type.js';

export type ChallengeDayVideo = Video & {
  orderIndex: number;
  isOptional: boolean;
};
export type ChallengeDayWithVideos = ChallengeDaySummary & { videos: ChallengeDayVideo[] };
