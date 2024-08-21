import mongoose, { Schema } from 'mongoose';
const GroupSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
}, {
    timestamps: true
});
const Group = mongoose.model('Group', GroupSchema);
export { Group };
