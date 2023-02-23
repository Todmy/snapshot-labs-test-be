import { Router } from 'express';
import blockManager from './blockManager';

const router = Router();

router.use('/blocks', blockManager);

export default router;
