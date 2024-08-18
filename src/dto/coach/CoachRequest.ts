import { ObjectId } from "mongoose"

export class CreateCoachRequest {
    fullName: string
    email: string
    title: string
    phoneNumber: string
    img: string
    link: string
    myChallenges: ObjectId[]

    constructor(fn = '', email = '', title= '', phoneN = '', img = '', link = '', ch = []) {
        this.fullName = fn
        this.email = email
        this.title = title
        this.phoneNumber = phoneN
        this.img = img
        this.link = link
        this.myChallenges = ch
    }
}

export class UpdateCoachRequest {
    fullName?: string
    email?: string
    phoneNumber?: string
    picture?: string
    link?: string
    myChallenges?: ObjectId[]

    constructor(fn = '', email = '', pn = '', pic = '', link = '', ch = []) {
        this.fullName = fn
        this.email = email
        this.phoneNumber = pn
        this.picture = pic
        this.link = link
        this.myChallenges = ch
    }
}
