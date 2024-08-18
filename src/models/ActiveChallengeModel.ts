import mongoose, { Mongoose, SchemaTypes } from 'mongoose'
import IActiveChallenge, { IActiveCard } from '../interfaces/IActiveChallenge';
import IMedia from '../interfaces/IMedia';
import IStoreItem from '../interfaces/IStoreItem';

const storeItemSchema = new mongoose.Schema<IStoreItem>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    coins: {
        type: Number,
        required: true,
    },
    daysToExpiry: {
        type: Number,
        required: true,
    },
    expiryDay: {
        type: Date,
    },
    quantity: {
        type: Number,
        required: true,
    },
    cardType: {
        type: String,
        enum: ['streak2', 'streak4']
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isAction: {
        type: Boolean,
        required: true,
    }

})

const activeMediaSchema = new mongoose.Schema<IMedia>({
    type: {
        type: String,
        required: true,
        enum: ["image", "video", "audio", "document", "other"]
    },
    fileName: {
        type: String,
        required: true,
        unique: true
    },
    path: {
        type: String,
        required: true,
        unique: true
    },
    size: {
        type: String,
    }
})


const activeCardSchema = new mongoose.Schema<IActiveCard>({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "member",
        required: true
    },
    card: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    challengeDay: {
        type: Number,
        required: true
    },
    coins: {
        type: Number,
        required: true
    },
    answerValue: {
        type: String,
        required: true
    },
    answerMedia: [activeMediaSchema]

})

const ActiveChallengeSchema = new mongoose.Schema<IActiveChallenge>({
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "coach",
        required: true
    },
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "challenge",
        required: true
    },
    invited: [{
        type: String, //נכנסים עם email
    }],

    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "member"
    }],
    startDate: {
        type: Date,
        required: true
    },
    cards: [activeCardSchema],
    store: [storeItemSchema],

})


export default mongoose.model<IActiveChallenge>('activeChallenge', ActiveChallengeSchema)