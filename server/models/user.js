import mongoose, {Schema} from 'mongoose'

const userSchema = new Schema({
    first_name : {
        type : String,
        required : true,
        trim: true
    },
    last_name : {
        type : String,
        required : true,
        trim: true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase: true,
        trim: true
    },
    password : {
        type : String,
        required : true,
    },
    bio : {
        type : String,
        trim: true
    },
    role : {
        type : String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User