
import mongoose, { Schema, Document } from 'mongoose';

interface IGroup extends Document {
    name: string;
    description?: string;
    createdBy: mongoose.Types.ObjectId;
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
    createdBy:{
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

const Group = mongoose.model<IGroup>('Group', GroupSchema);

export { Group, IGroup };
