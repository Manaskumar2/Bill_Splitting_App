import mongoose from 'mongoose';

export interface IPayment{
    billId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    groupId:mongoose.Types.ObjectId;
    amount: number;
    method: 'CASH' | 'BANK_TRANSFER' | 'UPI';
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
    createdAt: Date;
    updatedAt: Date;
}

const PaymentSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    groupId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }, 
    billId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bill', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    method: { type: String, enum: ['CASH', 'BANK_TRANSFER', 'UPI'], required: true },
    status: { type: String, enum: ['PENDING', 'COMPLETED', 'FAILED'], default: 'PENDING' },
}, { timestamps: true });

export const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);
