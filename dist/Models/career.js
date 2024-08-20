import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    position: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    resumePath: { type: String, required: true },
}, {
    timestamps: true
});
export const User = mongoose.model('User', userSchema);
