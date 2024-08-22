import mongoose from 'mongoose';
const PaymentSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    billId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bill', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    method: { type: String, enum: ['CASH', 'BANK_TRANSFER', 'UPI'], required: true },
    status: { type: String, enum: ['PENDING', 'COMPLETED', 'FAILED'], default: 'PENDING' },
}, { timestamps: true });
export const Payment = mongoose.model('Payment', PaymentSchema);
