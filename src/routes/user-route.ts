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


router.post('/login', loginHandler);
router.post('/register', createUserHandler);
router.get('/', authenticateJWT, getAllUsersHandler); 
router.put('/update', authenticateJWT, updateUserHandler); 
router.get('/:id', authenticateJWT, getUserByIdHandler); 

export default router;
