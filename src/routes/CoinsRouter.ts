import { Request, Response, Router } from 'express'
import { Mapper } from '../helpers/Mapper'
import CoinsRequest from '../dto/coins/CoinsRequest'
import CoinsService from '../services/CoinsService'

const router = Router()

router.put('/add-coins', async (req: Request, res: Response) => {
    try {
        let request = Mapper<CoinsRequest>(new (CoinsRequest), req.body)
        let coins = await CoinsService.addCoins(request)
        res.send(coins)
        console.log(2);
    }
    catch (error) {
        console.log({ error });
        res.status(400).send(error)
    }
})

export default router;