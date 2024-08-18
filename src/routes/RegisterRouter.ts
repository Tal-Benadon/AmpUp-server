import { Request, Response, Router } from 'express'
import AddMemberRequest from "../dto/member/AddMemberRequest";
import MemberService from "../services/MemberService";
import createToken from "../middleware/createToken";
import { Mapper } from "../helpers/Mapper";

const router = Router()

router.post('/', async (req: Request, res: Response) => {
    try {
        const test = await MemberService.findNewMemberInvites('665c8b2bd125fccc69966357')
        // const test2 = await MemberService.joinActiveChallenge('6656df1b8437151db0cce4e6', '6656df1b8437151db0cce584')
        // const request = Mapper<AddMemberRequest>(new AddMemberRequest(), req.body);

        // const newMember = await MemberService.createNewMember(request);

        // const token = createToken({ userId: newMember?.id, userPermission: 'user' });
        // console.log(token)
        // res.json({ token, newMember });
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

export default router