import { Router } from 'express';
import { Asteroids } from '../models/asteroids';

const testAsteriods: Asteroids[] = [];

const router = Router();

router.get('/', (req, res, next)=> {
    res.status(200).json({asteriods: testAsteriods});
});

export default router;