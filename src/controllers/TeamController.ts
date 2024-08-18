import mongoose, { FilterQuery, UpdateQuery } from "mongoose";
import IController from "../interfaces/IController";
import { ITeam, ITeamMember } from "../interfaces/ITeam";
import TeamModel from "../models/TeamModel";


export default class TeamController implements IController<ITeam> {

    async create(data: ITeam): Promise<ITeam> {
        return await TeamModel.create(data)
    }
    async read(filter: FilterQuery<ITeam>): Promise<ITeam[]> {
        return await TeamModel.find(filter)
    }

    async del(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    async readOne(id: string): Promise<ITeam | null> {
        return await TeamModel.findById(id)
    }

    async readtFullMember(teamId: string) {
        let fullMembers = await TeamModel.findById(teamId)
        return fullMembers
    }

    async update(id: string, data: UpdateQuery<ITeam>): Promise<ITeam | null> {
        await TeamModel.updateOne({ _id: id }, data)
        return await this.readOne(id)
    }
   
    async updateMemberRegister(teamId: string,data: UpdateQuery<ITeam>) {
        try {
            await TeamModel.updateOne({ _id: teamId }, data);
            return await this.readOne(teamId);
        } catch (error: any) {
            console.error(error);
            return null;
        }
    }

    async updateMember(teamId: string, memberId: string, data: UpdateQuery<ITeam>): Promise<ITeam | null> {
        let update = { $set: {} as Record<string, unknown>}
        Object.keys(data).forEach((key) => {
            update.$set[`members.$.${key}`] = data[key]
        })
        await TeamModel.updateOne({ _id: teamId, "members._id": memberId }, update)
        return await this.readOne(teamId)
    }

    async createMember(teamId: string, data: UpdateQuery<ITeamMember>): Promise<ITeam | null> {
        await TeamModel.updateOne({ _id: teamId }, { $push: { members: data } })
        return await this.readOne(teamId)
    }

    async updateTeamName(id: string, data: UpdateQuery<ITeam>): Promise<ITeam | null> {
        await TeamModel.updateOne({ _id: id }, data)
        return await this.readOne(id)
    }
}