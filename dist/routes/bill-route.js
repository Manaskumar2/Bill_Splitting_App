import { Router } from 'express';
const router = Router();
import { authenticateJWT } from '../middlewares/auth.js';
import { createBillHandler, getBillHandler } from '../controllers/bill-cntrl.js';
router.get('/:id', authenticateJWT, getBillHandler);
router.post('/create', authenticateJWT, createBillHandler);
router.put('/:billId', authenticateJWT, createBillHandler);
export default router;
