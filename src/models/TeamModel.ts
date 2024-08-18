import mongoose from "mongoose";
import { ITeam, ITeamMember } from "../interfaces/ITeam";

const teamMemberSchema = new mongoose.Schema<ITeamMember>({
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isRegistered: {
        type: Boolean,
        default: false,
        required: true
    },
    member:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'member'
    }
})


const teamSchema = new mongoose.Schema<ITeam>({
    teamName: {
        type: String,
        required: true
    },
    members: [teamMemberSchema]

})

export default mongoose.model<ITeam>('team', teamSchema)