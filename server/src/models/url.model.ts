import { Schema, Document, model, Types } from 'mongoose';

export interface IURL extends Document {
    shortCode: string;
    originalUrl: string;
    userId: Types.ObjectId;
    createdAt: Date;
}

const URLSchema = new Schema<IURL>({
    shortCode: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    originalUrl: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const URL = model<IURL>('URL', URLSchema);