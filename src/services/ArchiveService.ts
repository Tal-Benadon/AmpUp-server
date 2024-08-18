// import { ObjectId } from "mongoose"
import { Schema, Document, Types, ObjectId } from "mongoose";
import activeChallengeController from "../controllers/ActiveChallengeController"
import ChallengeController from "../controllers/ChallengeController"
import CoachController from "../controllers/CoachController"
import MemberController from "../controllers/MemberControllers"
import IActiveChallenge from "../interfaces/IActiveChallenge"
import IChallenge from "../interfaces/IChallenge"
// import { CardRequest } from "../dto/singleCard/CardRequest"
import { CardResponse } from "../dto/singleCard/CardResponse"

// import { ObjectId: ObjectIdValue } from 'mongodb'
const { ObjectId: ObjectIdValue } = require("mongodb");

export default class ArchiveService {
    static challengeController = new ChallengeController()
    static activeChallengeController = new activeChallengeController()
    static memberController = new MemberController()
    static coachController = new CoachController()



    static async getMemberChallenges(id: string): Promise<IChallenge[] | null> {
        let member = await this.memberController.readWithChallenge(id)
        if (!member) {
            return null;
        }
        let memberChallenges = member?.myChallenge as IChallenge[]
        
        if (!memberChallenges.length) {
            return null;
        }

        let startDates: Array<IActiveChallenge | null> = await Promise.all(
            memberChallenges.map((ch) => {
                const challengeId = (ch as { _id: ObjectId })._id.toString();
                return this.memberController.readStartDate(challengeId);

            })
        );

        let finel = memberChallenges.map((ch, index) => ({
            ...ch,
            challengeId: ch._id,
            startDate: this.formatDate(startDates[index]?.startDate),
            endDate: this.calculateEndDate(startDates[index]?.startDate, ch.duration),
            cards: ch.cards
                .map((card) => ({
                    ...card,
                    date: this.calculateEndDate(startDates[index]?.startDate, card.day)
                }))
                .filter((card) => {
                    if (typeof card.date === 'string') {
                        const dateObj = new Date(card.date);
                        if (!isNaN(dateObj.getTime())) {
                            return this.isDateBeforeToday(dateObj);
                        }
                        if (dateObj === new Date()) {
                            startDates[index]?.cards.find(c => {
                                if (String(c.member) === id) {
                                    return c
                                }
                            })
                        }
                    }
                    return false;
                }).filter((card) => card.cardType === "study")
        }));
        return finel;
    }

    static async getChallenge(challengeId: string): Promise<IChallenge | null> {
        return await this.challengeController.readOne(challengeId);
    }

    static async getCard(challengeId: string, cardId: string): Promise<CardResponse> {
        const challenge = await this.challengeController.readOne(challengeId);
        if (!challenge) {
            throw (`Challenge with id ${challengeId} not found.`);
        }

        const card = challenge.cards.find(card => card._id?.toString() === cardId);
        if (!card || !card._id) {
            throw (`Card with id ${cardId} not found in challenge ${challengeId}.`);
        }

        let cardObjectId: Types.ObjectId;
        try {
            cardObjectId = typeof card._id === 'string' ? new Types.ObjectId(card._id) : card._id;
        } catch (error) {
            throw (`Invalid card ID format: ${card._id}`);
        }

        return new CardResponse(challenge.challengeName, card.title, card.media, cardObjectId, card.content);
    }


    private static calculateEndDate(startDate: Date | undefined, duration: number): string | null {
        if (!startDate || isNaN(startDate.getTime())) {
            console.error('Invalid startDate:', startDate);
            return null;
        }

        if (isNaN(duration)) {
            console.error('Invalid duration:', duration);
            return null;
        }

        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + duration);

        const formattedDay: string = ("0" + endDate.getDate()).slice(-2);
        const formattedMonth: string = ("0" + (endDate.getMonth() + 1)).slice(-2);
        const formattedYear: string = endDate.getFullYear().toString();

        return [formattedYear, formattedMonth, formattedDay].join("-");
    }

    private static isDateBeforeToday(date: Date | string): boolean {
        const today = new Date();
        const inputDate = typeof date === 'string' ? new Date(date) : date;

        return inputDate < today;
    }

    private static formatDate(isoString: Date | undefined): string | null {
        if (!isoString || isNaN(isoString.getTime())) {
            console.error('Invalid ISO date:', isoString);
            return null;
        }

        const date = new Date(isoString);

        const year: number = date.getFullYear();
        const month: string = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-based month
        const day: string = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }



}