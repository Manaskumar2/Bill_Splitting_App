import mongoose from "mongoose";
import { Payment } from "../models/payment.js";
import { Bill } from "../models/bill.js";
import ErrorHandler from "../utils/utility-class.js";
export const createPayment = async (data) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const bill = await Bill.findById(data.billId).session(session);
        if (!bill) {
            return new ErrorHandler("Bill not found", 404);
        }
        const userShare = bill.userShares.find((share) => share.userId.toString() === data.userId.toString());
        if (!userShare) {
            return new ErrorHandler("User not part of the bill", 400);
        }
        if (userShare.shareAmount < data.amount) {
            return new ErrorHandler("Payment amount exceeds user's share", 400);
        }
        userShare.shareAmount -= data.amount;
        if (userShare.shareAmount === 0) {
            userShare.paid = true;
        }
        const newPayment = new Payment({
            ...data,
            status: "COMPLETED",
        });
        await newPayment.save({ session });
        await bill.save({ session });
        await session.commitTransaction();
        session.endSession();
        return newPayment;
    }
    catch (err) {
        await session.abortTransaction();
        session.endSession();
        return new ErrorHandler(`Payment creation failed: ${err.message}`, 500);
    }
};
export const getPaymentHistory = async (filter) => {
    try {
        const query = {};
        if (filter.userId)
            query.userId = filter.userId;
        if (filter.billId)
            query.billId = filter.billId;
        if (filter.groupId)
            query.groupId = filter.groupId;
        const paymentHistory = await Payment.find(query)
            .populate('userId', 'name email')
            .populate('billId', 'totalAmount')
            .sort({ createdAt: -1 });
        return paymentHistory;
    }
    catch (err) {
        return new ErrorHandler(`Failed to retrieve payment history: ${err.message}`, 500);
    }
};
