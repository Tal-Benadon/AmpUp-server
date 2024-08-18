import { ObjectId } from "mongodb"
import UserAuth from "../../middleware/UserAuth"

export default class UpdateMemberRequest extends UserAuth {
    fullName?: string
    email?: string
    phone?: number
    img?: string
    motto?:string
    link?: string
    linkToSocialNetworks?: string[]
    myChallenge?: ObjectId[]

    constructor(fullName = '', email = '', phone = 0, img = '',motto = '', link = '', linkToSocialNetworks = [], myChallenge = []) {
        super()
        this.fullName = fullName
        this.email = email
        this.phone = phone
        this.img = img
        this.motto = motto
        this.link = link
        this.linkToSocialNetworks = linkToSocialNetworks
        this.myChallenge = myChallenge
    }
}