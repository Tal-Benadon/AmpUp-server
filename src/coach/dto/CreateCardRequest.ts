import ICard from '../../interfaces/ICard';
import IMedia from '../../interfaces/IMedia';

type cardType = "question" | "task" | "media" | "study" | "support" | "share" | "lottery"
type subType = 'multipleChoice' | 'url' | 'freeText' | 'upload' | 'multipleChoice+freeText'

export default class CreateCardRequest {
    challengeId: string;
    _id?: string;
    day: number;
    cardOrder: number;
    cardType: cardType;
    subType?: subType
    title: string;
    content: string;
    media?: IMedia;
    coins: number;
    image?: string;
    drawProbability?: number; // אחוז הופעה (רק בקלף הגרלה)
    winProbability?: number; // אחוז זכייה (רק בקלף הגרלה)
    answers?: string[];
    userId: string;
    static _id: any;
    constructor() {
        this._id = undefined;
        this.day = 0;
        this.cardOrder = 0;
        this.cardType = 'question';
        this.challengeId = '';
        this.subType = undefined;
        this.title = '';
        this.content = '';
        this.media = undefined;
        this.coins = 0;
        this.image = undefined;
        this.drawProbability = undefined;
        this.winProbability = undefined;
        this.answers = undefined;
        this.userId = '';
    }
}