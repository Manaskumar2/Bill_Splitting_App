import { TryCatch } from '../middlewares/error.js';
import ErrorHandler from '../utils/utility-class.js';
import { Request, Response, NextFunction } from 'express';
import { validateGroupName, validateGroupDescription, isValidObjectId } from '../utils/validators.js';
import { createGroup, addMembersToGroup, removeMembersFromGroup, getGroupById, deleteGroup, getGroupsByCreatedBy } from '../services/group-service.js';

export const createGroupHandler = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { name, description } = req.body;
    let createdBy =req.decodedToken.id

    if (!validateGroupName(name)) return next(new ErrorHandler('Invalid group name', 400));
    if (description && !validateGroupDescription(description)) return next(new ErrorHandler('Invalid group description', 400));

    const newGroup = await createGroup({name,description,createdBy});

     if (newGroup instanceof ErrorHandler)return next(newGroup);

    res.status(201).json({
        success: true,
        group: newGroup
    });
});

export const addMemberHandler = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { userIds } = req.body;
    const { groupId } = req.params;
    const requestUserId = req.decodedToken.id

    if (!isValidObjectId(groupId)) return next(new ErrorHandler('Invalid group ID', 400));

    const updatedGroup = await addMembersToGroup(groupId, userIds,requestUserId);

     if (updatedGroup instanceof ErrorHandler)return next(updatedGroup);

    res.status(200).json({
        success: true,
        group: updatedGroup
    });
});

export const removeMemberHandler = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { userIds } = req.body;
    const { groupId } = req.params;
    const requestUserId = req.decodedToken.id;

    if (!isValidObjectId(groupId)) return next(new ErrorHandler('Invalid group ID', 400));

    const updatedGroup = await removeMembersFromGroup(groupId, userIds,requestUserId);

     if (updatedGroup instanceof ErrorHandler)return next(updatedGroup);

    res.status(200).json({
        success: true,
        group: updatedGroup
    });
});

export const getGroupHandler = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) return next(new ErrorHandler('Invalid group ID', 400));

    const group = await getGroupById(id);

     if (group instanceof ErrorHandler)return next(group);
     
    res.status(200).json({
        success: true,
        group
    });
});
export const deleteGroupHandler = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.decodedToken.id

    if (!isValidObjectId(id)) return next(new ErrorHandler('Invalid group ID', 400));

    const group = await deleteGroup(id,userId);

     if (group instanceof ErrorHandler)return next(group);
     
    res.status(200).json({
        success: true,
        group
    });
});
export const getUserGroupsHandler = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
   const userId = req.decodedToken.id

    if (!isValidObjectId(userId)) return next(new ErrorHandler('Please Login', 400));

    const group = await getGroupsByCreatedBy(userId);

     if (group instanceof ErrorHandler)return next(group);
     
    res.status(200).json({
        success: true,
        group
    });
});

