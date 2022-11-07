import mongoose from "mongoose";
import PostModel from "../models/post.js";
import UserModel from "../models/user.js";

export const createPost = async (req, res) => {
    const newPost = new PostModel(req.body);
    try {
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostModel.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        const post = await PostModel.findById(id);
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("Post Updated");
        } else {
            res.status(403).json("Action forbidden");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        const post = await PostModel.findById(id);
        if (post.userId === userId) {
            await post.deleteOne();
            res.status(200).json("Post deleted successfully");
        } else {
            res.status(403).json("Action forbidden");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const likePost = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    try {
        const post = await PostModel.findById(id);
        const index = post.likes.findIndex((id) => id === String(userId));

        if (index === -1) {
            post.likes.push(userId);
        } else {
            post.likes = post.likes.filter((id) => id !== String(userId));
        }

        const updatedPost = await PostModel.findByIdAndUpdate(id, post, { new: true });
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json(error);
        console.log(error)
    }
};

export const getTimelinePosts = async (req, res) => {
    const userId = req.params.id;

    try {
        const currentUserPosts = await PostModel.find({ userId: userId });
        const followingPosts = await UserModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId),
                },
            }, {
                $addFields: { "user_id": { "$toString": "$_id" } }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "following",
                    as: "user",
                },
            },
            {
                $unwind: "$user"
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts",
                },
            },
            {
                $unwind: "$followingPosts"
            },
            {
                $project: {
                    followingPosts: 1,
                    "user.firstName": 1,
                    "user.lastName": 1,
                    _id: 0,
                },
            },
        ]);
        const posts = followingPosts.map(({ user, followingPosts }) => {
            return { ...followingPosts, ...user }
        });
        res
            .status(200)
            .json(currentUserPosts.concat(...posts)
                .sort((a, b) => {
                    return b.createdAt - a.createdAt;
                })
            );
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};