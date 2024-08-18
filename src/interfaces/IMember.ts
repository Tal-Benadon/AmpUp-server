import { Document } from "mongoose"
import { ObjectId } from "mongodb"
import INotifications from "./INotifications"
import IChallenge from "./IChallenge"
import IMemberItem from "./IMemberItem";
import IActiveChallenge from "./IActiveChallenge";
import { IMyCoins } from "../models/MemberModel";

export default interface IMember extends Partial<Document> {
  fullName: string;
  email: string;
  phone?: number;
  img?: string;
  motto?: string;
  link?: string;
  linksToSocialNetwork?: string[];
  myItems?: IMemberItem[];
  myChallenge: ObjectId[] | IChallenge[]; //NEEDS TO BE ACTIVE CHALLENGE
  myActiveChallenge: ObjectId[] | IActiveChallenge[]
  myInvites: ObjectId[] | IActiveChallenge[];//NEEDS TO BE ACTIVE CHALLENGE
  coins: number;
  myCoins: IMyCoins[];
  notifications: INotifications[];
}
