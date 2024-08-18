import { ObjectId } from 'mongodb';
import { ObjectId as mongooseId } from 'mongoose'
import { isValidObjectId } from "mongoose";
import activeChallengeController from "../controllers/ActiveChallengeController";
import ChallengeController from "../controllers/ChallengeController";
import MemberController from "../controllers/MemberControllers";
import GetActiveChallToStartReq from "../dto/activeChallenge/GetActiveChallToStartReq";
import { FutureDateCalc } from "../helpers/FutureDateCalc";
import { RandomNumberGenerator } from "../helpers/luck";
import IChallenge from "../interfaces/IChallenge";
import ICoach from "../interfaces/ICoach";
import IMember from "../interfaces/IMember";

import IActiveChallenge, { IActiveCard } from "../interfaces/IActiveChallenge";
import ICard from '../interfaces/ICard';
import GetStatusDoneCardsRes from '../dto/activeChallenge/GetStatusDoneCardsRes';
import { DaysDoneHelper } from '../helpers/DaysDoneHelper';

export default class ActiveChallegeService {
    static controller = new activeChallengeController();
    static RandomGenerator = new RandomNumberGenerator();
    static memberController = new MemberController();
    static challengeController = new ChallengeController();
    static daysDoneHelper = new DaysDoneHelper()
    static async getSingleActiveChallenge(
        id: string
    ): Promise<IActiveChallenge | null> {
        return await this.controller.readOne(id);
    }

    static async getActiveChallengeToStartScreen(
        id: string
    ): Promise<GetActiveChallToStartReq | null> {
        let activeChallenge: IActiveChallenge | null | undefined =
            await this.controller.readOneWithPopulate(
                id,
                {
                    participants: "img",
                    coach: "fullName picture title",
                    challenge: "challengeName coverImage subDescription duration",
                },
                "startDate participants"
            );
        if (!activeChallenge) return null;

        if (!("_id" in activeChallenge.challenge)) return null;
        const duration = (activeChallenge.challenge as IChallenge)
            .duration as number;
        const futureDate: Date = FutureDateCalc(
            activeChallenge.startDate,
            duration
        );
        const { startDate, challenge, participants, coach } = activeChallenge;
        const res = new GetActiveChallToStartReq(
            startDate,
            futureDate,
            participants as IMember[],
            challenge as IChallenge,
            coach as ICoach
        );
        return res;
    }

    static async getStartDailyDeck(userId: mongooseId, id: string) {


        const activeChallenge: IActiveChallenge | null | undefined = await this.controller.readOneWithPopulate(id, { challenge: '_id cards duration challengeName', coach: 'fullName picture title' })
        if (!activeChallenge) throw ''

        const challenge = activeChallenge.challenge as Partial<IChallenge>
        if (!challenge.cards) throw ''
        const coach: Partial<ICoach> = activeChallenge.coach as Partial<ICoach>
        let cards: ICard[] = challenge.cards as ICard[]
        const totalDays: number = challenge.duration as number
        const challengeName: string = challenge.challengeName as string

        //*** Creates an erray where each element is a card the user submitted in the given active challenge ***//
        const memberCards: IActiveCard[] = this.daysDoneHelper.getMemberCardsArray(userId, activeChallenge)

        //*** Creates an object where each key is the day number and the value is how many cards were submitted in that day ***//
        const memberCardsObj: object = this.daysDoneHelper.getDaysAndDaysToBeDoneObject(memberCards, 'challengeDay')

        //*** calculates current user day submittion streaks (with the logic of if the days were half completed, left out) ***//
        const streakNum: number = await this.daysDoneHelper.checkStreakNumber(memberCardsObj, activeChallenge)



        let currentDay = Math.floor((Date.now() - activeChallenge.startDate.getTime()) / (1000 * 60 * 60 * 24))
        const currentCards: ICard[] = cards.filter(card => card.day == currentDay)
        const cardsStatus: ICard[] = currentCards.map(card => {
            const done: IActiveCard | undefined = memberCards.find(c => String(c.card) == card._id)
            return ({ ...card, done: Boolean(done) })
        })

        const completedDays = Object.keys(memberCardsObj).map(Number)
        return new GetStatusDoneCardsRes(cardsStatus, totalDays, completedDays, coach, challengeName, streakNum)
    }

    // static async getStartDailyDeck(id: string): Promise<>

    static async createNewActiveChallenge(data: any): Promise<IActiveChallenge> {
        if (!data.challenge) {
            throw { code: 400, msg: "challenge not found" };
        }
        if (!data.startDate) {
            throw { code: 400, msg: "start date not found" };
        }
        let newActiveChallenge: IActiveChallenge = {
            coach: data.userId,
            challenge: data.challenge,
            invited: [],
            participants: [],
            startDate: data.startDate,
            cards: [],
            store: []
        };
        return await this.controller.create(newActiveChallenge);
    }

    static async loveCard(challengeId: string): Promise<any> {
        let challenge = await this.controller.readOne(challengeId, "participants");
        if (!challenge) throw { code: 400, message: "go to hell!!!" };
        let num = challenge.participants.length;
        let user =
            challenge.participants[this.RandomGenerator.getRandom(0, num - 1)];
        console.log({ user });

        return await this.memberController.readOne(String(user));
    }

    static async handleCardAnswer(
        activeChallengeId: string,
        cardId: string,
        answer: any
    ): Promise<IActiveCard> {
        if (!activeChallengeId || !cardId) throw { code: 400, msg: "missing data" };
        if (!isValidObjectId(activeChallengeId))
            throw { code: 400, msg: "challengeId is not ObjectId" };
        if (!isValidObjectId(cardId))
            throw { code: 400, msg: "cardId is not ObjectId" };

        // מציאת האתגר בדטאבייס
        // מציאת האתגר הפעיל
        let activeChallenge = await this.controller.readOne(activeChallengeId);
        if (!activeChallenge) throw { code: 400, msg: "Active challenge not found" };
        let challenge = await this.challengeController.readOne(String(activeChallenge.challenge))
        if (!challenge) throw { code: 400, msg: "challenge not found" };

        // מציאת הכרטיס
        let card = challenge.cards.find((card) => card._id == cardId);
        if (!card) throw { code: 400, msg: "card not found" };



        // יצירת הקלף להוספה לאתגר הפעיל
        const cardToAdd: IActiveCard = {
            member: answer.userId,
            card: new ObjectId(card._id),
            challengeDay: card.day,
            coins: card.coins,
            answerValue: answer.value,
            answerMedia: [answer.media],
        };

        console.log("value: ", answer.value);
        // הוספת הקלף החדש לאתגר הפעיל
        await this.controller.update(activeChallenge._id as string, {
            $push: { cards: cardToAdd },
        });
        return cardToAdd;
    }

    static async joinActiveChallenge(memberId: string | ObjectId, activeChallengeId: string | ObjectId) {
        const member = await this.memberController.readOne(memberId)
        const activeChallengeResult = await this.controller.readSelect({ _id: activeChallengeId }, '-cards')
        const activeChallenge = activeChallengeResult[0]
        if (member && activeChallenge) {

            const inviteExists = member.myInvites.find(invite => invite.toString() === activeChallengeId.toString())
            if (inviteExists) {
                const updatedMyInvites = member.myInvites.filter(invite => invite.toString() !== activeChallengeId.toString())
                const updatedActiveChallenges = [...member.myActiveChallenge, activeChallengeId]
                const challengeId = (activeChallenge as IActiveChallenge).challenge
                const updatedChallenges = [...member.myChallenge, challengeId]

                const updatedInvited = (activeChallenge as IActiveChallenge).invited.filter(email => email !== member.email)

                await this.memberController.update(memberId, {
                    myInvites: updatedMyInvites as ObjectId[],
                    myActiveChallenge: updatedActiveChallenges as ObjectId[],
                    myChallenge: updatedChallenges as ObjectId[]
                })

                const result = (activeChallenge as IActiveChallenge).participants.find(memberId => memberId.toString() === (member as IMember)._id?.toString())

                if (!result) {
                    await this.controller.update(activeChallengeId.toString(), {
                        invited: updatedInvited,
                        $push: { participants: member._id }
                    })
                    return { success: true }
                } else {
                    return { success: false }
                }

            } else {
                return { success: false, msg: 'member does not have a valid invite to this challenge' }
            }
        } else {
            return { success: false, msg: 'member or challenge not found' }
        }
    }
}
// class checkWhyGetFeedback(userId: ObjectId, challenge: any): Promise<>{

// }
