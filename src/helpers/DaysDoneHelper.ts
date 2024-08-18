import { ObjectId } from "mongoose";
import IActiveChallenge, { IActiveCard } from "../interfaces/IActiveChallenge";
import CoinsService from "../services/CoinsService";

export class DaysDoneHelper {
    static CoinsService = new CoinsService()

    async checkPositiveStreak(DaysObject: Object, streakNumber: number, activeChallenge: IActiveChallenge) {
        let answeredDaysList = Object.keys(DaysObject)
        let currentChallengeDay = await CoinsService.getCurrentChallengeDay(activeChallenge)

        const mostRecentAnswerDay: number = Number(answeredDaysList.slice(-1)[0])

        if (mostRecentAnswerDay !== (currentChallengeDay)) {
            console.log(`Member did not answer today's challenge (Today:${currentChallengeDay}, last answered: ${mostRecentAnswerDay})`);
            return "Invalid Check, member didn't answer today"
        }

        if (answeredDaysList.length < streakNumber) {
            console.log(`Member does not have a streak of ${streakNumber} or more`);
            return `Member does not have a streak of ${streakNumber} or more`
        }

        let streakCounter = 1

        // SAVE HOW MANY MEMBER HAS DONE IN EACH DAY AND THEN COMPARE IT TO THE NUMBERS IN THE CHALLENGE ITSELF
        for (let i = (mostRecentAnswerDay - 1); i > 0; i--) {
            if (i === Number(answeredDaysList[i - 1])) {
                console.log(answeredDaysList[i - 1]);
                streakCounter++
            } else {
                console.log("Member missed a day! not eligible");
                return "Member missed a day! not eligible"
            }
            if (streakCounter === streakNumber) {
                console.log(`Member is on a streak of ${streakNumber} days!!`);
                return `${streakNumber}`
            }
        }
    }

    async checkStreakNumber(DaysObject: Object, activeChallenge: IActiveChallenge) {
        let answeredDaysList = Object.keys(DaysObject)
        let currentChallengeDay = await CoinsService.getCurrentChallengeDay(activeChallenge)
        console.log({ answeredDaysList });
        console.log({ currentChallengeDay });


        const mostRecentAnswerDay: number = Number(answeredDaysList.slice(-1)[0])
        console.log({ mostRecentAnswerDay });
        let streakNumber = 0
        let j = 1
        for (let i = (mostRecentAnswerDay); i > 0; i--) {
            if (i === Number(answeredDaysList[answeredDaysList.length - j])) {
                console.log(`hi, user did ${answeredDaysList[answeredDaysList.length - j]}`);
                streakNumber++
                j++

            } else {
                if (mostRecentAnswerDay === currentChallengeDay) {
                    streakNumber = 1
                } else {
                    streakNumber = 0
                }
            }

        }
        return streakNumber
    }

    async checkNegativeStreakEnd(DaysObject: Object, streakNumber: number, activeChallenge: IActiveChallenge) {
        //----------------------a flat array of the days the Member answered 
        //---------------------- example : [1,5,7,9] < the member answered(partialy or completely), days 1, 5 ,7, 9
        let daysList = Object.keys(DaysObject)
        let currentChallengeDay = await CoinsService.getCurrentChallengeDay(activeChallenge)
        let numberTypeDaysList = []
        for (let i = 0; i < daysList.length; i++) {
            numberTypeDaysList.push(parseInt(daysList[i]))
        }
        const mostRecentAnswerDay: number = numberTypeDaysList.slice(-1)[0]

        if (mostRecentAnswerDay !== (currentChallengeDay)) {
            console.log(`Member did not answer today's challenge (Today:${currentChallengeDay}, last answered: ${mostRecentAnswerDay})`);
            return "Invalid Check, member didn't answer today"
        }


        let i = numberTypeDaysList.length
        console.log(numberTypeDaysList[i - 1]);
        console.log(numberTypeDaysList[i - 2]);

        if (numberTypeDaysList[i - 1] && numberTypeDaysList[i - 2]) {
            if (Math.abs(numberTypeDaysList[i - 1] - numberTypeDaysList[i - 2]) >= streakNumber) {
                console.log(`Member returned after ${streakNumber} days!`);
                return `Member returned after ${streakNumber} days!`
            } else {
                console.log("Member does not have a negative streak comeback from today");
                return "Member does not have a negative streak comeback from today"
            }
        }



    }


    getDaysAndDaysToBeDoneObject<T extends Record<K, number>, K extends keyof T>(objectList: T[], pointerKey: K) {

        const newObjectList: { [key: number]: number } = {}
        objectList.forEach(object => {
            let key = object[pointerKey]
            if (typeof key === "number") {

                if (newObjectList[key]) {
                    newObjectList[key]++
                } else {
                    newObjectList[key] = 1
                }
            }
        })
        // console.log(newObjectList);

        return newObjectList
    }

    async checkMembersIncompleteStreaks(memberDaysObject: { [key: string]: number },
        challengeDailyCardsOjbect: { [key: string]: number },
        streakNumber: number) {
        console.log({ memberDaysObject });
        console.log({ challengeDailyCardsOjbect });
        let streakCounter = 0
        const challengeDaysList = Object.keys(challengeDailyCardsOjbect).reverse()
        for (const key of challengeDaysList) {
            console.log(key, challengeDailyCardsOjbect[key]);
            console.log(key, memberDaysObject[key]);
            if (!memberDaysObject[key]) {
                console.log(`member did not participate on day ${key}`);
                return `member did not participate on day ${key}`
            }
            if (challengeDailyCardsOjbect[key] !== memberDaysObject[key]) {
                streakCounter++
            }
            if (streakCounter === streakNumber) {
                console.log(`member has a streak of ${streakNumber} incomplete answer days`);
                return `member has a streak of ${streakNumber} incomplete answer days`
            }
        }
    }


    getMemberCardsArray(memberId: ObjectId, activeChallenge: IActiveChallenge) {
        const memberIdStr = typeof memberId === 'string' ? memberId : memberId.toString()

        //------------------------------------- the full list of all the member's cards in this particular challenge


        const memberAnsweredCards: IActiveCard[] = activeChallenge.cards.reduce((prev: IActiveCard[], current: IActiveCard) => {

            const currentMemberIdStr = current.member.toString()

            if (currentMemberIdStr === memberIdStr) {
                prev.push(current)
            }
            return prev
        }, [])

        return memberAnsweredCards
    }
}

