import { Document, ObjectId } from "mongoose"

export default interface ICoach extends Partial<Document> {
    fullName: string
    title: string
    email: string
    phoneNumber: string
    picture: string
    link: string
    myChallenges: ObjectId[]
    password?: string
}

