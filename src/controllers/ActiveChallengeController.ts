import mongoose, { FilterQuery, UpdateQuery } from 'mongoose';
import IController from '../interfaces/IController';
import IActiveChallenge from '../interfaces/IActiveChallenge';
import ActiveChallengeModel from '../models/ActiveChallengeModel';
import { ObjectId } from 'mongodb';

interface PopulateProps {
    participants?: string
    coach?: string
    challenge?: string
}

export default class activeChallengeController implements IController<IActiveChallenge> {
    async create(data: IActiveChallenge): Promise<IActiveChallenge> {
        return await ActiveChallengeModel.create(data)
    }
    async read(filter: FilterQuery<IActiveChallenge>): Promise<IActiveChallenge[]> {
        return await ActiveChallengeModel.find(filter)
    }

    async readSelect(filter: FilterQuery<IActiveChallenge>, keyToReturn: keyof IActiveChallenge | string): Promise<ObjectId[] | IActiveChallenge[]> {
        return await ActiveChallengeModel.find(filter).select(keyToReturn)
    }
    async readOne(id: string | ObjectId, populate?: string | undefined): Promise<IActiveChallenge | null> {
        return await ActiveChallengeModel.findById({ _id: id })

    } //@ts-ignore
    async update(id: string, data: UpdateQuery<IActiveChallenge>): Promise<IActiveChallenge | null> {
        await ActiveChallengeModel.updateOne({ _id: id }, data)
        return await this.readOne(id)
    }

    del(id: string): Promise<boolean> { //unimplemented
        throw new Error('Method not implemented.');
    }



    async readOneWithPopulate(id: string, populate: PopulateProps, select?: string): Promise<IActiveChallenge | null | undefined> {
        const activeChallenge = ActiveChallengeModel.findById(id).select(select as string)
        if (populate.participants) {
            activeChallenge.populate({
                path: 'participants',
                select: populate.participants
            })
        }

        if (populate.coach) {
            activeChallenge.populate({
                path: 'coach',
                select: populate.coach
            })
        }

        if (populate.challenge) {
            activeChallenge.populate({
                path: 'challenge',
                select: populate.challenge
            })
        }
        return (await activeChallenge.exec())?.toObject()
    }

}