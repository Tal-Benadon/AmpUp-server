import activeChallengeController from "../../controllers/ActiveChallengeController";
import { isValidEmail } from "../../helpers/isValidEmail";

export default class AddMemberService {
    static controller = new activeChallengeController()
static async addMember(challengeId : string, newMember : string){
    
   if (!isValidEmail(newMember))throw {code: 400 ,messag: "not valid email "}

   return await this.controller.update(challengeId, { $push: { invited: newMember } })

}


}