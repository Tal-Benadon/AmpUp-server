import { Document } from "mongoose"
export default interface IFeedBack extends Partial<Document> {
    subject: string
    name : string
    email: string
    message: string
}