import { Router } from 'express';

import categoryRouter from './category.router';
import offerRouter from './offer.routes';

const rootRouter = Router();

rootRouter.use(categoryRouter);
rootRouter.use(offerRouter);

export default rootRouter;
