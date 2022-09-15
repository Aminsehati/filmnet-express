import mongoose from 'mongoose'
const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    name_en: {
        type: String,
        required: true,
        unique: true,
    },
    summary: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    cover_image: {
        type: String,
        default: ""
    },
    avatar_image: {
        type: String,
        default: ""
    },
    contents: [
        {
            type: mongoose.Types.ObjectId,
            ref: "content"
        }
    ]
})
const artist = mongoose.model("artist", artistSchema);
export  {
    artist
}
export  {
    artistSchema
}