import { ObjectId } from "mongoose";
import IChallenge from "../../../interfaces/IChallenge";
import IStoreItem from "../../../interfaces/IStoreItem";
import ICard from "../../../interfaces/ICard";
import UserAuth from "../../../middleware/UserAuth";

export default class craeteChaleneRequest extends UserAuth implements IChallenge {
    challengeName: string;
    coverImage: string;
    subDescription: string;
    duration: number;
    tags: string[];
    isPublic: boolean;
    isTemplate: boolean;
    creator: ObjectId | string ;
    store: IStoreItem[];
    cards: ICard[];

    constructor(
        challengeName: string = '',
        coverImage: string = '',
        subDescription: string = '',
        duration: number = 0,
        tags: string[] = [],
        isPublic: boolean = false,
        isTemplate: boolean = false,
    ) {
        super()
        this.challengeName = challengeName
        this.coverImage = coverImage
        this.subDescription = subDescription
        this.duration = duration || 0
        this.tags = tags
        this.isPublic = isPublic || false
        this.isTemplate = isTemplate || false
        this.store = []
        this.cards = []
        this.creator = this.userId
    }
}
