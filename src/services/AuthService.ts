import MemberController from "../controllers/MemberControllers";
import activeChallengeController from "../controllers/ActiveChallengeController"
import { ObjectId, Schema } from "mongoose";
import { createToken } from "../middleware/auth"
import { Code } from "mongodb";
import IMember from "../interfaces/IMember";
import ChallengeController from "../controllers/ChallengeController";
import IActiveChallenge from "../interfaces/IActiveChallenge";

export default class AuthService {
    static MemberController = new MemberController();
    static ChallengeController = new ChallengeController();

    static async checkEmail(body: { email: string, name: string, picture: string }) {
        let fullName = body.name
        let img = body.picture
        let email = body.email
        //בודק אם האימייל נמצא בממבר
        let member = (await this.MemberController.read({ email }))[0]

        //אם מצא בודק אם יש צורך לעדכן את התמונה והשם ופועל בהתאם
        if (member) {
            if (!member.fullName) { await this.MemberController.update(member.id, { fullName }) }
            if (!member.img) { await this.MemberController.update(member.id, { img }) }
        }

        //בודק אם האימייל נמצא מוזמן באתגר פעיל כלשהו
        //אם נמצא מוזמן ולא קיים בממבר אז יוצר ממבר 
        let invited = await AuthService.findInvitedActivChaleng(email)
        if (invited.length > 0) {

            if (!member) {
                await this.MemberController.create({
                    email: email,
                    fullName: fullName,
                    img: img,
                    myChallenge: [],
                    coins: 0,
                    notifications: [],
                    myActiveChallenge: [],
                    myInvites: [],
                    myCoins: [],
                })
            }
        }

        // לבסוף שולח את הממבר המעודכן וזורק שגיאה ספציפית למקרה שלא נמצא ממבר
        member = (await this.MemberController.read({ email }))[0]
        if (member == undefined) { throw ({ status: 407, msg: "mamber not exist" }) }

        return member
    }

    static activeChallengeController = new activeChallengeController();
    static async checkActivChaleng(challenge: ObjectId) {
        return await this.activeChallengeController.read({ challenge })
    }
    static async findInvitedActivChaleng(email: string) {
        return await this.activeChallengeController.read({ invited: email })
    }
    static async getMyInvitesAndMyActiveChallenge(email: string) {
        let member = (await this.MemberController.read({ email }))[0]
        let myActivChallenge = member.myActiveChallenge as unknown as ObjectId[]
        let myChallenge = member.myChallenge
        let myInvites = member.myInvites
        let invitedInActivChallenge = await AuthService.findInvitedActivChaleng(email)
        if (invitedInActivChallenge.length > 0) {
            invitedInActivChallenge.forEach(i => {

                if (!myInvites.find(a => a == i.id) &&
                    !myActivChallenge.find(a => a == i.id) &&
                    !myChallenge.find(a => a == i.id)) { myInvites.push(i.id) }
            })
        }

        await this.MemberController.update(member.id, { myInvites })
        let activChallengeOn: ObjectId[] = []
        await Promise.all(myActivChallenge.map(async id => {
            let activChallenge = await AuthService.findByIdActivChaleng(id as ObjectId)
            let challengeID = activChallenge?.challenge
            let startDate = activChallenge?.startDate
            let challenge = await AuthService.findByIdChaleng(challengeID as unknown as ObjectId)
            let duration = challenge?.duration
            let endDate
            if (startDate && duration) {
                endDate = new Date(startDate);
                endDate.setDate(endDate.getDate() + duration);
                if (endDate > new Date()) {
                    activChallengeOn.push(id)
                }
            }
        }))
        const token = createToken({ userId: member.id, userPermission: "user" })
        return ({ member, invites: member.myInvites, myActivChallenge: activChallengeOn, token })
    }
    static async findByIdActivChaleng(id: ObjectId) {
        return await this.activeChallengeController.readOne(id.toString())
    }
    static async findByIdChaleng(id: ObjectId) {
        return await this.ChallengeController.readOne(id)
    }


}
