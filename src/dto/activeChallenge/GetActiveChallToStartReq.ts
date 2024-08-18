import IChallenge from "../../interfaces/IChallenge"
import ICoach from "../../interfaces/ICoach"
import IMember from "../../interfaces/IMember"

export default class GetActiveChallToStartReq  {

    startDate: Date
    futureDate: Date
    participants: IMember[]
    challenge : Partial<IChallenge>
    coach: Partial<ICoach>

    constructor(startDate: Date, futureDate: Date, participants: IMember[],challenge :IChallenge, coach: ICoach){
        this.startDate = startDate
        this.futureDate = futureDate
        this.participants = participants
        this.challenge = challenge
        this.coach = coach
    }

}