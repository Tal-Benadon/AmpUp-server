import ChallengeController from "../../controllers/ChallengeController"
import IChallenge from "../../interfaces/IChallenge"


export default class ChallengeService {
    static controller = new ChallengeController()


    static async createChallenge(data: IChallenge): Promise<IChallenge | null> {
        if (data.challengeName.length < 1) throw('need name to the chalenge')
        if (data.subDescription.length < 1) throw('need subDescription to the chalenge')
            // לתקשר עם מי ששומר קבצים ולוודא שקיבלנו תמונה
        // const imageUrlRegex = /^(https?:\/\/\S+\.(?:png|jpe?g|gif|bmp|tiff?|webp)|\S+\.(?:png|jpe?g|gif|bmp|tiff?|webp))$/i;
        // if (!imageUrlRegex.test(data.coverImage)) throw('img is not valid')
        let challenge = this.controller.create(data)
        return challenge
    }
}

