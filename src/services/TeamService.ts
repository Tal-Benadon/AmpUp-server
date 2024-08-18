import TeamController from "../controllers/TeamController";
import { CreateTeamMemberRequest, CreateTeamRequest, UpdateTeamMemberRequest } from "../dto/team/TeamRequest";
import IMember from "../interfaces/IMember";
import { ITeam } from "../interfaces/ITeam";

export default class TeamService {
    static TeamController = new TeamController()


    static async createNewTeam(data: CreateTeamRequest): Promise<ITeam> {
        try {
            const newTeam: ITeam = {
                teamName: data.teamName,
                members: data.members
            };

            return await this.TeamController.create(newTeam);
        } catch (error) {
            throw error;
        }
    }


    static async updateTeamName(id: string, data: Object) {
        try {
            const team = await this.TeamController.readOne(id)
            if (!team) return
            const updatedTeam = await this.TeamController.updateTeamName(id, data)
            return updatedTeam
        } catch (error) {
            throw error;
        }
    }

    static async updateTeamMember(teamId: string, data: UpdateTeamMemberRequest | CreateTeamMemberRequest) {
        try {
            const team = await this.TeamController.readOne(teamId);
            if (!team) return;
            if ('_id' in data) {

                let member = team.members.find(m => m._id == data._id);
                if (!member) {
                    throw new Error('Member not found');
                }
                return await this.TeamController.updateMember(teamId, member._id as string, data as UpdateTeamMemberRequest);
            } else {
                return await this.TeamController.createMember(teamId, data as CreateTeamMemberRequest);
            }
        } catch (error) {
            throw error;
        }
    }


    static async checkIfRegister(teamId: string, memberId: string) {
        try {
            let team = await this.TeamController.readOne(teamId)
            if (!team) return
            let member = team.members.find(m => m._id?.toString() === memberId)
            if (member?.member) return true
            return false
        } catch (error) {
            throw error
        }
    }


    static async updateRegister(teamId: string, memberId: string, data: string) {
        try {
            let team = await this.TeamController.readOne(teamId)
            if (!team) return null
            let member = team.members.find(m => m._id?.toString() === memberId)
            if (!member) return null
            member.member = data
            member.isRegistered = true
    
            let newData = { members: team.members }
            team = await this.TeamController.updateMemberRegister(teamId, newData)
            if (!team) return null
            return team
        } catch (error) {
            console.error(error)
            return null
        }
    }

}