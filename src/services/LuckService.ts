import ChallengeController from "../controllers/ChallengeController";
import LuckResponse from "../dto/luck/LuckResponse";
import { RandomNumberGenerator } from "../helpers/luck";
import { ObjectId } from "mongoose";
import IActiveChallenge, { IActiveCard } from "../interfaces/IActiveChallenge";
export class LuckHelper {
  static RandomGenerator = new RandomNumberGenerator()
  static shapes: string[] = ["cherry", "diamond", "bell", "clover", "currency", "lemon"];
  // // דובדבן יהלום פעמון תלתן מטבע לימון
  static getShapes = [
    { "cherry": 20 },
    { "diamond": 100 },
    { "bell": 30 },
    { "clover": 40 },
    { "currency": 50 },
    { "lemon": 10 },
  ];
  static getLottery(drawProbability: number): boolean {
    return drawProbability >= this.RandomGenerator.getRandom(0, 1);
  }

  static getWin(winProbability: number): any {
    const res = this.RandomGenerator.getRandom(0, 1);
    const rand5 = () => this.RandomGenerator.getRandom(0, 5);
    let isWin = winProbability < res;
    let luckResponse = new LuckResponse(isWin);
    if (!isWin) {
      let resArr = [this.shapes[rand5()], this.shapes[rand5()]];

      let three = this.shapes[rand5()];
      while (resArr.every((c) => c == three)) {
        three = this.shapes[rand5()];
      }
      luckResponse.values = [three, ...resArr];
      return luckResponse;
    }

    luckResponse.values = [this.shapes[rand5()]];
    luckResponse.coin = 200;
    luckResponse.actionCards = [];
    return luckResponse;
  }
}

export default class LuckService {
  static controller = new ChallengeController();

  static async getCasino(
    challengeId: string,
    cardId: string
  ): Promise<boolean> {
    let challenge = await this.controller.readOne(challengeId);
    if (!challenge) throw { code: 400, message: "go to hell!!!" };
    let chance = challenge.cards.find((c) => String(c._id) === cardId);
    if (!chance || chance.drawProbability === undefined) {
      throw { code: 400, message: "Card or drawProbability not found" };
    }
    return LuckHelper.getLottery(chance.drawProbability);
  }

  static async getResCasino(challengeId: string, cardId: string): Promise<any> {
    let challenge = await this.controller.readOne(challengeId);
    if (!challenge) throw { code: 400, message: "go to hell!!!" };
    let chance = challenge.cards.find((c) => String(c._id) === cardId);

    if (!chance || chance.winProbability === undefined) {
      throw { code: 400, message: "Card or winProbability not found" };
    }
    return LuckHelper.getWin(chance.winProbability);
  }


}
