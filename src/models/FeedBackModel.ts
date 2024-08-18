import mongoose from 'mongoose'
import IFeedBack from '../interfaces/IFeedBack'

const feedbackSchema = new mongoose.Schema<IFeedBack>({
    subject: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}
)
export default mongoose.model<IFeedBack>('feedback', feedbackSchema)