import mongoose from 'mongoose';
import { IGroup, Group } from '../models/group.js';
import ErrorHandler from '../utils/utility-class.js';

export const createGroup = async (data:any) => {
    try {
        let newGroup: IGroup = new Group();
        newGroup.name = data.name;
        newGroup.createdBy = data.createdBy;
        newGroup.description = data.description;

        return await Group.create(newGroup);
    } catch (err: any) {
        return new ErrorHandler(`Group creation failed: ${err.message}`, 500);
    }
};

export const addMembersToGroup = async (groupId: string, userIds: string[], requestUserId: string) => {
    try {

        const group = await Group.findById(groupId);

        if (!group) {
            return new ErrorHandler('Group not found', 404);
        }
        if (group.createdBy.toString() !== requestUserId) {
            return new ErrorHandler('Only the group creator can add members', 403);
        }

        const objectIds = userIds.map(id => new mongoose.Types.ObjectId(id));

        const updatedGroup = await Group.findByIdAndUpdate(
            groupId,
            { $addToSet: { members:{ $each: objectIds }  } },
            { new: true }
        ).populate('members');

        if (!updatedGroup) {
            return new ErrorHandler('Failed to add member to group', 400);
        }

        return updatedGroup;
    } catch (err: any) {
        return new ErrorHandler(`Failed to add member: ${err.message}`, 500);
    }
};
export const removeMembersFromGroup = async (groupId: string, userIds: string[],requestUserId:string) => {
    try {
           const group = await Group.findById(groupId);

        if (!group) {
            return new ErrorHandler('Group not found', 404);
        }
        if (group.createdBy.toString() !== requestUserId) {
            return new ErrorHandler('Only the group creator can add members', 403);
        }

        const objectIds = userIds.map(id => new mongoose.Types.ObjectId(id));


        const updatedGroup = await Group.findByIdAndUpdate(
            groupId,
            { $pull: { members: { $in: objectIds }  } },
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
export const deleteGroup = async (groupId: string, userId: string) => {
    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return new ErrorHandler('Group not found', 404);
        }
        
        if (group.createdBy.toString() !== userId) {
            return new ErrorHandler('You are not authorized to delete this group', 403);
        }

         await Group.findByIdAndDelete(groupId);
        return { message: 'Group deleted successfully' };
    } catch (err: any) {
        return new ErrorHandler(`Group deletion failed: ${err.message}`, 500);
    }
};
export const getGroupsByCreatedBy = async (userId: string) => {
    try {

        return await Group.find({ createdBy: userId }).populate('members');
    } catch (err: any) {
        return new ErrorHandler(`Failed to get groups: ${err.message}`, 500);
    }
};
