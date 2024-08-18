import IUser from "../interfaces/IUser"
import UserService from "../services/UserService"
import Permission from "../types/Permission"

export default abstract class UserAuth {
    userId: string
    userPermission: Permission
    user?: IUser | null

    constructor() {
        this.userId = ''
        this.userPermission = 'user'
    }

    async getFullData?(): Promise<IUser | null> {
        if (this.user) return this.user;
        const user = await UserService.getSingleUser(this.userId);
        this.user = user;
        return user;
    }
}