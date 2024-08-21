import { IGroup, Group } from '../models/group.js';
import ErrorHandler from '../utils/utility-class.js';

export const createGroup = async (data: { name: string; description?: string; }) => {
    try {
        const newGroup: IGroup = new Group(data);
        return await newGroup.save();
    } catch (err: any) {
        return new ErrorHandler(`Group creation failed: ${err.message}`, 500);
    }
};

export const addMemberToGroup = async (groupId: string, userId: string) => {
    try {
        const updatedGroup = await Group.findByIdAndUpdate(
            groupId,
            { $addToSet: { members: userId } },
            { new: true }
        ).populate('members');

        if (!updatedGroup) {
            return new ErrorHandler('Group not found', 404);
        }

        return updatedGroup;
    } catch (err: any) {
       return new ErrorHandler(`Failed to add member: ${err.message}`, 500);
    }
};

export const removeMemberFromGroup = async (groupId: string, userId: string) => {
    try {
        const updatedGroup = await Group.findByIdAndUpdate(
            groupId,
            { $pull: { members: userId } },
            { new: true }
        ).populate('members');

        if (!updatedGroup) {
            return new ErrorHandler('Group not found', 404);
        }

        return updatedGroup;
    } catch (err: any) {
        return new ErrorHandler(`Failed to remove member: ${err.message}`, 500);
    }
};

export const getGroupById = async (id: string) => {
    try {
        const group = await Group.findById(id).populate('members');

        if (!group) {
           return new ErrorHandler('Group not found', 404);
        }

        return group;
    } catch (err: any) {
        return new ErrorHandler(`Failed to get group: ${err.message}`, 500);
    }
};
