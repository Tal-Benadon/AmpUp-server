import MemberController from "../controllers/MemberControllers";
import createToken from "../middleware/createToken";
export default class tokenTemporary {
    static memberController = new MemberController()

    static async tokenHamudi(): Promise<string | undefined> {

        let member = (await this.memberController.read({ email: 'miriampuny16@gmail.com' }))[0];
        if (member._id) return createToken({ userId: String(member._id), userPermission: "user" })
    }
}

