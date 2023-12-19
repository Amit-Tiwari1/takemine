import { User } from "../models/Users.js";

export const User = {};

export default registerUser = (req, res) => {
  const newUser = {
    admin_id: req.body.admin_id,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };

  User.create(newUser, (err, user) => {
    if (err) {
      res.status(500).json({ error: "Failed to register user" });
      return;
    }
    res.status(201).json(user);
  });
};

exports.getAllUsers = (req, res) => {
  User.getAllUsers((err, users) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch users" });
      return;
    }
    res.status(200).json(users);
  });
};
