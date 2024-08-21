// controllers/bill-controller.ts
import { Request, Response, NextFunction } from 'express';
import { createBill, updateBill } from '../services/bill-service.js';
import { validateCreateBillData } from '../utils/bill-validator.js';
import ErrorHandler from '../utils/utility-class.js';

export const createBillHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationErrors = validateCreateBillData(req.body);
        if (validationErrors) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validationErrors
            });
        }

        const newBill = await createBill(req.body);

        if(newBill instanceof ErrorHandler) return next(newBill);

        res.status(201).json({
            success: true,
            bill: newBill
        });
    } catch (err: any) {
        return new ErrorHandler(`Bill creation failed: ${err.message}`, 500);
    }
};

export const updateBillController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const billId = req.params.billId;
        const data = req.body;

        const updatedBill = await updateBill(billId, data);

        res.status(200).json({
            success: true,
            bill: updatedBill
        });
    } catch (err: any) {
        next(new ErrorHandler(err.message, err.status || 500));
    }
};