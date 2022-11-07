import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    profilePicture: String,
    coverImage: String,
    about: String,
    livesIn: String,
    worksAt: String,
    country: String,
    relationship: String,
    followers: [],
    following: []
}, { timestamps: true });

export default mongoose.model("User", userSchema);