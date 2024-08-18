import { ObjectId, Types } from "mongoose";
import ChallengeController from "../../controllers/ChallengeController";
import ICard from "../../interfaces/ICard";
import CreateCardRequest from "../dto/CreateCardRequest";
import { Mapper } from "../../helpers/Mapper";
// import IChallenge from "../interfaces/IChallenge";


export default class CardService {
    static controller = new ChallengeController()
    // יצירת קלף בעידכון באתגר

    static async crateCard(data: CreateCardRequest) {//: Promise<IChallenge>{

        const challenge = await this.controller.readOne(data.challengeId);
        if (!challenge) throw { code: 400, message: "not found challenge" }
        if (String(data.userId) != String(challenge.creator)) throw { code: 400, message: "not creator" }
        const card: Partial<ICard> = {
            day: data.day,
            cardOrder: data.cardOrder,
            cardType: data.cardType,
            subType: data.subType,
            answers: data.answers,
            title: data.title,
            content: data.content,
            coins: data.coins,
            image: data.image,
            drawProbability: data.drawProbability,
            winProbability: data.winProbability,
            media: data.media
        }

        const existingCard = challenge.cards.find(
            (c) => c.day === data.day && c.cardType === data.cardType
        );
        if (existingCard) {
            throw { code: 400, message: `A card of type ${data.cardType} already exists for day ${data.day}` };
        }

        if (card.cardType === 'media' && !card.media) throw { code: 400, message: "type card media bat not found media" }
        const newCard = await this.controller.update(data.challengeId, { $push: { cards: card } })
        return newCard;
    }

    static async updateCard(data: CreateCardRequest) {
        const challenge = await this.controller.readOne(data.challengeId);
        if (!challenge) throw { code: 400, message: "not found challenge" }
        if (String(data.userId) != String(challenge.creator)) throw { code: 400, message: "not creator" }
        // console.log({ data , c: challenge.cards});
        let oldCard = challenge.cards.find((c) => String(c._id) === String(data._id))
        console.log({ oldCard });

        if (!oldCard) throw { code: 400, messege: " not fond old card" }
        const updatedCard: Partial<ICard> = {
            _id: data._id || oldCard._id,
            day: data.day || oldCard.day,
            cardOrder: data.cardOrder || oldCard.cardOrder,
            cardType: data.cardType || oldCard.cardType,
            subType: data.subType || oldCard.subType,
            answers: data.answers || oldCard.answers,
            title: data.title || oldCard.title,
            content: data.content || oldCard.content,
            coins: data.coins || oldCard.coins,
            image: data.image || oldCard.image,
            drawProbability: data.drawProbability || oldCard.drawProbability,
            winProbability: data.winProbability || oldCard.winProbability,
            media: data.media || oldCard.media,
        }

        const existingCard = challenge.cards.find(
            (c) => c.day === data.day && c.cardType === data.cardType
        );
        if (existingCard) {
            throw { code: 400, message: `A card of type ${data.cardType} already exists for day ${data.day}` };
        }

        if (updatedCard.cardType === 'media' && !updatedCard.media) throw { code: 400, message: "type card media bat not found media" }
console.log({updatedCard});

        const updatedChallenge = await this.controller.updateByFilter(
            { _id: data.challengeId , 'cards._id':data._id } ,
            { $set: { 'cards.$': updatedCard , } });

        return updatedChallenge;
    }
}

// עריכה
// מחיקת קלף 





