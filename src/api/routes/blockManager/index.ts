import { Request, Response, Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import blockManager from '../../../services/BlockManager';

const route = Router();

route.post(
  '/search-by-timestamp',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      timestamp: Joi.number().required(),
      network: Joi.string().required(),
    }),
  }),
  async (req: Request, res: Response) => {
    const block = blockManager.searchBlockByTimestamp(req.body.timestamp);
    return res.json(block).status(200);
  },
);

export default route;