import { ObjectId } from "mongodb";



export default interface IMemberItem {
    cardId: ObjectId | string
    challengeId: ObjectId | string
    isActive?: boolean
    activeDate?: Date
}