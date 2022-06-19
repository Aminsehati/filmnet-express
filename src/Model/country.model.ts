import mongoose from 'mongoose'
const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})
export default mongoose.model("country", countrySchema)