import UserAuth from "../../middleware/UserAuth"

export default class CoinsRequest extends UserAuth {
    challengeId:string


    constructor(challengeId = '') {
        super()
        this.challengeId = challengeId
    }
}