import type { Request, Response } from 'express';
import { asyncMiddleWare } from '../middleware/async.middleware.js';
import { getChallengeById, getChallenges } from '../services/challenges.service.js';
import type {
  getChallengeByIdParams,
  GetChallengesQuery,
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
