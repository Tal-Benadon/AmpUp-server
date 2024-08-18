import { Request, Response, Router } from "express";
import LuckService from "../services/LuckService";

const router = Router()


router.get('/:challengeId/cardId/:cardId', async (req: Request, res: Response) => {
    try {
   
        let luck = await LuckService.getCasino(req.params.challengeId, req.params.cardId)
        res.send(luck)

    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/resultCasino/:challengeId/cardId/:cardId', async (req: Request, res: Response) => {
    try {
      let luck = await LuckService.getResCasino(req.params.challengeId, req.params.cardId)
        res.send(luck)
    } catch (error) {
        res.status(400).send(error)
    }
})

export default router; 