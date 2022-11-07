import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";
import mongoose from "mongoose";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email === "Google") return res.status(400).json({ message: "Google Login" });
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

export const signinWithGoogle = async (req, res) => {
  const { id, firstName, lastName } = req.body;
  const userId = mongoose.Types.ObjectId(id.repeat(2).substr(0, 24));
  try {
    const oldUser = await UserModel.findOne({ _id: userId, email: "Google", password: "Google" });
    if (!oldUser) {
      const result = await UserModel.create({ email: "Google", password: "Google", firstName, lastName, _id: userId })
      res.status(201).json({ result });
    }
    else {

      res.status(200).json({ result: oldUser });
    }
  }
  catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    if (email === "Google") return res.status(400).json({ message: "Google Email is not permitted" });

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
      const token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_TOKEN, { expiresIn: "1h" });
      res.status(200).json({ result: user, token });
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
  const { _id, currentUserAdminStatus, password } = req.body;

  if (id === _id || currentUserAdminStatus) {
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
  const { _id } = req.body;
  if (_id !== id) {
    try {
      const followUser = await UserModel.findById(id);

      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id} });
        const user = await UserModel.findByIdAndUpdate(_id, { $push: { following: id } }, { new: true });
        res.status(200).json(user.following);
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
  const { _id } = req.body;
  if (_id!== id) {
    try {
      const followUser = await UserModel.findById(id);

      if (followUser.followers.includes(_id)) {
        await followUser.updateOne({ $pull: { followers: _id} });
        const user = await UserModel.findByIdAndUpdate(_id, {$pull: { following: id }}, { new: true });
        res.status(200).json(user.following)
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

export const getAllUser = async (req, res) => {
  try {
    let users = await UserModel.find();
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc
      return otherDetails
    })
    return res.status(200).json(users)
  }
  catch (error) {
    return res.status(500).json(error)
  }
}