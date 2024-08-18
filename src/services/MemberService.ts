import { ObjectId } from "mongodb";
import activeChallengeController from "../controllers/ActiveChallengeController";
import ChallengeController from "../controllers/ChallengeController";
import MemberController from "../controllers/MemberControllers";
import AddMemberRequest from "../dto/member/AddMemberRequest";
import UpdateMemberRequest from "../dto/member/UpdateMemberRequest";
import IMember from "../interfaces/IMember";
import IMemberItem from "../interfaces/IMemberItem";
import { IMyCoins } from "../models/MemberModel";

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexPhone = /^[1-9]\d{1,14}$/;
const regexLink = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;

type ValidationRules = {
    [K in keyof UpdateMemberRequest]?: (value: any) => void;
};

const validation: ValidationRules = {
    fullName: (fullName: string) => { if (fullName.length <= 0) throw 'the name is not exist' },
    email: (email: string) => { if (!regexEmail.test(email)) throw 'the email is not valid' },
    phone: (phone: number) => { if (!regexPhone.test(String(phone))) throw 'the phone is not valid' },
    link: (link: string) => { if (!regexLink.test(link)) throw 'the link is not valid' },
    linkToSocialNetworks: (linkToSocialNetworks: string[]) => { linkToSocialNetworks.forEach(l => { if (!regexLink.test(l)) throw 'there is link in list links is not valid' }) }
}


export default class MemberService {

    static controller = new MemberController();
    static activeChallengeController = new activeChallengeController()
    static async getsingelMember(id: string): Promise<IMember | null> {
        // {member , token, myActivChallenges}
        return await this.controller.readOne(id)
    }

    static async getsingelMemberChallenges(id: string): Promise<IMember | null> {
        return await this.controller.readWithChallenge(id)
    }

    static async addNewStoreItem(memberId: string, storeItem: IMemberItem): Promise<IMember | null> {
        return await this.controller.updateStoreItem(memberId, storeItem)
    }
    static async updateMemberCoins(memberId: string, newCoins: IMyCoins[]): Promise<IMember | null> {
        return await this.controller.updateCoins(memberId, newCoins)
    }
    static async getPersonalInfo(id: string): Promise<IMember | null> {
        const memberInfo: IMember | null = await this.controller.readOneProj(id, '-coins -notifications -_id')
        return memberInfo
    }

    static async createNewMember(data: AddMemberRequest): Promise<IMember | null> {
        let newMember: IMember = {
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            img: data.img,
            link: data.link,
            linksToSocialNetwork: data.linkToSocialNetworks,
            myChallenge: data.myChallenge,
            myActiveChallenge: [],
            myInvites: [],
            coins: data.coins,
            myCoins: [{ challengeId: 'data.myChallenge._id', coins: 0 }],
            notifications: data.notifications
        }
        console.log(newMember)

        const createdMember = await this.controller.create(newMember)

        await this.findNewMemberInvites(createdMember._id as ObjectId)
        return createdMember
    }

    static async findNewMemberInvites(createdMemberId: string | ObjectId): Promise<void> {
        const newMember = await this.controller.readOne(createdMemberId)
        if (newMember) {
            const foundChallengesId = await this.activeChallengeController.readSelect({ invited: newMember.email, }, '_id')
            console.log(foundChallengesId);

            this.controller.update(createdMemberId, {
                myInvites: foundChallengesId
            })
        }
    }


    static async updateMember(data: UpdateMemberRequest): Promise<IMember | null> {
        // בהמשך - שמירת התמונה ובדיקות בהתאם
        // מה קורה אם קיבלתי משו לא מהטיפוס הרצוי? מי מחזיר שגיאה?

        (Object.keys(validation) as (keyof UpdateMemberRequest)[]).forEach((key) => {
            if (data[key]) {
                const validate = validation[key];
                if (validate) validate(data[key]);
            }
        });
        let member = await this.controller.update(data.userId, data)
        console.log(member);

        return member
    }


}


