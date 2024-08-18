import { ObjectId } from "mongodb";
import IActiveChallenge, { IActiveCard } from "../../interfaces/IActiveChallenge";
import IMedia from "../../interfaces/IMedia";
import IStoreItem from "../../interfaces/IStoreItem";

export default class AddActiveChallengeRequest implements IActiveChallenge {
    coach: ObjectId;
    challenge: ObjectId;
    invited: string[];
    participants: ObjectId[];
    startDate: Date;
    cards: IActiveCard[]
    store?: IStoreItem[]
    constructor(
        coach: ObjectId,
        challenge: ObjectId,
        invited: string[],
        participants: ObjectId[],
        startDate: Date,
        cards: IActiveCard[],
        store: IStoreItem[]
    ) {
        this.coach = coach;
        this.challenge = challenge;
        this.invited = invited;
        this.participants = participants;
        this.startDate = startDate;
        this.cards = cards;
        this.store = store;
    }
}

class AddActiveCardRequest implements IActiveCard {
    member: ObjectId;
    card: ObjectId;
    challengeDay: number;
    coins: number;
    answerValue: string;
    answerMedia?: IMedia[];

    constructor(
        member: ObjectId,
        card: ObjectId,
        challengeDay: number,
        coins: number,
        answerValue: string,
        answerMedia?: IMedia[]
    ) {
        this.member = member;
        this.card = card;
        this.challengeDay = challengeDay;
        this.coins = coins;
        this.answerValue = answerValue;
        this.answerMedia = answerMedia;
    }
}

