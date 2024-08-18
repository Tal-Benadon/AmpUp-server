import { Document, ObjectId } from "mongoose"
import Permission from "../types/Permission"

export default interface INotifications extends Partial<Document> {
    challenge: string | ObjectId | object | void
    type:string
    title:string
    content:string
    isRead:Boolean
    sender: ObjectId | string
    date?: Date
}