import { Request, Response, Router } from 'express'
import UserService from '../services/UserService'
import AddUserRequest from '../dto/user/AddUserRequest'
import { Mapper } from '../helpers/Mapper'
const router = Router()


router.get('/:userId', async (req: Request, res: Response) => {
    try {
        let user = await UserService.getSingleUser(req.params.userId)
        res.send(user)
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.post('/', async (req: Request, res: Response) => {
    try {
        let request = Mapper<AddUserRequest>(new AddUserRequest(), req.body)
        // res.send(request)
        let user = await UserService.createNewUser(request)
        res.send(user)
    }
    catch (error) {
        res.status(400).send(error)
    }
})

export default router;