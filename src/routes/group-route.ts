import express from 'express';
import { authenticateJWT } from '../middlewares/auth.js';
import {
    createGroupHandler,
    addMemberHandler,
    removeMemberHandler,
    getGroupHandler, 
    getUserGroupsHandler, 
    deleteGroupHandler 
} from '../controllers/group-cntrl.js';

const router = express.Router();
router.get('/:id',authenticateJWT,getGroupHandler);
router.get('/',authenticateJWT,getUserGroupsHandler)
router.post('/create',authenticateJWT, createGroupHandler);
router.delete('/:groupId',authenticateJWT, deleteGroupHandler);
router.put('/:groupId/addMember',authenticateJWT, addMemberHandler);
router.delete('/:groupId/removeMember',authenticateJWT, removeMemberHandler);

export default router;
