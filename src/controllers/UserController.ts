// import { ObjectId } from 'mongoose';
import { FilterQuery } from 'mongoose';
import IController from '../interfaces/IController';
import IUser from '../interfaces/IUser';
import UserModel from '../models/UserModel'

export default class UserController implements IController<IUser> {
    async create(data: IUser): Promise<IUser> {
        return await UserModel.create(data)
    }
    async read(filter: FilterQuery<IUser>): Promise<IUser[]> {
        return await UserModel.find(filter)
    }
    async readOne(id: string): Promise<IUser | null> {
        return await UserModel.findById(id)
    }
    async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
        await UserModel.updateOne({_id:id},data)
        return await this.readOne(id)
    }
    async del(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}


