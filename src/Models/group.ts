
import mongoose, { Schema, Document } from 'mongoose';

interface IGroup extends Document {
    name: string;
    description?: string;
    members: mongoose.Types.ObjectId[];
}

const GroupSchema: Schema<IGroup> = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

const Group = mongoose.model<IGroup>('Group', GroupSchema);

export { Group, IGroup };
