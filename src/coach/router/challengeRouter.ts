import { Request, Response, Router } from "express";
import ChallengeService from "../service/challengeServices";
import { Mapper } from "../../helpers/Mapper";
import craeteChaleneRequest from "../dto/challenge/createChallengeRequest";
const router = Router()

router.post('/', async (req: Request, res: Response) => {
    try {
        let request = Mapper<craeteChaleneRequest>(new (craeteChaleneRequest ) , req.body)
        let challenge = await ChallengeService.createChallenge(request)
        res.send(challenge)
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})





export default router;