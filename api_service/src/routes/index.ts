import {Router, RequestHandler} from 'express';
import {processingScores, getLeaderboard} from '../controllers';
import {validateToken} from '../middlewares';

const router = Router();


router.post('/scores', validateToken as RequestHandler, processingScores);
router.get('/leaderboard', validateToken as RequestHandler, getLeaderboard);


export default router;