import mongoose from 'mongoose';
import { Group } from '../models/group.js';
import ErrorHandler from '../utils/utility-class.js';
export const createGroup = async (data) => {
    try {
        let newGroup = new Group();
        newGroup.name = data.name;
        newGroup.createdBy = data.createdBy;
        newGroup.description = data.description;
        return await Group.create(newGroup);
    }
    catch (err) {
        return new ErrorHandler(`Group creation failed: ${err.message}`, 500);
    }
};
export const addMemberToGroup = async (groupId, userId, requestUserId) => {
    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return new ErrorHandler('Group not found', 404);
        }
        if (group.createdBy.toString() !== requestUserId) {
            return new ErrorHandler('Only the group creator can add members', 403);
        }
        const updatedGroup = await Group.findByIdAndUpdate(groupId, { $addToSet: { members: new mongoose.Types.ObjectId(userId) } }, { new: true }).populate('members');
        if (!updatedGroup) {
            return new ErrorHandler('Failed to add member to group', 400);
        }
        return updatedGroup;
    }
    catch (err) {
        return new ErrorHandler(`Failed to add member: ${err.message}`, 500);
    }
};
export const removeMemberFromGroup = async (groupId, userId, requestUserId) => {
    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return new ErrorHandler('Group not found', 404);
        }
        if (group.createdBy.toString() !== requestUserId) {
            return new ErrorHandler('Only the group creator can add members', 403);
        }
        const updatedGroup = await Group.findByIdAndUpdate(groupId, { $pull: { members: userId } }, { new: true }).populate('members');
        if (!updatedGroup) {
            return new ErrorHandler('Group not found', 404);
        }
        return updatedGroup;
    }
    catch (err) {
        return new ErrorHandler(`Failed to remove member: ${err.message}`, 500);
    }
};
export const getGroupById = async (id) => {
    try {
        const group = await Group.findById(id).populate('members');
        if (!group) {
            return new ErrorHandler('Group not found', 404);
        }
        return group;
    }
    catch (err) {
        return new ErrorHandler(`Failed to get group: ${err.message}`, 500);
    }
};
