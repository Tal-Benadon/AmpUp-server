// import MemberModel from '../models/MemberModel';
// import ActiveChallengeModel from '../models/ActiveChallengeModel';
// import CoachModel from '../models/CoachModel';
// import ChallengeModel from '../models/ChallengeModel';
// import IMember from '../interfaces/IMember';
// import ICoach from '../interfaces/ICoach';
// import ICard from '../interfaces/ICard';
// import IChallenge from '../interfaces/IChallenge';
// import IStoreItem from '../interfaces/IStoreItem';
// import IActiveChallenge, { IActiveCard } from '../interfaces/IActiveChallenge';
// import { ObjectId } from 'mongoose';


// export default async function go() {

//   await MemberModel.collection.drop();
//   await ChallengeModel.collection.drop();
//   await CoachModel.collection.drop();
//   await ActiveChallengeModel.collection.drop();

//   console.log("###########  START  #########");

//   let members: IMember[] = [
//     {
//       "fullName": "Yossi Cohen",
//       "email": "yossi@example.com",
//       phone: 521234567, // phone as String without dashes
//       img: "https://pic1.calcalist.co.il/PicServer3/2019/07/03/918094/1LM.jpg",
//       motto: "Always strive forward",
//       link: "https://example.com/yossi",
//       linksToSocialNetwork: ["https://facebook.com/yossi",
//         "https://twitter.com/yossi"],
//       myChallenge: [], // empty array for challenges
//       coins: 100,
//       notifications: []
//     },
//     {
//       fullName: "Ronit Levy",
//       email: "ronit@example.com",
//       phone: 539876543, // phone as String without dashes
//       img: "https://img.mako.co.il/2023/03/08/Anashim2023_e_NoLogo_re.jpg",
//       motto: "Live in the moment",
//       link: "https://example.com/ronit",
//       linksToSocialNetwork: ["https://linkedin.com/in/ronit",
//         "https://instagram.com/ronit"],
//       myChallenge: [], // empty array for challenges
//       coins: 150,
//       notifications: []
//     },
//     {
//       fullName: "David Israeli",
//       email: "david@example.com",
//       phone: 541239876, // phone as String without dashes
//       img: "https://admin.drushim.co.il/Content/Uploads/637744851028105969_shutterstock_1723935472.jpg",
//       motto: "Push boundaries",
//       link: "https://example.com/david",
//       linksToSocialNetwork: ["https://twitter.com/david",
//         "https://facebook.com/david"],
//       myChallenge: [], // empty array for challenges
//       coins: 200,
//       notifications: []
//     },
//     {
//       fullName: "Hana Shahar",
//       email: "hana@example.com",
//       phone: 504567890, // phone as String without dashes
//       img: "https://inbarcohen.com/wp-content/uploads/2022/12/-%D7%9C%D7%A9%D7%A4%D7%A8-%D7%91%D7%99%D7%98%D7%97%D7%95%D7%9F-%D7%A2%D7%A6%D7%9E%D7%99-%D7%A0%D7%A4%D7%97-%D7%9E%D7%95%D7%A7%D7%98%D7%9F-1-e1671784788649.jpg",
//       motto: "Never give up",
//       link: "https://example.com/hana",
//       linksToSocialNetwork: [
//         "https://linkedin.com/in/hana",
//         "https://instagram.com/hana"
//       ],
//       myChallenge: [], // empty array for challenges
//       coins: 250,
//       notifications: []
//     }
//   ];
//   const m1: IMember = await MemberModel.create(members[0]);
//   const m2: IMember = await MemberModel.create(members[1]);
//   const m3: IMember = await MemberModel.create(members[2]);
//   const m4: IMember = await MemberModel.create(members[3]);
//   const coaches: ICoach[] = [
//     {
//       fullName: "Alice Johnson",
//       email: "alice.johnson@example.com",
//       phoneNumber: "0501234567", // phone as String without dashes
//       picture: "https://boringathome.co.il/wp-content/uploads/2022/10/%D7%90%D7%99%D7%A9%D7%94-2.jpg",
//       link: "https://example.com/alice",
//       myChallenges: [],
//       title: ''
//     },
//     {
//       fullName: "Bob Smith",
//       email: "bob.smith@example.com",
//       phoneNumber: "0509876543", // phone as String without dashes
//       picture: "https://investaway.co.il/wp-content/uploads/2019/02/2789878-1024x710.jpg",
//       link: "https://example.com/bob",
//       myChallenges: [],
//       title: ''
//     }
//   ];

//   const coach1: ICoach = await CoachModel.create(coaches[0]);
//   const coach2: ICoach = await CoachModel.create(coaches[1]);

//   const cards: ICard[] = [
//     {
//       "day": 1,
//       "cardOrder": 1,
//       "cardType": "question",
//       "subType": "open",
//       "title": "What is your favorite hobby?",
//       "content": "Please describe your favorite hobby in detail.",
//       "media": {
//         "type": "image",
//         "content": "hobby.jpg"
//       },
//       "coins": 10,
//       "image": "hobby_image.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 1,
//       "cardOrder": 2,
//       "cardType": "challenge",
//       "subType": "daily",
//       "title": "Morning Exercise",
//       "content": "Do a 30-minute morning exercise routine.",
//       "media": {
//         "type": "video",
//         "content": "exercise_routine.mp4"
//       },
//       "coins": 20,
//       "image": "exercise_image.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 1,
//       "cardOrder": 3,
//       "cardType": "question",
//       "subType": "multiple_choice",
//       "title": "Preferred Workout Time",
//       "content": "What time of day do you prefer to work out?",
//       "media": {
//         "type": "text",
//         "content": "Morning, Afternoon, Evening"
//       },
//       "coins": 15,
//       "image": "workout_time.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 1,
//       "cardOrder": 4,
//       "cardType": "challenge",
//       "subType": "weekly",
//       "title": "Run 5 Miles",
//       "content": "Complete a 5-mile run by the end of the week.",
//       "media": {
//         "type": "audio",
//         "content": "motivation_speech.mp3"
//       },
//       "coins": 30,
//       "image": "run_image.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 1,
//       "cardOrder": 5,
//       "cardType": "question",
//       "subType": "open",
//       "title": "Favorite Healthy Meal",
//       "content": "Share your favorite healthy meal recipe.",
//       "media": {
//         "type": "image",
//         "content": "healthy_meal.jpg"
//       },
//       "coins": 10,
//       "image": "meal_image.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 1,
//       "cardOrder": 6,
//       "cardType": "lottery",
//       "subType": "draw",
//       "title": "Lucky Draw",
//       "content": "Try your luck! You might win extra coins.",
//       "media": {
//         "type": "image",
//         "content": "lottery.jpg"
//       },
//       "coins": 50,
//       "image": "lottery_image.jpg",
//       "drawProbability": 0.1,
//       "winProbability": 0.05
//     },
//     {
//       "day": 2,
//       "cardOrder": 1,
//       "cardType": "question",
//       "subType": "open",
//       "title": "What is your favorite hobby?",
//       "content": "Please describe your favorite hobby in detail.",
//       "media": {
//         "type": "image",
//         "content": "hobby.jpg"
//       },
//       "coins": 10,
//       "image": "hobby_image.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 2,
//       "cardOrder": 2,
//       "cardType": "challenge",
//       "subType": "daily",
//       "title": "Morning Exercise",
//       "content": "Do a 30-minute morning exercise routine.",
//       "media": {
//         "type": "video",
//         "content": "exercise_routine.mp4"
//       },
//       "coins": 20,
//       "image": "exercise_image.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 2,
//       "cardOrder": 3,
//       "cardType": "question",
//       "subType": "multiple_choice",
//       "title": "Preferred Workout Time",
//       "content": "What time of day do you prefer to work out?",
//       "media": {
//         "type": "text",
//         "content": "Morning, Afternoon, Evening"
//       },
//       "coins": 15,
//       "image": "workout_time.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 2,
//       "cardOrder": 4,
//       "cardType": "challenge",
//       "subType": "weekly",
//       "title": "Run 5 Miles",
//       "content": "Complete a 5-mile run by the end of the week.",
//       "media": {
//         "type": "audio",
//         "content": "motivation_speech.mp3"
//       },
//       "coins": 30,
//       "image": "run_image.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 2,
//       "cardOrder": 5,
//       "cardType": "question",
//       "subType": "open",
//       "title": "Favorite Healthy Meal",
//       "content": "Share your favorite healthy meal recipe.",
//       "media": {
//         "type": "image",
//         "content": "healthy_meal.jpg"
//       },
//       "coins": 10,
//       "image": "meal_image.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 2,
//       "cardOrder": 6,
//       "cardType": "lottery",
//       "subType": "draw",
//       "title": "Lucky Draw",
//       "content": "Try your luck! You might win extra coins.",
//       "media": {
//         "type": "image",
//         "content": "lottery.jpg"
//       },
//       "coins": 50,
//       "image": "lottery_image.jpg",
//       "drawProbability": 0.1,
//       "winProbability": 0.05
//     },
//     {
//       "day": 3,
//       "cardOrder": 1,
//       "cardType": "question",
//       "subType": "open",
//       "title": "What is your favorite hobby?",
//       "content": "Please describe your favorite hobby in detail.",
//       "media": {
//         "type": "image",
//         "content": "hobby.jpg"
//       },
//       "coins": 10,
//       "image": "hobby_image.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 3,
//       "cardOrder": 2,
//       "cardType": "challenge",
//       "subType": "daily",
//       "title": "Morning Exercise",
//       "content": "Do a 30-minute morning exercise routine.",
//       "media": {
//         "type": "video",
//         "content": "exercise_routine.mp4"
//       },
//       "coins": 20,
//       "image": "exercise_image.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 3,
//       "cardOrder": 3,
//       "cardType": "question",
//       "subType": "multiple_choice",
//       "title": "Preferred Workout Time",
//       "content": "What time of day do you prefer to work out?",
//       "media": {
//         "type": "text",
//         "content": "Morning, Afternoon, Evening"
//       },
//       "coins": 15,
//       "image": "workout_time.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 3,
//       "cardOrder": 4,
//       "cardType": "challenge",
//       "subType": "weekly",
//       "title": "Run 5 Miles",
//       "content": "Complete a 5-mile run by the end of the week.",
//       "media": {
//         "type": "audio",
//         "content": "motivation_speech.mp3"
//       },
//       "coins": 30,
//       "image": "run_image.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 3,
//       "cardOrder": 5,
//       "cardType": "question",
//       "subType": "open",
//       "title": "Favorite Healthy Meal",
//       "content": "Share your favorite healthy meal recipe.",
//       "media": {
//         "type": "image",
//         "content": "healthy_meal.jpg"
//       },
//       "coins": 10,
//       "image": "meal_image.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 3,
//       "cardOrder": 6,
//       "cardType": "lottery",
//       "subType": "draw",
//       "title": "Lucky Draw",
//       "content": "Try your luck! You might win extra coins.",
//       "media": {
//         "type": "image",
//         "content": "lottery.jpg"
//       },
//       "coins": 50,
//       "image": "lottery_image.jpg",
//       "drawProbability": 0.1,
//       "winProbability": 0.05
//     },
//     {
//       "day": 4,
//       "cardOrder": 1,
//       "cardType": "question",
//       "subType": "open",
//       "title": "What is your favorite hobby?",
//       "content": "Please describe your favorite hobby in detail.",
//       "media": {
//         "type": "image",
//         "content": "hobby.jpg"
//       },
//       "coins": 10,
//       "image": "hobby_image.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 4,
//       "cardOrder": 2,
//       "cardType": "challenge",
//       "subType": "daily",
//       "title": "Morning Exercise",
//       "content": "Do a 30-minute morning exercise routine.",
//       "media": {
//         "type": "video",
//         "content": "exercise_routine.mp4"
//       },
//       "coins": 20,
//       "image": "exercise_image.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 4,
//       "cardOrder": 3,
//       "cardType": "question",
//       "subType": "multiple_choice",
//       "title": "Preferred Workout Time",
//       "content": "What time of day do you prefer to work out?",
//       "media": {
//         "type": "text",
//         "content": "Morning, Afternoon, Evening"
//       },
//       "coins": 15,
//       "image": "workout_time.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 4,
//       "cardOrder": 4,
//       "cardType": "challenge",
//       "subType": "weekly",
//       "title": "Run 5 Miles",
//       "content": "Complete a 5-mile run by the end of the week.",
//       "media": {
//         "type": "audio",
//         "content": "motivation_speech.mp3"
//       },
//       "coins": 30,
//       "image": "run_image.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 4,
//       "cardOrder": 5,
//       "cardType": "study",
//       "subType": "open",
//       "title": "Favorite Healthy Meal",
//       "content": "Share your favorite healthy meal recipe.",
//       "media": {
//         "type": "image",
//         "content": "healthy_meal.jpg"
//       },
//       "coins": 10,
//       "image": "meal_image.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 4,
//       "cardOrder": 6,
//       "cardType": "lottery",
//       "subType": "draw",
//       "title": "Lucky Draw",
//       "content": "Try your luck! You might win extra coins.",
//       "media": {
//         "type": "image",
//         "content": "lottery.jpg"
//       },
//       "coins": 50,
//       "image": "lottery_image.jpg",
//       "drawProbability": 0.1,
//       "winProbability": 0.05
//     },
//     {
//       "day": 5,
//       "cardOrder": 1,
//       "cardType": "question",
//       "subType": "open",
//       "title": "What is your favorite hobby?",
//       "content": "Please describe your favorite hobby in detail.",
//       "media": {
//         "type": "image",
//         "content": "hobby.jpg"
//       },
//       "coins": 10,
//       "image": "hobby_image.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 5,
//       "cardOrder": 2,
//       "cardType": "challenge",
//       "subType": "daily",
//       "title": "Morning Exercise",
//       "content": "Do a 30-minute morning exercise routine.",
//       "media": {
//         "type": "video",
//         "content": "exercise_routine.mp4"
//       },
//       "coins": 20,
//       "image": "exercise_image.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 5,
//       "cardOrder": 3,
//       "cardType": "question",
//       "subType": "multiple_choice",
//       "title": "Preferred Workout Time",
//       "content": "What time of day do you prefer to work out?",
//       "media": {
//         "type": "text",
//         "content": "Morning, Afternoon, Evening"
//       },
//       "coins": 15,
//       "image": "workout_time.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 5,
//       "cardOrder": 4,
//       "cardType": "challenge",
//       "subType": "weekly",
//       "title": "Run 5 Miles",
//       "content": "Complete a 5-mile run by the end of the week.",
//       "media": {
//         "type": "audio",
//         "content": "motivation_speech.mp3"
//       },
//       "coins": 30,
//       "image": "run_image.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 5,
//       "cardOrder": 5,
//       "cardType": "question",
//       "subType": "open",
//       "title": "Favorite Healthy Meal",
//       "content": "Share your favorite healthy meal recipe.",
//       "media": {
//         "type": "image",
//         "content": "healthy_meal.jpg"
//       },
//       "coins": 10,
//       "image": "meal_image.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 5,
//       "cardOrder": 6,
//       "cardType": "lottery",
//       "subType": "draw",
//       "title": "Lucky Draw",
//       "content": "Try your luck! You might win extra coins.",
//       "media": {
//         "type": "image",
//         "content": "lottery.jpg"
//       },
//       "coins": 50,
//       "image": "lottery_image.jpg",
//       "drawProbability": 0.1,
//       "winProbability": 0.05
//     },
//     {
//       "day": 6,
//       "cardOrder": 1,
//       "cardType": "question",
//       "subType": "open",
//       "title": "What is your favorite hobby?",
//       "content": "Please describe your favorite hobby in detail.",
//       "media": {
//         "type": "image",
//         "content": "hobby.jpg"
//       },
//       "coins": 10,
//       "image": "hobby_image.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 6,
//       "cardOrder": 2,
//       "cardType": "challenge",
//       "subType": "daily",
//       "title": "Morning Exercise",
//       "content": "Do a 30-minute morning exercise routine.",
//       "media": {
//         "type": "video",
//         "content": "exercise_routine.mp4"
//       },
//       "coins": 20,
//       "image": "exercise_image.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 6,
//       "cardOrder": 3,
//       "cardType": "question",
//       "subType": "multiple_choice",
//       "title": "Preferred Workout Time",
//       "content": "What time of day do you prefer to work out?",
//       "media": {
//         "type": "text",
//         "content": "Morning, Afternoon, Evening"
//       },
//       "coins": 15,
//       "image": "workout_time.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 6,
//       "cardOrder": 4,
//       "cardType": "challenge",
//       "subType": "weekly",
//       "title": "Run 5 Miles",
//       "content": "Complete a 5-mile run by the end of the week.",
//       "media": {
//         "type": "audio",
//         "content": "motivation_speech.mp3"
//       },
//       "coins": 30,
//       "image": "run_image.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 6,
//       "cardOrder": 5,
//       "cardType": "question",
//       "subType": "open",
//       "title": "Favorite Healthy Meal",
//       "content": "Share your favorite healthy meal recipe.",
//       "media": {
//         "type": "image",
//         "content": "healthy_meal.jpg"
//       },
//       "coins": 10,
//       "image": "meal_image.jpg",
//       "drawProbability": 0.0,
//       "winProbability": 0.0
//     },
//     {
//       "day": 6,
//       "cardOrder": 6,
//       "cardType": "lottery",
//       "subType": "draw",
//       "title": "Lucky Draw",
//       "content": "Try your luck! You might win extra coins.",
//       "media": {
//         "type": "image",
//         "content": "lottery.jpg"
//       },
//       "coins": 50,
//       "image": "lottery_image.jpg",
//       "drawProbability": 0.1,
//       "winProbability": 0.05
//     }
//   ]

//   const stores: IStoreItem[] = [
//     {
//       "name": "Water Bottle",
//       "description": "Stainless steel water bottle",
//       "image": "https://www.ewines.co.il/wp-content/uploads/2022/08/3-%D7%9E%D7%99%D7%9D.jpg",
//       "coins": 50,
//       "daysToExpiry": 30,
//       "quantity": 100
//     },
//     {
//       "name": "Bookmark",
//       "description": "Elegant bookmark",
//       "image": "https://i.pinimg.com/736x/8c/f7/0b/8cf70b1a4a54c9cda9d40d5db77d75e8.jpg",
//       "coins": 20,
//       "daysToExpiry": 60,
//       "quantity": 200
//     }
//   ]
//   let Challenges: IChallenge[] = [{
//     challengeName: "Fitness Challenge",
//     coverImage: "https://www.dietmaster.co.il/wp-content/uploads/2015/02/%D7%A9%D7%99%D7%98%D7%95%D7%AA-%D7%94%D7%A8%D7%96%D7%99%D7%94.jpg",
//     subDescription: "Get fit in 30 days",
//     duration: 30,
//     tags: ["fitness", "health", "wellness"],
//     isPublic: true,
//     isTemplate: false,
//     creator: coach1._id as any,
//     store: [stores[0]],
//     cards: cards,
//   }, {
//     challengeName: "Reading Challenge",
//     coverImage: "https://meyda.education.gov.il/files/pop/10322/kriaa.jpg",
//     subDescription: "Read 10 books in 60 days",
//     duration: 60,
//     tags: ["reading", "books", "education"],
//     isPublic: true,
//     isTemplate: false,
//     creator: coach2._id,
//     store: [stores[1]],
//     cards: cards,
//   }]
//   const c1: IChallenge = await ChallengeModel.create(Challenges[0]);
//   const c2: IChallenge = await ChallengeModel.create(Challenges[1]);

//   await CoachModel.updateOne({ _id: coach1._id }, { $push: { challenges: c1._id } });
//   await CoachModel.updateOne({ _id: coach2._id }, { $push: { challenges: c2._id } });

//   let activeCardsChallenge: IActiveCard[] = [
//     {
//       member: m1._id as any,
//       card: c1.cards[0]._id as any,
//       challengeDay: 1,
//       coins: c1.cards[0].coins,
//       answerValue: "I like to eat healthy salads.",
//       answerMedia: [],
//     },
//     {
//       member: m2._id as any,
//       card: c1.cards[1]._id as any,
//       challengeDay: 1,
//       coins: c1.cards[1].coins,
//       answerValue: "My favorite food is pizza!",
//       answerMedia: [],
//     }
//   ]

//   const activeChallenges: IActiveChallenge[] = [{
//     coach: coach1._id as any,
//     challenge: c1._id as any,
//     participants: [m1._id as any, m2._id as any],
//     startDate: new Date(),
//     cards: activeCardsChallenge,
//     invited: []
//   }, {
//     coach: coach2._id as any,
//     challenge: c2._id as any,
//     participants: [m3._id as any, m4._id as any],

//     startDate: new Date(),
//     cards: activeCardsChallenge,
//     invited: []
//   }]
//   const activCh1 = await ActiveChallengeModel.create(activeChallenges[0]);
//   const activCh2 = await ActiveChallengeModel.create(activeChallenges[1]);

//   await MemberModel.updateOne({ _id: m1._id }, { $push: { myChallenge: activCh1._id } });
//   await MemberModel.updateOne({ _id: m2._id }, { $push: { myChallenge: activCh1._id } });
//   await MemberModel.updateOne({ _id: m3._id }, { $push: { myChallenge: activCh2._id } });
//   await MemberModel.updateOne({ _id: m4._id }, { $push: { myChallenge: activCh2._id } });


//   console.log("###########  END  #########");
// }
