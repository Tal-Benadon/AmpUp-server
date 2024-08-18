import UserAuth from "../../middleware/UserAuth"

export default class AddUserRequest extends UserAuth {
    fullName: string
    email: string

    constructor(fn = '', email = '') {
        super()
        this.fullName = fn
        this.email = email
    }
}
