import { ObjectId } from "mongodb";
import IMedia from "../../interfaces/IMedia";

export class CardResponse {
    challengeName: string;
    title: string;
    media: IMedia;
    id: ObjectId;
    content: string;

    constructor(ch: string = '', title: string = '', media: IMedia = {}, id: ObjectId = new ObjectId(), content: string = '') {
        this.challengeName = ch;
        this.title = title;
        this.media = media;
        this.id = id;
        this.content = content;
    }
}
