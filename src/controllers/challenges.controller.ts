import type { Request, Response } from 'express';
import { asyncMiddleWare } from '../middleware/async.middleware.js';
import { getChallengeById, getChallenges, startChallenge } from '../services/challenges.service.js';
import type {
  getChallengeByIdParams,
  GetChallengesQuery,
  startChallengeParams,
} from '../validators/challenges.validation.js';

export const getChallengesController = asyncMiddleWare(async (req: Request, res: Response) => {
  const query = req.validatedQuery as GetChallengesQuery;

  const result = await getChallenges(query);
  res.status(200).json(result);
});

export const getChallengeByIdController = asyncMiddleWare(async (req: Request, res: Response) => {
  const { id } = req.validatedParams as getChallengeByIdParams;
  const challenge = await getChallengeById(id);
  res.status(200).json({ data: challenge });
});

export const startChallengeController = asyncMiddleWare(async (req: Request, res: Response) => {
  const { challengeId } = req.validatedParams as startChallengeParams;
  const { id: userId } = req.user!;
  const result = await startChallenge(userId, challengeId);
  res.status(201).json(result);
});
