import mongoose from 'mongoose'
const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    flug: {
        type: String,
        required: true
    },
    age_restriction: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true,
    },
    imdb_rank_percent: {
        type: String,
        default: ""
    },
    duration: {
        type: String,
        default: ""
    },
    genre: [
        {
            type: mongoose.Types.ObjectId,
            ref: "genre"
        }
    ],
    country: [
        {
            type: mongoose.Types.ObjectId,
            ref: "country"
        }
    ],
    cats: [
        {
            role: {
                type: String,
            },
            artists: {
                type: mongoose.Types.ObjectId,
                ref: 'artist'
            }
        }
    ],
    artists: [
        {
            role: [
                {
                    type: String,
                },
            ],
            person: {
                type: mongoose.Types.ObjectId,
                ref: 'artist'
            }
        }
    ],
    imageUrl: {
        type: String,
        required: true
    },
    coverImageUrl: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
export default mongoose.model("content", contentSchema);