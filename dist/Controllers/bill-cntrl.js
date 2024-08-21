import { createBill, updateBill } from '../services/bill-service.js';
import { validateCreateBillData } from '../utils/bill-validator.js';
import ErrorHandler from '../utils/utility-class.js';
export const createBillHandler = async (req, res, next) => {
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
        if (newBill instanceof ErrorHandler)
            return next(newBill);
        res.status(201).json({
            success: true,
            bill: newBill
        });
    }
    catch (err) {
        return new ErrorHandler(`Bill creation failed: ${err.message}`, 500);
    }
};
export const updateBillController = async (req, res, next) => {
    try {
        const billId = req.params.billId;
        const data = req.body;
        const updatedBill = await updateBill(billId, data);
        res.status(200).json({
            success: true,
            bill: updatedBill
        });
    }
    catch (err) {
        next(new ErrorHandler(err.message, err.status || 500));
    }
};
