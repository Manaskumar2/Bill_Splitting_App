import { Router } from 'express';
const router = Router();
import { 
    createUserHandler, 
    loginHandler, 
    getUserByIdHandler, 
    updateUserHandler, 
    getAllUsersHandler 
} from '../Controllers/user-ctrl.js';
import { authenticateJWT } from '../middlewares/auth.js';


router.post('/login', loginHandler);
router.post('/register', createUserHandler);
router.get('/', authenticateJWT, getAllUsersHandler); 
router.put('/update', authenticateJWT, updateUserHandler); 
router.get('/:id', authenticateJWT, getUserByIdHandler); 

export default router;
