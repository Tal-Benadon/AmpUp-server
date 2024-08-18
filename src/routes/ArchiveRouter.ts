import { Request, Response, Router } from "express";
import MemberService from "../services/MemberService";
import ArchiveService from "../services/ArchiveService";


const router = Router()

router.get('/pastChallenges', async (req: Request, res: Response) => {
    try {
        let userId = req.body.userId
        let memberChallenges = await ArchiveService.getMemberChallenges(userId)
        res.send(memberChallenges)
    } catch (error) {
        console.log({ error });
        res.status(400).send(error)
    }
})

router.get('/:challengeId', async (req: Request, res: Response) => {
    try {
        let challenge = await ArchiveService.getChallenge(req.params.challengeId)
        if (challenge) {
            res.send(challenge)
        }
    } catch (error) {
        console.log({ error });

        res.status(400).send(error)
    }
})

router.get('/:challengeId/:cardId', async (req: Request, res: Response) => {
    try {
        let card = await ArchiveService.getCard(req.params.challengeId, req.params.cardId)
        if (card) {
            res.send(card)
        }
    } catch (error) {
        res.status(400).send(error)
    }
})


export default router;