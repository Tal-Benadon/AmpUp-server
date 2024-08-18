import mongoose from 'mongoose'
import IMedia from '../interfaces/IMedia';

const mediaSchema = new mongoose.Schema<IMedia>({
    type: {
        type: String,
        enum: ['image', 'video', "audio", "document", "other"]
    },
    fileName: {
        type: String,
    },
    path: {
        type: String,
    },
    size: {
        type: String,
    }
})

export default mongoose.model<IMedia>('Media', mediaSchema)
