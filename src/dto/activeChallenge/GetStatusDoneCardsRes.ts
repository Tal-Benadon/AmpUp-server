import ICard from "../../interfaces/ICard";
import ICoach from "../../interfaces/ICoach";

export default class GetStatusDoneCardsRes {
    cardsOfToday: ICard[]
    totalDays: number
    challengeName: string
    completedDays: number[]
    coach: Partial<ICoach>
    streakNum: number
    constructor(cardsOfToday: ICard[], totalDays: number, completedDays: number[], coach: Partial<ICoach>, challengeName: string, streakNum: number) {
        this.cardsOfToday = cardsOfToday
        this.totalDays = totalDays
        this.completedDays = completedDays
        this.coach = coach
        this.challengeName = challengeName
        this.streakNum = streakNum
    }
}