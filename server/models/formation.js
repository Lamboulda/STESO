import mongoose, {Schema} from "mongoose"

const formationSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    level: {
        type: String,
        enum: ['college', 'lyceepro', 'lyceegen', 'bac+2'],
        default: 'collège',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Pour savoir qui a créé la formation
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now }
}, { timestamps: true })

export default mongoose.model('Formation', formationSchema)