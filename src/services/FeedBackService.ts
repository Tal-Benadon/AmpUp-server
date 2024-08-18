import FeedBackController from "../controllers/FeedBackComtroller";
import AddFedBackRequest from "../dto/FeedBack/AddFeedBackRequest";
import IFeedBack from "../interfaces/IFeedBack";

export default class FeedBackService {
    static controller = new FeedBackController()
    static async createNewFeedBack(data: AddFedBackRequest): Promise<IFeedBack | null> {
        let newFeadBack: IFeedBack = {
            subject: data.subject,
            name: data.name,
            email: data.email,
            message: data.message
        }
        return await this.controller.create(newFeadBack)
    }

    static async getSingleFeedBack(id: string): Promise<IFeedBack | null> {
        return await this.controller.readOne(id)
    }

    static async getAllFeedBack(): Promise<IFeedBack[]> {
        return await this.controller.read({})
    }

    static async updateFeedBack(id: string, data: Partial<IFeedBack>): Promise<IFeedBack | null> {
        return await this.controller.update(id, data)
    }

    static async deleteFeedBack(id: string): Promise<boolean> {
        return await this.controller.del(id)
    }

}
