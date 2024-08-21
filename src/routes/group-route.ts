import express from 'express';
import { authenticateJWT } from '../middlewares/auth.js';
import { createGroupHandler, addMemberHandler, removeMemberHandler, getGroupHandler } from '../controllers/group-cntrl.js';

const router = express.Router();

router.get('/:id',authenticateJWT,getGroupHandler);
router.post('/create',authenticateJWT, createGroupHandler);
router.put('/:groupId/addMember',authenticateJWT, addMemberHandler);
router.delete('/:groupId/removeMember',authenticateJWT, removeMemberHandler);

export default router;
