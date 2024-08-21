import { Request, Response, NextFunction } from 'express';
import { createGroup, addMemberToGroup, removeMemberFromGroup, getGroupById } from '../services/group-service.js';
import ErrorHandler from '../utils/utility-class.js';
import { TryCatch } from '../middlewares/error.js';
import { validateGroupName, validateGroupDescription, isValidObjectId } from '../utils/validators.js';

export const createGroupHandler = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { name, description } = req.body;

    if (!validateGroupName(name)) return next(new ErrorHandler('Invalid group name', 400));
    if (description && !validateGroupDescription(description)) return next(new ErrorHandler('Invalid group description', 400));

    const newGroup = await createGroup(req.body);

     if (user instanceof ErrorHandler)return next(user);

    res.status(201).json({
        success: true,
        group: newGroup
    });
});

export const addMemberHandler = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;
    const { groupId } = req.params;

    if (!isValidObjectId(userId)) return next(new ErrorHandler('Invalid user ID', 400));
    if (!isValidObjectId(groupId)) return next(new ErrorHandler('Invalid group ID', 400));

    const updatedGroup = await addMemberToGroup(groupId, userId);

     if (user instanceof ErrorHandler)return next(user);

    res.status(200).json({
        success: true,
        group: updatedGroup
    });
});

export const removeMemberHandler = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;
    const { groupId } = req.params;

    if (!isValidObjectId(userId)) return next(new ErrorHandler('Invalid user ID', 400));
    if (!isValidObjectId(groupId)) return next(new ErrorHandler('Invalid group ID', 400));

    const updatedGroup = await removeMemberFromGroup(groupId, userId);

     if (user instanceof ErrorHandler)return next(user);

    res.status(200).json({
        success: true,
        group: updatedGroup
    });
});

export const getGroupHandler = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) return next(new ErrorHandler('Invalid group ID', 400));

    const group = await getGroupById(id);

     if (user instanceof ErrorHandler)return next(user);
     
    res.status(200).json({
        success: true,
        group
    });
});
