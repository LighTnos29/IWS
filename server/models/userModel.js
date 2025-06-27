import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    address: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address'
        }
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Orders'
        }
    ]
}, {
    timestamps: true
})

const userModel = mongoose.model('User', userSchema)
export default userModel
