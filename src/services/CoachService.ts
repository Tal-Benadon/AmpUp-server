import CoachController from "../controllers/CoachController";
import { CreateCoachRequest } from "../dto/coach/CoachRequest";
import ICoach from "../interfaces/ICoach";


export default class CoachService {
    static controller = new CoachController()

    static async getSingleCoach(id: string): Promise<ICoach | null> {
        return await this.controller.readOne(id)
    }

    static async createNewCoach(data: CreateCoachRequest): Promise<ICoach | null> {
        let newCoach: ICoach = {
            fullName: data.fullName,
            email: data.email,
            title: data.title,
            phoneNumber: data.phoneNumber,
            picture: data.img,
            link: data.link,
            myChallenges: data.myChallenges
        }
        return await this.controller.create(newCoach)
    }

    static async updateCoach(id: string, data: Partial<ICoach>): Promise<ICoach | null> {
        return await this.controller.update(id, data)
    }

}