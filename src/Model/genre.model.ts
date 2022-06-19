import mongoose from 'mongoose'
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    ImageUrl: {
        type: String,
        default: ""
    },
    slug:{
        type:String,
        default:""
    }
}, {
    timestamps: true
});
export default mongoose.model("genre",genreSchema);