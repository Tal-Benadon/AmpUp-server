import { Request, Response, Router } from "express";
import NotificationService from "../services/notificationService";
import { Mapper } from "../helpers/Mapper";
import { CreateCoachRequest } from "../dto/coach/CoachRequest";

const router = Router();

router.get("/:chalngeId", async (req: Request, res: Response) => {
  try {
    let notifications = await NotificationService.getNotifications(
      req.body.memberId,
      req.params.chalngeId
    );

    res.send(notifications);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:notifictionId", async (req: Request, res: Response) => {
  try {
    let notifications = await NotificationService.deleteOneNotification(
      req.body.memberId,
      req.params.notifictionId
    );
    res.send("deleted succeדsfuly");
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
