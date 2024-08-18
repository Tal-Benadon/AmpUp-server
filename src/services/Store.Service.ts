import ChallengeController from "../controllers/ChallengeController";
import MemberController from "../controllers/MemberControllers";
import IChallenge from "../interfaces/IChallenge";
import IMember from "../interfaces/IMember";
import IStoreItem from "../interfaces/IStoreItem";
import { IMyCoins } from "../models/MemberModel";
import MemberService from "../services/MemberService";

export default class StoreService {
  static controller = new ChallengeController();

  static async getChallenge(_id: string): Promise<IStoreItem[]> {
    const challenge = await this.controller.readOne(_id);
    console.log(" s ", challenge);

    if (!challenge) {
      throw new Error("this challenge dose not exist ");
    }
    return challenge.store.filter((i) => {
      if (i.daysToExpiry > 0 && i.quantity > 0) {
        return i;
      }
    });
  }
  static async updateMemberItems(
    memberId: string,
    challengeId: string,
    storeItemId: string
  ): Promise<IChallenge | null> {

    const memberController = new MemberController();
    const challengeController = new ChallengeController();
    // try{
    let m = await memberController.readOne(memberId);
    if (!m) return null;
    const member: IMember = m?.toObject?.() as IMember
    let memberCoinsObj: IMyCoins | undefined = member?.myCoins.find(obj => obj.challengeId == challengeId);
    let memberCoins: number | undefined = memberCoinsObj?.coins
    let challenge: IChallenge | null = await challengeController.readOne(challengeId);

    let price = challenge?.store.find((c) => c._id == storeItemId)?.coins;
    let quantity = challenge?.store.find((c) => c._id == storeItemId)?.quantity;

    if (memberCoins && price && challenge) {
      if (memberCoins > price) {
        const coinsUpdate = member?.myCoins?.map?.(c => c.challengeId === challengeId ? { ...c, coins: c.coins - price } : c) || []
        let newStoreItem = await MemberService.addNewStoreItem(memberId, { cardId: storeItemId, challengeId: challengeId });
        let newCoineSum = await MemberService.updateMemberCoins(memberId, coinsUpdate);
        let newQuantity = await challengeController.updateQuantity(challengeId, storeItemId, quantity ? quantity - 1 : 0)
        return await challengeController.readOne(challengeId);
      }
    } return null
  }
}

//todo
//expiry day  -new data
