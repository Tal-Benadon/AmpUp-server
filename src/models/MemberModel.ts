import mongoose, { Model, ObjectId } from 'mongoose'
import IMember from '../interfaces/IMember'
import INotifications from '../interfaces/INotifications'
import IStoreItem from '../interfaces/IStoreItem'
import IMemberItem from '../interfaces/IMemberItem'

export interface IMyCoins {
    challengeId: ObjectId | string
    coins: number
}

const myCoinsSchema = new mongoose.Schema<IMyCoins>({
    challengeId: {
        type: String,
        required: true
    },
    coins: {
        type: Number,
        default: 0
    }
})

const notificationsSchema = new mongoose.Schema<INotifications>({
    challenge: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["join", "sent support", "sent message"]
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },

    sender: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const memberItem = new mongoose.Schema<IMemberItem>({
    cardId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    challengeId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'challenge',
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    activeDate: {
        type: Date
    }
})


const memberSchema = new mongoose.Schema<IMember>({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
    },
    img: {
        type: String,
    },
    motto: {
        type: String,
    },
    link: {
        type: String,
    },
    linksToSocialNetwork: [{
        type: String,
        required: true
    }],
    myChallenge: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'challenge',
    }],
    myActiveChallenge: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'activeChallenge',
    }],
    myInvites: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'activeChallenge',
    }],
    myItems: [{
        type: mongoose.SchemaTypes.ObjectId,
    }],
    coins: {
        type: Number,
        required: true,
        default: 0
    },
    myCoins: [myCoinsSchema],
    notifications: [notificationsSchema]
})

export default mongoose.model<IMember>('member', memberSchema)






