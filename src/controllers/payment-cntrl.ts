import mongoose from "mongoose";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";
import { isValidObjectId } from "../utils/validators.js";
import { Request, Response, NextFunction } from 'express';
import { createPayment, getPaymentHistory } from "../services/payment-service.js";


export const createPaymentHandler = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { billId, amount, method,groupId } = req.body;
    const userId = req.decodedToken.id;

    if (!isValidObjectId(billId))
        return next(new ErrorHandler("Invalid bill ID", 400));


    const payment = await createPayment({
        billId,
        userId,
        amount,
        method,
        groupId

    });

    if (payment instanceof ErrorHandler)
        return next(payment);

    res.status(201).json({
        success: true,
        payment,
    });
});
export const getPaymentHistoryHandler = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { userId, billId, groupId } = req.query;

    const filter :any= {};

    if (userId) filter.userId = userId;
    if (billId) filter.billId = billId;
    if (groupId) filter.groupId = groupId;

    const paymentHistory = await getPaymentHistory(filter);

    if (paymentHistory instanceof ErrorHandler)
        return next(paymentHistory);

    res.status(200).json({
        success: true,
        paymentHistory,
    });
});
