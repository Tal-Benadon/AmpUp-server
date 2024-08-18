import { Request, Response, Router } from "express";
import { CreateTeamRequest, UpdateTeamRequest } from "../dto/team/TeamRequest";
import TeamService from "../services/TeamService";


const router = Router()

router.post('/', async (req: Request, res: Response) => {
    try {
        const team = await TeamService.createNewTeam(req.body as CreateTeamRequest);
        res.status(201).json(team);
    } catch (error) {
        res.status(400).send(error)
    }
})

router.put('/:teamId', async (req: Request, res: Response) => {
    try {
        let updatedTeam = await TeamService.updateTeamName(req.params.teamId, req.body as UpdateTeamRequest);
        res.status(201).json(updatedTeam);
    } catch (error) {
        res.status(400).send(error)
    }
})

router.put('/:teamId/member', async (req: Request, res: Response) => {
    try {
        const updatedMember = req.body
        const teamId = req.params.teamId;
        let updatedTeam = await TeamService.updateTeamMember(teamId, updatedMember);

        res.status(201).json(updatedTeam);
    } catch (error) {
        console.log(error);

        res.status(400).send(error)
    }
})

router.put('/register/:teamId/:teamMemberId', async (req: Request, res: Response) => {
    try {        
         let team = await TeamService.updateRegister(req.params.teamId, req.params.teamMemberId, req.body.member)
         res.send(team)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/:teamId/:memberId', async (req: Request, res: Response) => {
    try {
        let anser = await TeamService.checkIfRegister(req.params.teamId, req.params.memberId)
        res.send(anser)
    } catch (error) {
        res.status(400).send(error)
    }
})


export default router