import { Request, Response, Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import blockManager from '../../../services/BlockManager';

const route = Router();

const SMALLEST_TIMESTAMP = 1438219588; // the timestamp of the first block

route.post(
  '/search-by-timestamp',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      timestamp: Joi.number().integer().min(SMALLEST_TIMESTAMP).max(Date.now() / 1000).required(),
    }),
  }),
  async (req: Request, res: Response) => {
    const block = await blockManager.searchBlockByTimestamp(req.body.timestamp);
    return res.json(block).status(200);
  },
);

export default route;