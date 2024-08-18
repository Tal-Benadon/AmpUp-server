import IMedia from "./IMedia";

export default interface ICard {
    _id?: string;
    day: number;
    cardOrder: number;
    cardType: 'question' | 'task' | 'media' | 'study' | 'support' | 'share' | 'lottery';
    subType?: 'multipleChoice' | 'url' | 'freeText' | 'upload' | 'multipleChoice+freeText';
    title: string;
    content: string;
    media?: IMedia;
    coins: number;
    image?: string;
    drawProbability?: number; // אחוז הופעה (רק בקלף הגרלה)
    winProbability?: number; // אחוז זכייה (רק בקלף הגרלה)
    answers?: string[];
    done?: boolean;
}