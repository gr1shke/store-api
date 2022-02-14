import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from './public/swagger.json';
import router from './routes';

if (process.env.NODE_ENV !== 'test') dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);
app.get('/', (req: Request, res: Response) => {
  res.send('Store API');
})

export default app;
