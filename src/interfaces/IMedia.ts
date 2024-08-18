import Media from "../types/Media";

export default interface IMedia {
    _id?:string;
    type?: string; // "image", "video", "audio", "document", 
    fileName?: string;
    path?: string;
    content?: string;
    size?: number;
}