import ActiveChallengeModel from '../models/ActiveChallengeModel';
import ChallengeModel from '../models/ChallengeModel';
import ICard from '../interfaces/ICard';
import IActiveChallenge, { IActiveCard } from '../interfaces/IActiveChallenge';
import { ObjectId } from 'mongodb';



export default async function go() {

    console.log("###########  START  #########");

    const cardTypes = ['question', 'task', 'media', 'study', 'support', 'share'] as const;
    const cardData = {
        question: {
            title: 'Daily Fitness Question',
            content: 'What motivates you to stay fit?'
        },
        task: {
            title: 'Daily Fitness Challenge',
            content: 'Complete 30 minutes of cardio exercise.'
        },
        media: {
            title: 'Daily Fitness Media',
            content: 'Watch this video on proper push-up form.'
        },
        study: {
            title: 'Daily Fitness Study',
            content: 'Read this article on the benefits of regular exercise.'
        },
        support: {
            title: 'Daily Fitness Support',
            content: 'Share your progress in the group chat and receive encouragement.'
        },
        share: {
            title: 'Daily Fitness Share',
            content: 'Post a photo of your workout on social media.'
        }
    };
    const generateCards = (days: number): ICard[] => {
        const cards: ICard[] = [];
        for (let day = 1; day <= days; day++) {
            for (let cardOrder = 1; cardOrder <= 6; cardOrder++) {
                const cardType = cardTypes[cardOrder - 1];
                cards.push({
                    _id: new ObjectId().toString(),
                    day: day,
                    cardOrder: cardOrder,
                    cardType: cardType,
                    subType: 'freeText',
                    title: cardData[cardType].title,
                    content: cardData[cardType].content,
                    coins: Math.floor(Math.random() * (200 - 50 + 1)) + 50,
                    drawProbability: 80,
                    winProbability: 70
                });
            }
        }
        return cards;
    };
    const allCards = generateCards(10);
    console.log("allCards - DONE !!");

    await ChallengeModel.findByIdAndUpdate('665739933ccf2b71c3eb3e92',{$push:{cards:allCards}})
    
    console.log("activeCards - Start !!");

    const member = new ObjectId('6656df1b8437151db0cce4e4');
    const answers = {
        question: 'Staying healthy and active motivates me.',
        task: 'Completed the 30 minutes of cardio.',
        media: 'Watched the video on push-up form.',
        study: 'Read the article on exercise benefits.',
        support: 'Shared my progress and received encouragement.',
        share: 'Posted a workout photo on social media.',
        lottery:"lottery"
    };

    const generateActiveCards = (cards: ICard[], days: number): IActiveCard[] => {
        const activeCards: IActiveCard[] = [];
        for (let day = 1; day <= days; day++) {
            const dayCards = cards.filter(card => card.day === day);
            dayCards.forEach(card => {
                activeCards.push({
                    member: member ,
                    card: new ObjectId(card._id),
                    challengeDay: day,
                    coins: card.coins,
                    answerValue: answers[card.cardType]
                });
            });
        }
        return activeCards;
    };

    const activeCards = generateActiveCards(allCards, 7);
    console.log("activeCards - DONE !!");

    await ActiveChallengeModel.findByIdAndUpdate("6656df1b8437151db0cce584",{$push:{cards:activeCards}})
    console.log("###########  DONE  #########");

}