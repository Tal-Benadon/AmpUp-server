import { ObjectId } from "mongoose"


export interface ReadCoachResponse{
    fullName: string
    email: string
    phoneNumber: string
    picture: string
    link: string
    myChallenges: ObjectId[]
}

