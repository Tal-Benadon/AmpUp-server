import mongoose from "mongoose"
import ChallengeModel from "../models/ChallengeModel"
import { faker } from '@faker-js/faker'
import MemberModel from "../models/MemberModel"
import ActiveChallengeModel from "../models/ActiveChallengeModel"


const path = 'https://ampup-ypreiser.s3.eu-north-1.amazonaws.com/1717507380231_%C3%97%C2%94%C3%97%C2%AA%C3%97%C2%A7%C3%97%C2%95%C3%97%C2%95%C3%97%C2%94%206%20-%20%C3%97%C2%94%C3%97%C2%9E%C3%97%C2%A0%C3%97%C2%95%C3%97%C2%9F%20%C3%97%C2%94%C3%97%C2%9C%C3%97%C2%95%C3%97%C2%97%C3%97%C2%9D%20%28%C3%97%C2%A2%C3%97%C2%99%C3%97%C2%93%C3%97%C2%95%20%C3%97%C2%A9%C3%97%C2%95%C3%97%C2%94%C3%97%C2%9D%20%C3%97%C2%A8%C3%97%C2%9E%C3%97%C2%99%C3%97%C2%A7%C3%97%C2%A1%29%20%28128kbps%29.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA4MTWMB6RI6TUC75I%2F20240604%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20240604T132301Z&X-Amz-Expires=604800&X-Amz-Signature=4669f4f5acdb1f7672e2beb0cb7596052ff969e887f75058f18c41065163f74f&X-Amz-SignedHeaders=host&x-id=GetObject'
const subtypes = ['multipleChoice', 'url', 'freeText', 'upload', 'multipleChoice+freeText']
const changeTheChallengeToTask = async () => {
   const challenge = await ChallengeModel.findById('6656df1b8437151db0cce539')
   // @ts-ignore
   challenge.cards = challenge?.cards.map(card => card.cardType === 'challenge' ? { ...card, cardType: 'task' } : card)
   // @ts-ignore
   challenge.cards = challenge?.cards.map(card => card.media ? { ...card, media: { ...card.media, type: 'audio', fileName: "musix.mp3", path: 'https://ampup-ypreiser.s3.eu-north-1.amazonaws.com/1717507380231_%C3%97%C2%94%C3%97%C2%AA%C3%97%C2%A7%C3%97%C2%95%C3%97%C2%95%C3%97%C2%94%206%20-%20%C3%97%C2%94%C3%97%C2%9E%C3%97%C2%A0%C3%97%C2%95%C3%97%C2%9F%20%C3%97%C2%94%C3%97%C2%9C%C3%97%C2%95%C3%97%C2%97%C3%97%C2%9D%20%28%C3%97%C2%A2%C3%97%C2%99%C3%97%C2%93%C3%97%C2%95%20%C3%97%C2%A9%C3%97%C2%95%C3%97%C2%94%C3%97%C2%9D%20%C3%97%C2%A8%C3%97%C2%9E%C3%97%C2%99%C3%97%C2%A7%C3%97%C2%A1%29%20%28128kbps%29.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA4MTWMB6RI6TUC75I%2F20240604%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20240604T132301Z&X-Amz-Expires=604800&X-Amz-Signature=4669f4f5acdb1f7672e2beb0cb7596052ff969e887f75058f18c41065163f74f&X-Amz-SignedHeaders=host&x-id=GetObject' } } : card)
   // @ts-ignore
   challenge.cards = challenge?.cards.map(card => card.subType ? { ...card, subType: subtypes[Math.floor(Math.random() * subtypes.length)] } : card)
   // @ts-ignore
   await ChallengeModel.findByIdAndUpdate('6656df1b8437151db0cce539', { cards: challenge.cards })
   console.log('finish');

}


// const members = await MemberModel.find()
// const emails = members.map(m => m.email)

const generateChallenge =  async () => {
 
   const cardTypes = ['question', 'task', 'media', 'study', 'support', 'share', 'lottery'];
   const questionSubTypes = ['multipleChoice', 'url', 'freeText', 'upload', 'multipleChoice+freeText'];

   const generateCardsForDay = (day: number) => {
      let cards = [];
      let cardOrder = 1;

      // Add two 'question' cards with different subtypes
      for (let i = 0; i < 2; i++) {
         const subType = faker.helpers.arrayElement(questionSubTypes.filter((_, idx) => idx !== i));
         cards.push({
            day: day,
            cardOrder: cardOrder++,
            cardType: 'question',
            subType: subType,
            answers: Array.from({ length: Math.ceil(Math.random() * 4) }, () => faker.lorem.sentence()),
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraph(),
            coins: Math.ceil(Math.random() * 100),
            image: '/back.jpg',
         });
      }

      // Add one card of each type except 'lottery' and 'question'
      for (const type of cardTypes.filter(type => type !== 'question' && type !== 'lottery')) {
         cards.push({
            day: day,
            cardOrder: cardOrder++,
            cardType: type,
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraph(),
            media: {
               type: 'audio',
               fileName: `${Math.random()}.mp3`,
               path: path,
               size: Math.ceil(Math.random() * 1400).toString(),
            },
            coins: Math.ceil(Math.random() * 100),
            image: '/back.jpg',
         });
      }

      // Add 'lottery' card as the last card
      cards.push({
         day: day,
         cardOrder: cardOrder++,
         cardType: 'lottery',
         title: faker.lorem.sentence(),
         content: faker.lorem.paragraph(),
         media: {
            type: 'audio',
            fileName: faker.system.commonFileName(),
            path: path,
            size: Math.ceil(Math.random() * 1000).toString(),
         },
         coins: Math.ceil(Math.random() * 100),
         image: '/back.jpg',
         drawProbability: Math.random(),
         winProbability: Math.random(),
      });

      return cards;
   };

   // Generate cards for 30 days
   const cards = [];
   for (let day = 1; day <= 30; day++) {
      cards.push(...generateCardsForDay(day));
   }

   const storeItems = Array.from({ length: Math.ceil(Math.random() * 5) }, () => ({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      image: '/back.jpg',
      coins: Math.ceil(Math.random() * 100),
      daysToExpiry: Math.ceil(Math.random() * 10),
      expiryDay: faker.date.future(),
      quantity: Math.ceil(Math.random() * 10),
      cardType: faker.helpers.arrayElement(['streak2', 'streak4']),
      isActive: faker.datatype.boolean(),
      isAction: faker.datatype.boolean(),
   }));

   const challenge = new ChallengeModel({
      // _id:'6656df1b8437151db0cce539',
      _id:'665739933ccf2b71c3eb3e92',
      challengeName: faker.lorem.words(),
      coverImage: '/back.jpg',
      subDescription: faker.lorem.sentence(),
      duration: 30,
      tags: Array.from({ length: Math.ceil(Math.random() * 5) }, () => faker.lorem.word()),
      isPublic: faker.datatype.boolean(),
      isTemplate: faker.datatype.boolean(),
      creator: '6656df1b8437151db0cce4ea', // Replace with a valid ObjectId if needed
      store: storeItems,
      cards: cards,
   });

   return challenge.save();
};


// generateChallenge().then(console.log)


// changeTheChallengeMainLaToTask()


const cleanCardsDone = async () => {
   const activeChallenge = await ActiveChallengeModel.findByIdAndUpdate('6656df1b8437151db0cce58a', { cards: [] }, { new: true })
   // @ts-ignore
   console.log(activeChallenge );
   
}

// cleanCardsDone()