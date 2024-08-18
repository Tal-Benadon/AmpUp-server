import mongoose from 'mongoose';
import ICoach from '../interfaces/ICoach'

const coachSchema = new mongoose.Schema<ICoach>({
    fullName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },
    link: {
        type: String
    },
    myChallenges: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'challenge'
    }]
})

export default mongoose.model<ICoach>('coach', coachSchema)