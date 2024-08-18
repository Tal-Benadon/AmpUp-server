import MemberController from "../controllers/MemberControllers";
import IMember from "../interfaces/IMember";
import INotifications from "../interfaces/INotifications";
// import INotifications from "../interfaces/INotifications";

export default class NotificationService {
  static controller = new MemberController();

  static async getNotifications(
    memberId: string,
    challengeId: string
  ): Promise<IMember | INotifications[] | null> {
    return await this.controller.readNotifications(memberId, challengeId);
  }
  static async deleteOneNotification(
    memberId: string,
    notificationId: string
  ): Promise<IMember | INotifications[] | null> {
    return await this.controller.deleteNotification(memberId, notificationId);
  }
}
