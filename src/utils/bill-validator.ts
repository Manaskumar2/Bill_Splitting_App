// utils/validation.ts
import mongoose from 'mongoose';

interface IValidateCreateBillData {
    groupId: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    items: { name: string; quantity: number; price: number; }[];
    totalAmount: number;
    splitType: 'equal' | 'custom' | 'percentage';
    splitDetails: { userId: mongoose.Types.ObjectId; amount?: number; percentage?: number; }[];
}

export const validateCreateBillData = (data: IValidateCreateBillData) => {
    const errors: string[] = [];

    // Check groupId and createdBy
    if (!mongoose.Types.ObjectId.isValid(data.groupId)) {
        errors.push('Invalid groupId format.');
    }
    if (!mongoose.Types.ObjectId.isValid(data.createdBy)) {
        errors.push('Invalid createdBy format.');
    }

    // Check items
    if (!Array.isArray(data.items) || data.items.length === 0) {
        errors.push('Items array is required and should not be empty.');
    } else {
        data.items.forEach((item, index) => {
            if (!item.name || typeof item.name !== 'string') {
                errors.push(`Item ${index + 1}: Name is required and should be a string.`);
            }
            if (typeof item.quantity !== 'number' || item.quantity <= 0) {
                errors.push(`Item ${index + 1}: Quantity should be a positive number.`);
            }
            if (typeof item.price !== 'number' || item.price <= 0) {
                errors.push(`Item ${index + 1}: Price should be a positive number.`);
            }
        });
    }

    // Check totalAmount
    if (typeof data.totalAmount !== 'number' || data.totalAmount <= 0) {
        errors.push('Total amount should be a positive number.');
    }

    // Check splitType
    if (!['equal', 'custom', 'percentage'].includes(data.splitType)) {
        errors.push('Invalid splitType. Must be "equal", "custom", or "percentage".');
    }

    // Check splitDetails
    if (!Array.isArray(data.splitDetails) || data.splitDetails.length === 0) {
        errors.push('Split details array is required and should not be empty.');
    } else {
        data.splitDetails.forEach((detail, index) => {
            if (!mongoose.Types.ObjectId.isValid(detail.userId)) {
                errors.push(`Split detail ${index + 1}: Invalid userId format.`);
            }
            if (data.splitType === 'custom' && (detail.amount == null || detail.amount <= 0)) {
                errors.push(`Split detail ${index + 1}: Amount is required and should be positive for custom split.`);
            }
            if (data.splitType === 'percentage' && (detail.percentage == null || detail.percentage <= 0 || detail.percentage > 100)) {
                errors.push(`Split detail ${index + 1}: Percentage should be between 1 and 100 for percentage split.`);
            }
        });
    }

    return errors.length > 0 ? errors : null;
};


export const validateUpdateBillData = (data: any) => {
    const errors: string[] = [];

    if (data.items !== undefined && !Array.isArray(data.items)) {
        errors.push('Items should be an array.');
    }
    if (data.totalAmount !== undefined && (typeof data.totalAmount !== 'number' || data.totalAmount <= 0)) {
        errors.push('Total amount should be a positive number.');
    }
    if (data.splitType !== undefined && !['equal', 'custom', 'percentage'].includes(data.splitType)) {
        errors.push('Invalid splitType. Must be "equal", "custom", or "percentage".');
    }
    if (data.splitDetails !== undefined) {
        data.splitDetails.forEach((detail: any, index: number) => {
            if (!mongoose.Types.ObjectId.isValid(detail.userId)) {
                errors.push(`Split detail ${index + 1}: Invalid userId format.`);
            }
            if (data.splitType === 'custom' && (detail.amount == null || detail.amount <= 0)) {
                errors.push(`Split detail ${index + 1}: Amount is required and should be positive for custom split.`);
            }
            if (data.splitType === 'percentage' && (detail.percentage == null || detail.percentage <= 0 || detail.percentage > 100)) {
                errors.push(`Split detail ${index + 1}: Percentage should be between 1 and 100 for percentage split.`);
            }
        });
    }
    if (data.userShares !== undefined) {
        data.userShares.forEach((share: any, index: number) => {
            if (!mongoose.Types.ObjectId.isValid(share.userId)) {
                errors.push(`User share ${index + 1}: Invalid userId format.`);
            }
            if (typeof share.shareAmount !== 'number' || share.shareAmount < 0) {
                errors.push(`User share ${index + 1}: Share amount should be a non-negative number.`);
            }
        });
    }

    return errors.length > 0 ? errors : null;
};
