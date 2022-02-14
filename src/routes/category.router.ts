import express from 'express';
import { Request, Response } from 'express';

import CategoryController from '../controllers/category.controller';
import { ApiError, ApiSuccess, Category } from '../types';

const router = express.Router();
const Category = new CategoryController();

router.get('/categories', async (req: Request, res: Response) => {
  const response: Category[] | ApiError = await Category.get();

  if ('status' in response && response.status) {
    res.json(response).status(response.status);
  }

  res.json(response).status(200);
});
router.post('/categories', async (req: Request, res: Response) => {
  const response: Category | ApiError = await Category.create(req.body);

  if ('status' in response && response.status) {
    return res.json(response).status(response.status);
  }

  return res.json(response).status(200);
});
router.put('/categories', async (req: Request, res: Response) => {
  const response: ApiSuccess | ApiError = await Category.update(req.body);

  if ('status' in response && response.status) {
    return res.json(response).status(response.status);
  }

  return res.json(response).status(204);
});
router.delete('/categories/:id', async (req: Request, res: Response) => {
  const response: ApiSuccess | ApiError = await Category.delete(req.params.id);

  if ('status' in response && response.status) {
    return res.json(response).status(response.status);
  }

  res.json(response).status(204);
});

export default router;
