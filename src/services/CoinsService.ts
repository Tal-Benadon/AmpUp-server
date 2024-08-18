import activeChallengeController from "../controllers/ActiveChallengeController";
import ChallengeController from "../controllers/ChallengeController";
import MemberController from "../controllers/MemberControllers";
import CoinsRequest from "../dto/coins/CoinsRequest";
import IActiveChallenge, { IActiveCard } from "../interfaces/IActiveChallenge";

export default class CoinsService {
    static activeChallengeController = new activeChallengeController();
    static memberController = new MemberController();
    static challengeController = new ChallengeController();

    static async addCoins(data: CoinsRequest): Promise<object> {
        let activeChallenge: IActiveChallenge = (await this.activeChallengeController.read({ challenge: data.challengeId }))[0]
        let currentDay = await this.getCurrentChallengeDay(activeChallenge)
        let cards: IActiveCard[] = activeChallenge.cards.filter(c =>
            String(c.member) == String(data.userId) && c.challengeDay == currentDay
        )

        let cardsOfChallenge = (await this.challengeController.readOne(data.challengeId))?.cards.filter((c) => c.day == currentDay && c.cardType != 'support' && c.cardType != 'share' && c.cardType != 'lottery')

        if (cards.length != cardsOfChallenge?.length) throw 'error : The number of tickets sent does not match the number in the system'

        let newCoins = 0
        cards.forEach(c => newCoins += c.coins)
        let member = await this.memberController.readOne(data.userId)
        if (member?.coins) member.coins += newCoins
        if (member) await this.memberController.save(member)
        return { coins: member?.coins }
    }

    static async getCurrentChallengeDay(activeChallenge: IActiveChallenge) {
        let currentDay = Math.floor((Date.now() - activeChallenge.startDate.getTime()) / (1000 * 60 * 60 * 24))
        return currentDay
    }
}