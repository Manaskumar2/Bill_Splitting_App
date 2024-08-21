import { Bill } from "../models/bill.js";
import { calculateUserShares } from "../utils/utility-function.js";
import ErrorHandler from "../utils/utility-class.js";
export const createBill = async (data) => {
    try {
        const userShares = await calculateUserShares(data.totalAmount, data.splitType, data.splitDetails);
        const newBill = new Bill({
            ...data,
            userShares
        });
        return await newBill.save();
    }
    catch (err) {
        return new ErrorHandler(`Bill creation failed: ${err.message}`, 500);
    }
};
export const updateBill = async (billId, data) => {
    try {
        const bill = await Bill.findById(billId);
        if (!bill) {
            throw new ErrorHandler('Bill not found.', 404);
        }
        if (data.items !== undefined)
            bill.items = data.items;
        if (data.totalAmount !== undefined)
            bill.totalAmount = data.totalAmount;
        if (data.splitType !== undefined)
            bill.splitType = data.splitType;
        if (data.splitDetails !== undefined) {
            const userShares = await calculateUserShares(bill.totalAmount, bill.splitType, data.splitDetails);
            bill.userShares = userShares;
        }
        if (data.userShares !== undefined)
            bill.userShares = data.userShares;
        return await bill.save();
    }
    catch (err) {
        throw new ErrorHandler(`Bill update failed: ${err.message}`, 500);
    }
};
