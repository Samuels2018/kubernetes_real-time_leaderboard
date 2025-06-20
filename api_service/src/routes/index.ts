import {Router} from 'express';
import {processingScores, getLeaderboard} from '../controllers';
import {validateToken} from '../middlewares';

const router = Router();


router.post('/scores', validateToken, processingScores);
router.get('/leaderboard', validateToken, getLeaderboard);


export default router;