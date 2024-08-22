import mongoose from "mongoose";
import { Bill, IBillItem } from "../models/bill.js";
import { calculateUserShares } from "../utils/utility-function.js";
import ErrorHandler from "../utils/utility-class.js";



export const createBill = async (data: {
    groupId: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    items: IBillItem[];
    totalAmount: number;
    splitType: 'equal' | 'custom' | 'percentage';
    splitDetails: { userId: mongoose.Types.ObjectId; amount?: number; percentage?: number; }[];
}) => {
    try {
        const userShares = await calculateUserShares(data.totalAmount, data.splitType, data.splitDetails);

        const newBill = new Bill({
            ...data,
            userShares
        });

        return await newBill.save();
    } catch (err: any) {
        return new ErrorHandler(`Bill creation failed: ${err.message}`, 500);
    }
};
interface IUpdateBillData {
    items?: IBillItem[];
    totalAmount?: number;
    splitType?: 'equal' | 'custom' | 'percentage';
    splitDetails?: { userId: mongoose.Types.ObjectId; amount?: number; percentage?: number; }[];
    userShares?: { userId: mongoose.Types.ObjectId; shareAmount: number; paid: boolean }[];
}
export const updateBill = async (billId:string, data: IUpdateBillData) => {
    try {

        const bill = await Bill.findById(billId);
        if (!bill) {
            throw new ErrorHandler('Bill not found.', 404);
        }

        if (data.items !== undefined) bill.items = data.items;
        if (data.totalAmount !== undefined) bill.totalAmount = data.totalAmount;
        if (data.splitType !== undefined) bill.splitType = data.splitType;
        if (data.splitDetails !== undefined) {
            const userShares = await calculateUserShares(bill.totalAmount, bill.splitType, data.splitDetails);
            bill.userShares = userShares;
        }
        if (data.userShares !== undefined) bill.userShares = data.userShares;

        return await bill.save();
    } catch (err: any) {
        throw new ErrorHandler(`Bill update failed: ${err.message}`, 500);
    }
};
export const getBillById = async (id: string) => {
    try {
        const bill = await Bill.findById(id);

        if (!bill) {
           return new ErrorHandler('Bill not found', 404);
        }

        return bill;
    } catch (err: any) {
        return new ErrorHandler(`Failed to get Bill: ${err.message}`, 500);
    }
};