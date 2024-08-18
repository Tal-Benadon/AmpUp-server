import { Request, Response, Router } from 'express'
import { Mapper } from '../helpers/Mapper'
import ActiveChallegeService from '../services/ActiveChallengeService'
import AddActiveChallengeRequest from '../dto/activeChallenge/AddActiveChallengeRequest'
import { loveCard } from '../services/LoveCardService'
import IActiveChallenge from '../interfaces/IActiveChallenge'
import GetActiveChallToStartReq from '../dto/activeChallenge/GetActiveChallToStartReq'
import AddUserRequest from '../dto/user/AddUserRequest'
import GetStatusDoneCardsRes from '../dto/activeChallenge/GetStatusDoneCardsRes'
import { verifyTokenCoach } from '../middleware/coachAuth'
import { tempMediaUpload, validateAndUploadMedia } from '../middleware/s3'
const router = Router()

router.get('/:activeChallengeId', verifyTokenCoach, async (req: Request, res: Response) => {
    try {
        let activeChallenge = await ActiveChallegeService.getSingleActiveChallenge(req.params.userId)
        console.log("hi");

        res.send(activeChallenge)
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.get('/start/:activeChallengeId', async (req: Request, res: Response) => {
    try {
        console.log("I GOT HERE");

        let activeChallenge: GetActiveChallToStartReq | null = await ActiveChallegeService.getActiveChallengeToStartScreen(req.params.activeChallengeId)
        console.log("I GOT HERE PART 2");
        console.log({ activeChallenge });

        res.send(activeChallenge)
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.get('/status/:activeChallengeId', async (req: Request, res: Response) => {
    try {
        let userId = req.body.userId
        let startDailyDeck: GetStatusDoneCardsRes = await ActiveChallegeService.getStartDailyDeck(userId, req.params.activeChallengeId)
        res.send(startDailyDeck)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.post('/', async (req: Request, res: Response) => {
    try {
        let activeChallenge = await ActiveChallegeService.createNewActiveChallenge(req.body)
        console.log(activeChallenge);

        res.send(activeChallenge)
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.get('/cardLove/:challengeId', async (req: Request, res: Response) => {
    try {

        let luck = await loveCard.getLove(req.params.challengeId)
        console.log({ luck })
        res.send(luck)

    } catch (error) {
        console.log(error);

        res.status(400).send(error)
    }
})

// תשובה על קלף ספציפי
router.post('/:activeChallengeId/card/:cardId', async (req: Request, res: Response) => {
    try {
        let activeChallengeId = req.params.activeChallengeId;
        let cardId = req.params.cardId;
        await ActiveChallegeService.handleCardAnswer(activeChallengeId, cardId, req.body);
        res.json({ success: true });
    }
    catch (error) {
        console.log({ error });
        res.status(400).send({ error })
    }
})

router.post('/join/:challengeId', async (req: Request, res: Response) => {
    try {
        let userId = req.body.userId
        // let userId = '665c8b2bd125fccc69966357'
        let activeChallengeId = req.params.challengeId
        const result = await ActiveChallegeService.joinActiveChallenge(userId, activeChallengeId)
        res.send(result)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

export default router;