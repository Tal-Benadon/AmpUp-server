import { Request, Response, Router } from "express";
import CoachService from "../services/CoachService";
import { Mapper } from "../helpers/Mapper";
import { CreateCoachRequest } from "../dto/coach/CoachRequest";
import { verifyTokenCoach } from "../middleware/coachAuth";
import { tempImgUpload, validateAndUploadImg } from "../middleware/s3";
import CreateCardRequest from "../coach/dto/CreateCardRequest";
import AddMemberService from '../coach/service/AddMemberService'
import CardService from "../coach/service/cardService";

const router = Router()


router.get('/:userId', verifyTokenCoach, async (req: Request, res: Response) => {
    try {
        let coach = await CoachService.getSingleCoach(req.params.userId)
        res.send(coach)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/', tempImgUpload, async (req: Request, res: Response) => {
    try {
        let request = Mapper<CreateCoachRequest>(new CreateCoachRequest(), req.body)
        let coach = await CoachService.createNewCoach(request)
        if (req.file) {
            let url = await validateAndUploadImg(req.file, coach?._id as string)
            if (url)  coach = await CoachService.updateCoach(coach?._id as string, { picture: url })
        }
        res.send(coach)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.put('/newCard/:challengeId', verifyTokenCoach, async (req: Request, res: Response) => {

    try {
        let request = Mapper<CreateCardRequest>(new CreateCardRequest(), req.body)
        request.challengeId = req.params.challengeId
        request.userId = req.body.userId
        let coach = await CardService.crateCard(request)
        res.send(coach)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.put('/newMember/:challengeId', verifyTokenCoach, async (req: Request, res: Response) => {
    try {

        let newMember = req.body.email
        let challengeId = req.params.challengeId

        let coach = await AddMemberService.addMember(challengeId, newMember)
        res.send(coach)

    } catch (error) {
        res.status(400).send(error)
    }
})

router.put('/updateCard/:challengeId/card/:cardId', verifyTokenCoach, async (req: Request, res: Response) => {

    try {
        let request = Mapper<CreateCardRequest>(new CreateCardRequest(), req.body)
        request.challengeId = req.params.challengeId
        request._id = req.params.cardId
        request.userId = req.body.userId
        console.log({ request });

        let coach = await CardService.updateCard(request)
        res.send(coach)
    } catch (error) {
        console.log(error);

        res.status(400).send(error)
    }
})


// router.put("/img", uploadImage.any(), (req: Request, res: Response) => {
//     try {
//         let files = req.files as Express.Multer.File[];
//         console.log(files[0].mimetype);
//         res.send("Files updated successfully.");
//     } catch (error) {
//         console.log('Error:', error);
//         res.status(500).send("An error occurred during file update.");
//     }
// });


export default router;