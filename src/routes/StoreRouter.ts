import { Request, Response, Router } from "express";
import ChallengeController from "../controllers/ChallengeController";
import StoreService from "../services/Store.Service";
import IChallenge from "../interfaces/IChallenge";

const router = Router();

router.get("/:challenge_id", async (req: Request, res: Response) => {
  try {
    let challenge = await StoreService.getChallenge(req.params.challenge_id);
    console.log(" r ", challenge);
    res.send(challenge);

  } catch (error) {
    res.status(400).send(error)
  }
});

router.put('/:storeItemId', async (req: Request, res: Response) => {
  try {
    let memberId = req.body.userId
    let challengeId = req.body.challengeId
    let storeItemId = req.params.storeItemId
    let updatedChallenge: IChallenge | null = await StoreService.updateMemberItems(memberId, challengeId, storeItemId)
    res.send(updatedChallenge)
  }
  catch (error) {
    res.status(400).send(error)
  }
})

// router.put('active/:storeItemId', async (req: Request, res: Response) => {
//   try {
//     let memberId = req.body.userId
//     let challengeId = req.body.challengeId
//     let storeItemId = req.params.storeItemId
//     let updatedChallenge: IChallenge | null = await StoreService.updateMemberItems(memberId, challengeId, storeItemId)
//     res.send(updatedChallenge)
//   }
//   catch (error) {
//     res.status(400).send(error)
//   }
// })




export default router