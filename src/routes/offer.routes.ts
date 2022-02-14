import express from 'express';
import { Request, Response } from 'express';

import OfferController from '../controllers/offer.controller';
import { ApiError, ApiSuccess, Offer, OfferInCategory } from '../types';

const router = express.Router();
const Offer = new OfferController();

router.get('/offers/', async (req: Request, res: Response) => {
  // @ts-ignore
  const response: Offer[] | OfferInCategory | ApiError = await Offer.get(req.query.categoryId);

  if ('status' in response && response.status) {
    res.json(response).status(response.status);
  }

  res.json(response).status(200);
});
router.post('/offers', async (req: Request, res: Response) => {
  const response: Offer | ApiError = await Offer.create(req.body);

  if ('status' in response && response.status) {
    return res.json(response).status(response.status);
  }

  return res.json(response).status(200);
});
router.put('/offers', async (req: Request, res: Response) => {
  const response: ApiSuccess | ApiError = await Offer.update(req.body);

  if ('status' in response && response.status) {
    return res.json(response).status(response.status);
  }

  return res.json(response).status(204);
});
router.delete('/offers/:id', async (req: Request, res: Response) => {
  const response: ApiSuccess | ApiError = await Offer.delete(req.params.id);

  if ('status' in response && response.status) {
    return res.json(response).status(response.status);
  }

  res.json(response).status(204);
});

export default router;
