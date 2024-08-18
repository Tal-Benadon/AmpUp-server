import { ObjectId } from "mongodb";
import IMember from "./IMember";
import { Document } from "mongoose";


export interface ITeamMember {
    _id?: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    isRegistered: boolean;
    member?: string | IMember | ObjectId
}

export interface ITeam extends Partial<Document> {
    teamName: string;
    members: ITeamMember[];
}