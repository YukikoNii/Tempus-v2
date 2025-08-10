import express from "express";
import db from "../db/connection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyUser from "./middleware.js";
import logout from "./logout.js";
import { ObjectId } from "mongodb";

// create router object (to define routes separately from main express app)
// not exactly necessary at the moment
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    let collection = await db.collection("users");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    if (await doesEmailExist(req.body.email, collection)) {
      return res.status(200).send({ type: "email" });
    } else if (await doesUsernameExist(req.body.username, collection)) {
      return res.status(200).send({ type: "username" });
    }

    let newUserInfo = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      bgName: "Mountains",
      profileImgName: "Default",
      soundName: "Default",
      memo: "",
    };

    let result = await collection.insertOne(newUserInfo);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send("Error signing up");
  }
});

router.post("/logout", logout);

const doesEmailExist = async (email, collection) => {
  const result = await collection.countDocuments(
    { email: email },
    { limit: 1 }
  );
  return result == 1;
};

const doesUsernameExist = async (username, collection) => {
  const result = await collection.countDocuments(
    { username: username },
    { limit: 1 }
  );
  return result == 1;
};

const getUser = async (username, password, collection) => {
  console.log("getUser called");
  const result = await collection.findOne({ username: username });
  console.log("user found");
  if (!result) {
    return null;
  } else {
    if (await bcrypt.compare(password, result.password)) {
      return result;
    }
  }
};

router.post("/login", async (req, res) => {
  try {
    console.log("NODE_ENV: ", process.env.NODE_ENV);
    console.log("login route successfully reached");
    let collection = await db.collection("users");
    const user = await getUser(
      req.body.username,
      req.body.password,
      collection
    );
    console.log("user info collected");
    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "300h",
      });

      console.log("JWT_SECRET: ", process.env.JWT_SECRET);
      console.log("token defined: ", token);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        sameSite: "Lax",
        maxAge: 300 * 60 * 60 * 1000,
        path: "/",
      });

      console.log("cookie is set.");

      return res.status(200).json({ message: "Successfully logged in"});
    } else {
      console.log("user not found")
      return res.status(401).send("Incorrect login information");
    }
  } catch (e) {
    res.status(500).send("Some error occured");
  }
});

router.get("/settings", verifyUser, async (req, res) => {
  let collection = await db.collection("users");
  const user = await collection.findOne({ _id: new ObjectId(req.userId) }); // deprecated
  res.json(user);
});

router.get("/home", verifyUser, async (req, res) => {
  let collection = await db.collection("users");
  let todoCollection = await db.collection("todo");
  const todos = await todoCollection
    .find({
      userId: new ObjectId(req.userId),
      dueDate: { $regex: new Date().toISOString().split("T")[0] },
    })
    .toArray();
  const user = await collection.findOne({ _id: new ObjectId(req.userId) }); // deprecated
  res.json({ user: user, todos: todos });
});

router.get("/home/memo", verifyUser, async (req, res) => {
  let collection = await db.collection("users");
  const user = await collection.findOne({ _id: new ObjectId(req.userId) }); // deprecated
  res.json(user);
});

router.post("/home/memo", verifyUser, async (req, res) => {
  let collection = await db.collection("users");
  const user = await collection.updateOne(
    { _id: new ObjectId(req.userId) },
    { $set: { memo: req.body.memo } }
  ); // deprecated
});

router.get("/todo", verifyUser, async (req, res) => {
  let collection = await db.collection("users");
  const user = await collection.findOne({ _id: new ObjectId(req.userId) }); // deprecated
  let todoCollection = await db.collection("todo");
  const todos = await todoCollection
    .find({ userId: new ObjectId(req.userId) })
    .toArray();
  res.json({ user: user, todos: todos });
});

router.post("/todo/add", verifyUser, async (req, res) => {
  console.log("userId: ", req.userId);
  console.log("mode: ", req.body.editMode);
  let todoCollection = db.collection("todo");
  let result;
  if (req.body.editMode) {
    let updatedTodo = {
      userId: new ObjectId(req.userId),
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      dueTime: req.body.dueTime,
      priority: req.body.priority,
      tags: req.body.tags,
    };

    result = await todoCollection.updateOne(
      { _id: new ObjectId(req.body._id) },
      { $set: updatedTodo }
    );
  } else {
    let newTodo = {
      userId: new ObjectId(req.userId),
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      dueTime: req.body.dueTime,
      priority: req.body.priority,
      tags: req.body.tags,
    };
    result = await todoCollection.insertOne(newTodo);
  }
  res.status(200).json(result);
});

router.post("/todo/delete", verifyUser, async (req, res) => {
  let todoCollection = db.collection("todo");
  const result = await todoCollection.deleteOne({
    _id: new ObjectId(req.body.id),
  });
  res.status(200).json({ result });
});

router.get("/calendar", verifyUser, async (req, res) => {
  const projection = {
    title: 1,
    dueDate: 1,
  };
  let todoCollection = await db.collection("todo");
  const todos = await todoCollection
    .find({ userId: new ObjectId(req.userId) })
    .project(projection)
    .toArray();

  res.json({ todos });
});

router.post("/home", verifyUser, async (req, res) => {
  let collection = await db.collection("users");
  const user = await collection.updateOne(
    { _id: new ObjectId(req.userId) },
    { $set: { bgName: req.body.bgName } }
  ); // deprecated
});

router.get("/appheader", verifyUser, async (req, res) => {
  let collection = await db.collection("users");
  const user = await collection.findOne({ _id: new ObjectId(req.userId) }); // deprecated
  res.json(user);
});

router.post("/accountSettings", verifyUser, async (req, res) => {
  let collection = await db.collection("users");
  const user = await collection.updateOne(
    { _id: new ObjectId(req.userId) },
    { $set: { profileImgName: req.body.profileImgName } }
  ); // deprecated
});

router.post("/accountSettings/username", verifyUser, async (req, res) => {
  let collection = await db.collection("users");
  // return error if user already exists.
  if (await doesUsernameExist(req.body.username, collection)) {
    return res.status(401).send({ type: "username" });
  }

  const user = await collection.updateOne(
    { _id: new ObjectId(req.userId) },
    { $set: { username: req.body.username } }
  ); // deprecated
  res.status(200).send(user);
});

router.post("/accountSettings/email", verifyUser, async (req, res) => {
  let collection = await db.collection("users");

  if (await doesEmailExist(req.body.email, collection)) {
    return res.status(401).send({ type: "email" });
  }
  const user = await collection.updateOne(
    { _id: new ObjectId(req.userId) },
    { $set: { email: req.body.email } }
  ); // deprecated
  res.status(200).send(user);
});

router.get("/accountSettings", verifyUser, async (req, res) => {
  let collection = await db.collection("users");
  const user = await collection.findOne({ _id: new ObjectId(req.userId) }); // deprecated
  res.json(user);
});

router.post("/notificationSettings", verifyUser, async (req, res) => {
  try {
    let collection = await db.collection("users");

    let user = await collection.updateOne(
      { _id: new ObjectId(req.userId) },
      { $set: { soundName: req.body.soundName } }
    ); // deprecated
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send("Database error");
  }
});

router.get("/timer", verifyUser, async (req, res) => {
  let collection = await db.collection("users");
  const user = await collection.findOne({ _id: new ObjectId(req.userId) }); // deprecated
  res.json(user);
});

router.get("/timeTracking", verifyUser, async (req, res) => {
  let timeLogCollection = await db.collection("timeLog");
  const timeLogs = 
    await timeLogCollection
      .find({ userId: new ObjectId(req.userId)})
      .toArray();
  res.json(timeLogs);
});

router.get("/projectDropDown", verifyUser, async (req, res) => {
  let projects = await db.collection("projects").find().toArray();
  console.log(projects);
  res.json(projects);
});

router.post("/timeTracking", verifyUser, async (req, res) => {
  let timeLogCollection = await db.collection("timeLog");

   let newTimeLog = {
      name: req.body.name,
      project: req.body.project,
      duration: req.body.duration,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      userId: new ObjectId(req.userId),
    };
  const result = await timeLogCollection.insertOne(newTimeLog);
});

router.post("/timeTracking/delete", verifyUser, async (req, res) => {
  console.log(req.body.id);
  let timeLogCollection = await db.collection("timeLog");
  const result = await timeLogCollection.deleteOne({
    _id: new ObjectId(req.body.id),
  });
  console.log(result);
  res.status(200).json({ result });
});

router.get("/timeLogCalendar/events/thisWeek", verifyUser, async (req, res) => {
  let timeLogCollection = await db.collection("timeLog");
  console.log("weekstart", req.query.weekStart);
  const result = await timeLogCollection.find({
    userId: new ObjectId(req.userId),
    startTime: {$gt: parseInt(req.query.weekStart)},
    startTime: {$lt: parseInt(req.query.weekStart) + 604800000},
  }).toArray();
  res.json(result);
});

export default router;
