import express from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import User from "./userModel";

const router = express.Router();

async function registerUser(req, res) {
  const user = await User.findByUserName(req.body.username);
  if (user) {
    return res
      .status(403)
      .json({ success: false, msg: "Username already taken." });
  }
  // Add input validation logic here
  await User.create(req.body);
  res.status(201).json({ success: true, msg: "User successfully created." });
}

async function authenticateUser(req, res) {
  const user = await User.findByUserName(req.body.username);
  if (!user) {
    return res.status(401).json({ success: false, msg: "User not found." });
  }

  const isMatch = await user.comparePassword(req.body.password);
  if (isMatch) {
    const token = jwt.sign({ username: user.username }, process.env.SECRET);
    res.status(200).json({ success: true, token: "BEARER " + token });
  } else {
    res.status(401).json({ success: false, msg: "Wrong password." });
  }
}

/**
 * @swagger
 * /users/:
 *   get:
 *     tags:
 *      - Users
 *     summary: Get all users.
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.get("/", async (req, res) => {
  // const users = await User.find();
  const users = await User.find({}, { password: 0 });
  res.status(200).json(users);
});

/**
 * @swagger
 * /users/:
 *   post:
 *    tags:
 *      - Users
 *    summary: Register or authenticate a user.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      '200':
 *        description: A successful response
 *      '201':
 *        description: User successfully created
 *      '400':
 *        description: Username and password are required
 *      '401':
 *        description: User not found or wrong password
 *      '403':
 *        description: Username already taken
 *      '500':
 *        description: Internal server error
 */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      if (!req.body.username || !req.body.password) {
        return res
          .status(400)
          .json({ success: false, msg: "Username and password are required." });
      }
      if (req.query.action === "register") {
        await registerUser(req, res);
      } else {
        await authenticateUser(req, res);
      }
    } catch (error) {
      // Log the error and return a generic error message
      console.error(error);
      res.status(500).json({ success: false, msg: "Internal server error." });
    }
  }),
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *      - Users
 *     summary: Update a user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '404':
 *         description: Unable to update user
 */
router.put("/:id", async (req, res) => {
  if (req.body._id) delete req.body._id;
  const result = await User.updateOne(
    {
      _id: req.params.id,
    },
    req.body,
  );
  if (result.matchedCount) {
    res.status(200).json({ code: 200, msg: "User Updated Successfully" });
  } else {
    res.status(404).json({ code: 404, msg: "Unable to Update User" });
  }
});

export default router;
