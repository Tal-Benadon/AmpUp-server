import mongoose, { FilterQuery, Document } from "mongoose";
import IActiveChallenge from '../interfaces/IActiveChallenge';
import IController from "../interfaces/IController";
import IMember from "../interfaces/IMember";
import INotifications from "../interfaces/INotifications";
import ActiveChallengeModel from '../models/ActiveChallengeModel';
import { IMyCoins, default as MemberModel, default as NotificationModel } from "../models/MemberModel";
import IStoreItem from "../interfaces/IStoreItem";
import IMemberItem from "../interfaces/IMemberItem";
import { ObjectId } from "mongodb";

export default class MemberController implements IController<IMember> {
    async create(data: IMember): Promise<IMember> {
        return await MemberModel.create(data)
    }
    async read(filter: FilterQuery<IMember>): Promise<IMember[]> {
        return await MemberModel.find(filter)
    }
    async readOne(id: string | ObjectId): Promise<IMember | null> {
        return await MemberModel.findById(id)
    }
    async readWithChallenge(id: string): Promise<IMember | null> {
        return await MemberModel.findById(id)
            .populate({
                path: 'myChallenge',
                select: 'challengeName creator duration cards.title cards.day cards.image cards.cardType  cards._id',
                populate: [{ path: 'creator', select: 'fullName picture' }]
            }).lean()
    }
    async readStartDate(id: string): Promise<IActiveChallenge | null> {
        const activeChallenge = await ActiveChallengeModel.findOne({ challenge: id }, 'startDate cards');
        if (!activeChallenge) {
            throw new Error('Active challenge not found');
        }
        return activeChallenge;
    }
    async del(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    async readOneProj(id: string, projection: string): Promise<IMember | null> {
        return await MemberModel.findById(id, projection);
    }
    async readNotifications(
        memberId: string,
        challengeId: string
    ): Promise<INotifications[] | null> {
        try {
            let member = await MemberModel.findById(memberId).populate(
                "notifications.sender"
            );
            if (!member) {
                console.error(`Member with ID ${memberId} not found`);
                return null;
            }
            let notifi = member?.notifications.filter(
                (notification) => notification.challenge == challengeId
            );
            return notifi;
        } catch (error) {
            console.error(
                `Error fetching notifications for memberId: ${memberId} and challengeId: ${challengeId}`,
                error
            );
            return null;
        }
    }
    async deleteNotification(
        memberId: string,
        notificationId: string
    ): Promise<INotifications[] | null> {
        return await NotificationModel.findByIdAndUpdate(memberId, {
            $pull: { notifications: { _id: notificationId } },
        });
    }
    async update(id: string | ObjectId, data: Partial<IMember>): Promise<IMember | null> {
        await MemberModel.updateOne({ _id: id }, data);
        return await this.readOne(id);
    }
    async updateStoreItem(id: string, data: IMemberItem): Promise<IMember | null> {
        return await MemberModel.findByIdAndUpdate(id, { $push: { myItems: data } });
    }
    async updateCoins(id: string, data: IMyCoins[]): Promise<IMember | null> {
        return await MemberModel.findByIdAndUpdate(id, { myCoins: data });
    }
    async save(data: IMember | null): Promise<void> {
        await (data as Document)?.save();
    }
    async addNotifications(memberId: string, notifications: INotifications[]): Promise<void> {
        try {
            const member = await MemberModel.findById(memberId);
            if (member) {
                notifications.forEach(notification => {
                    member.notifications.push(notification);
                });
                await member.save();
            } else {
            }
        } catch (error) {
            console.error('Error adding notifications:', error);
        }
    }
}

// async function run() {
//     const notifications: INotifications[] = [{
//         challenge: "6656df1b8437151db0cce539",
//         type: "sent support",
//         title: "Support Notification",
//         content: 'sent you "🤘 Rock on!"',
//         isRead: false,
//         date: new Date("2024-05-18T20:26:00.000Z"),
//         sender: "6656df1b8437151db0cce4e8"
//     },
//     {
//         challenge: "6656df1b8437151db0cce539",
//         type: "sent message",
//         title: "Yoga Session",
//         content: 'Join the team yoga session today',
//         isRead: false,
//         date: new Date("2024-05-18T20:32:00.000Z"),
//         sender: "6656df1b8437151db0cce4e6"
//     }
//     ];

//     const memberController = new MemberController();
//     await memberController.addNotifications("6656df1b8437151db0cce4e6", notifications);
// }

