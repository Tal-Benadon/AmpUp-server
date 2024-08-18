import mongoose from 'mongoose'
import IUser from '../interfaces/IUser';

const userSchema = new mongoose.Schema<IUser>({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        select: false,
    },
    permission: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

export default mongoose.model<IUser>('user', userSchema)