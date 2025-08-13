import { Schema, Document, model } from 'mongoose';
import { ObjectId } from "mongodb";

export interface IUser extends Document {
    _id: ObjectId,
    name: string,
    email: string,
    password?: string;
    authProvider: "google" | "local";
    createdAt: Date;
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: function () {
            return this.authProvider === 'local';
        }
    },
    authProvider: { type: String, enum: ["google", "local"], default: "local" }
}, { timestamps: true });

export const User = model<IUser>('User', UserSchema);

