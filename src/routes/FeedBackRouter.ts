import { Request, Response, Router } from 'express'
import FeedBackService from '../services/FeedBackService'
import AddFedBackRequest from '../dto/FeedBack/AddFeedBackRequest'
import { Mapper } from '../helpers/Mapper'
const router = Router()


router.get('/:feedbackId', async (req: Request, res: Response) => {
    try {
        let feedback = await FeedBackService.getSingleFeedBack(req.params.feedbackId)
        console.log(feedback)
        res.send(feedback)
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.get('/', async (req: Request, res: Response) => {
    try {
        let feedbacks = await FeedBackService.getAllFeedBack()
        console.log(feedbacks)
        res.send(feedbacks)
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.put('/:feedbackId', async (req: Request, res: Response) => {
    try {
        let feedback = await FeedBackService.updateFeedBack(req.params.feedbackId, req.body)
        console.log(`${feedback} updated successfully`)
        res.send(feedback)
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/:feedbackId', async (req: Request, res: Response) => {
    try {
        let feedback = await FeedBackService.deleteFeedBack(req.params.feedbackId)
        console.log(`${feedback} deleted successfully`)
        res.send(feedback)
    }
    catch (error) {
        res.status(400).send(error)
    }
})


router.post('/', async (req: Request, res: Response) => {
    try {
        let request = Mapper<AddFedBackRequest>(new AddFedBackRequest(), req.body)
        let feedback = await FeedBackService.createNewFeedBack(request)
        res.send(`${feedback} created successfully`)
    } catch (error) {
        res.status(400).send(error)
    }
})

export default router