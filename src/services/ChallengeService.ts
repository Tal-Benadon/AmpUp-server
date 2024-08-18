import { ObjectId } from "mongoose";
import ChallengeController from "../controllers/ChallengeController";
import IChallenge from "../interfaces/IChallenge";
import { DaysDoneHelper } from "../helpers/DaysDoneHelper";


export default class ChallengeService {
    static controller = new ChallengeController()
    static DaysDoneHelper = new DaysDoneHelper()
    // פונ שמקבלת פרטי אתגר לא פעיל לפי מה שצריך להציג במסך של הצטרפות לאתגר
    // בינתיים זה לא שמיש כי צריך להציג שם אתגר פעיל אבל אולי יצטרכו חלק מזה למשהו אחר
    static async getOneChallenge(id:string): Promise<IChallenge | null>{
        let challenge = this.controller.readOneWithPopulate(id, { coach: 'fullName picture title'}, 'challengeName coverImage subDescription invited cards')
        // let challenge = this.controller.readOneWithPopulate(id, { coach: 'fullName picture title'}, 'challengeName coverImage subDescription invited')
        return challenge


    }
    // ------------------- EXAMPLE FUNCTION - gets the challenge and checks how many cards the challenge have for each day. 
    static async getChallengeCardAmountPerDay(id: string): Promise<undefined> {
        const challenge = await this.controller.readOne(id)
        const challengeCards = challenge?.cards
        if (challengeCards) {
            const cardsPerDayObj = this.DaysDoneHelper.getDaysAndDaysToBeDoneObject(challengeCards, 'day')
            console.log({ cardsPerDayObj });
            // ----- EXAMPLE OUTCOME { '1': 6, '2': 6, '3': 6, '4': 6, '5': 1, '6': 5, '7': 6 } - day 5 have only 1 card, day 6 have 5
        }
    }
}
// ChallengeService.getChallengeCardAmountPerDay('6656df1b8437151db0cce4ee')
