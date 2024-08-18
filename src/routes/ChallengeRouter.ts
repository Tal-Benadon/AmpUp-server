import { Request, Response, Router } from "express";
import ChallengeService from "../services/ChallengeService";

const router = Router()

router.get('/start/:challengeId', async (req:Request, res:Response) => {
    try{
        let challenge = await ChallengeService.getOneChallenge(req.params.challengeId)
        res.send(challenge)
    }
    catch(error){
        console.log(error);
        res.status(400).send(error)
    }
})





export default router;