import mongoose, { Schema, Document } from 'mongoose';

interface IBillItem {
    name: string;
    price: number;
    quantity: number;
}

interface IUserShare {
    paid: boolean;
    shareAmount: number;
    userId: mongoose.Types.ObjectId;
}

interface IBill extends Document {
    items: IBillItem[];
    totalAmount: number;
    userShares: IUserShare[];
    groupId: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    splitType: 'equal' | 'custom' | 'percentage';
}

const BillSchema: Schema = new Schema({
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
    timestamps:true,
});

const Bill = mongoose.model<IBill>('Bill', BillSchema);
export { Bill, BillSchema,IBillItem,IBill,IUserShare}
