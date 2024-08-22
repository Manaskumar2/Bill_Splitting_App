import { Router } from 'express';
const router = Router();
import { 
    createUserHandler, 
    loginHandler, 
    getUserByIdHandler, 
    updateUserHandler, 
    getAllUsersHandler 
} from '../controllers/user-cntrl.js';
import { authenticateJWT } from '../middlewares/auth.js';
import { apiLimiter } from '../middlewares/rate-limits.js';



router.post('/login',apiLimiter, loginHandler);
router.get('/', authenticateJWT, getAllUsersHandler); 
router.post('/register',apiLimiter, createUserHandler);
router.put('/update', authenticateJWT, updateUserHandler); 
router.get('/:id', authenticateJWT, getUserByIdHandler); 

export default router;
