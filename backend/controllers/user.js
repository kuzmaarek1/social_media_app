import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.js";

const secret = 'test';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });
    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, process.env.JWT_TOKEN, { expiresIn: "1h" });
    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const oldUser = await UserModel.findOne({ email });
    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await UserModel.create({ email, password: hashedPassword, firstName, lastName });

    const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_TOKEN, { expiresIn: "1h" });
    res.status(201).json({ result, token });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    const { password, ...otherDetails } = user._doc;
    res.status(200).json(otherDetails);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { _id, currentUserAdminStatus, password } = req.body;

  if (id === _id || currentUserAdminStatus) {
    try {
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 12);
        req.body.password = hashedPassword;
      }
      const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
      const token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_TOKEN,{ expiresIn: "1h" });
      res.status(200).json({ result:user, token });
    } catch (error) {
      res.status(500).json(error);
      console.log(error)
    }
  } else {
    res.status(403).json("Access Denied! you can only update your own profile");
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { currentUserId, currentUserAdminStatus, password } = req.body;

  if (id === currentUserId || currentUserAdminStatus) {
    try {
      const user = await UserModel.findByIdAndDelete(id);
      res.status(200).json("User deleted successfully");
    } catch (error) {
      res.status(500).json(error);
      console.log(error)
    }
  } else {
    res.status(403).json("Access Denied! you can only update your own profile");
  }
}

export const followUser = async (req, res) => {
  const { id } = req.params;
  const { currentUserId } = req.body;
  if (currentUserId !== id) {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);

      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User followed!");
      } else {
        res.status(403).json("User is Already followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
      console.log(error)
    }
  } else {
    res.status(403).json("Action forbidden");
  }
}

export const unFollowUser = async (req, res) => {
  const { id } = req.params;
  const { currentUserId } = req.body;
  if (currentUserId !== id) {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);

      if (followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $pull: { followers: currentUserId } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("User Unfollowed!");
      } else {
        res.status(403).json("User is not followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
      console.log(error)
    }
  } else {
    res.status(403).json("Action forbidden");
  }
}