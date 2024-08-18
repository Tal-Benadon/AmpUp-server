import mongoose, { SchemaTypes } from "mongoose";
import IChallenge from "../interfaces/IChallenge";
import IStoreItem from "../interfaces/IStoreItem";
import ICard from "../interfaces/ICard";
import IMedia from "../interfaces/IMedia";

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

const mediaSchema = new mongoose.Schema<IMedia>({
    type: {
        type: String,
        enum: ["image", "video", "audio", "document", "other"]
    },
    fileName: {
        type: String,
    },
    path: {
        type: String,
    },
    size: {
        type: String,
    }
})


const cardSchema = new mongoose.Schema<ICard>({
    day: {
        type: Number,
        required: true,
    },
    cardOrder: {
        type: Number,
        required: true,
    },
    cardType: {
        type: String,
        required: true,
        enum: ['question', 'task', 'media', 'study', 'support', 'share', 'lottery']
    },
    subType: {
        type: String,
        enum: ['multipleChoice', 'url', 'freeText', 'upload', 'multipleChoice+freeText']
    },
    answers: {
        type: [String],
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    media: mediaSchema,
    coins: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
    drawProbability: {
        type: Number,
    },
    winProbability: {
        type: Number,
    },
})



const challengeSchema = new mongoose.Schema<IChallenge>({
    challengeName: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    subDescription: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    tags: [{
        type: String,
        required: true,
    }],
    isPublic: {
        type: Boolean,
        required: true,
    },
    isTemplate: {
        type: Boolean,
        required: true,
    },
    creator: {
        type: SchemaTypes.ObjectId,
        ref: 'coach'
    }, 
    store: [storeItemSchema],
    cards: [cardSchema],
})

export default mongoose.model<IChallenge>('challenge', challengeSchema)