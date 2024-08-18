import { FilterQuery } from "mongoose";
import ICoach from "../interfaces/ICoach";
import IController from "../interfaces/IController";
import CoachModel from '../models/CoachModel'

export default class CoachController implements IController<ICoach> {
    async create(data: ICoach): Promise<ICoach> {
        return await CoachModel.create(data)
    }
    async read(filter: FilterQuery<ICoach>): Promise<ICoach[]> {
        return await CoachModel.find(filter)
    }
    async readOne(id: string): Promise<ICoach | null> {
        return await CoachModel.findById(id)
    }
    async update(id: string, data: Partial<ICoach>): Promise<ICoach | null> {
        await CoachModel.updateOne({ _id: id }, data)
        return await this.readOne(id)
    }
    async del(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}