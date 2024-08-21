import mongoose, { Schema } from 'mongoose';
const BillSchema = new Schema({
    items: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    userShares: [
        {
            paid: { type: Boolean, default: false },
            shareAmount: { type: Number, required: true },
            userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    groupId: { type: mongoose.Types.ObjectId, ref: 'Group', required: true },
    createdBy: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    splitType: { type: String, enum: ['equal', 'custom', 'percentage'], required: true },
}, {
    timestamps: true,
});
const Bill = mongoose.model('Bill', BillSchema);
export { Bill, BillSchema };
