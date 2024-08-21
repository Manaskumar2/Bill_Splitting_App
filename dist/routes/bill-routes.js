import { Router } from 'express';
const router = Router();
import { authenticateJWT } from '../middlewares/auth.js';
import { createBillHandler } from '../controllers/bill-cntrl.js';
router.post('/create', authenticateJWT, createBillHandler);
router.put('/:billId', authenticateJWT, createBillHandler);
export default router;
