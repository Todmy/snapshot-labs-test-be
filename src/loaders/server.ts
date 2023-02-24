import bodyParser from 'body-parser';
import path from 'path';
import { errors, isCelebrateError } from 'celebrate';
import cors from 'cors';
import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import routes from '../api/routes';

export default (app: express.Application) => {
  app.enable('trust proxy');
  app.use(cors());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(bodyParser.json());
  app.use(errors());

  app.use('/api', routes);

  app.get('/', (req: Request, res: Response) => {
    return res.sendFile(path.join(__dirname, '../views/block-search-form.html'));
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    const error: Error = new Error('Not Found');
    error.status = 404;
    next(error);
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (isCelebrateError(err)) {
      return res.status(422).send({ message: err.message, details: err.details }).end();
    }

    return next(err);
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
