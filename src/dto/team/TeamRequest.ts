import { ITeam, ITeamMember } from "../../interfaces/ITeam";


export class CreateTeamRequest {
    teamName: string;
    members: ITeamMember[];

    constructor(teamName: string = '', members: ITeamMember[] = []) {
        this.teamName = teamName
        this.members = members
    }
}


export class UpdateTeamRequest {
    teamName?: string;
    members?: UpdateTeamMemberRequest[];

    constructor(teamName: string = '', members: UpdateTeamMemberRequest[] = []) {
        this.teamName = teamName
        this.members = members
    }
}


export class UpdateTeamMemberRequest {
    _id?: string;
    fullName?: string;
    phoneNumber?: string;
    email?: string;
    isRegistered?: boolean;

    constructor(
        fullName: string = '',
        phoneNumber: string = '',
        email: string = '',
        isRegistered: boolean = false
        , _id: string = ''
    ) {
        this.fullName = fullName
        this.phoneNumber = phoneNumber
        this.email = email
        this.isRegistered = isRegistered
        this._id = _id
    }
}

export class CreateTeamMemberRequest {
    fullName: string;
    phoneNumber: string;
    email: string;
    isRegistered: boolean;

    constructor(
        fullName: string = '',
        phoneNumber: string = '',
        email: string = '',
        isRegistered: boolean = false
    ) {
        this.fullName = fullName
        this.phoneNumber = phoneNumber
        this.email = email
        this.isRegistered = isRegistered
    }
}

