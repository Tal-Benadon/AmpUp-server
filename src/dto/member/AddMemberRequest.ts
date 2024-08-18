import  { ObjectId } from 'mongodb'
import INotifications from '../../interfaces/INotifications'

export default class AddMemberRequest {
    fullName: string
    email: string
    phone: number
    img?: string
    link?: string
    linkToSocialNetworks: string[]
    myChallenge: ObjectId[]
    coins: number
    notifications: INotifications[]

    constructor(fullName = '', email = '', phone = 0, img = '', link = '', linkToSocialNetworks = [], myChallenge = [], coins = 0, notifications = []) {
        this.fullName = fullName
        this.email = email
        this.phone = phone
        this.img = img
        this.link = link
        this.linkToSocialNetworks = linkToSocialNetworks
        this.myChallenge = myChallenge
        this.coins = coins
        this.notifications = notifications
    }

}