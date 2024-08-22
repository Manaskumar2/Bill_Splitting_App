import { Router } from 'express';
const router = Router();

import { authenticateJWT } from '../middlewares/auth.js';
import { apiLimiter } from '../middlewares/rate-limits.js';
import { createPaymentHandler, getPaymentHistoryHandler } from '../controllers/payment-cntrl.js';


router.post('/pay',authenticateJWT,createPaymentHandler)
router.get('/history',apiLimiter,authenticateJWT,getPaymentHistoryHandler)

export default router;