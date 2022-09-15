import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        required: true
    },
    birthday_date: {
        type: String,
        default: ""
    },
    gender: {
        type: Number,
        default: 3
    },
    password: {
        type: String,
        default: ""
    },
    role: {
        type: Array,
        default: ["USER"]
    }
}, {
    timestamps: true
});
export default mongoose.model('user', userSchema);