import express from "express";
import bodyParser from "body-parser"; //process request body
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer"; //Upload files
import helmet from "helmet"; //Reques security
import morgan from "morgan"; //login security
import path from "path"; //local dirs
import { fileURLToPath } from "url"; //To setup correctly our dirs
import { dbConnection } from "./db/dbConfig.js";

import authRoutes from "./routes/auth.js";
import { register } from "./controllers/auth.js";

import userRoutes from "./routes/users.js";

import postRoutes from "./routes/posts.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";

import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

/* Middlewares and Packages Config */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); //As we using type:"module", this will help us to trigger local dir paths
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); //local storage

/* File Storage */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/* Routes Middleware */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* Routes */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await dbConnection(process.env.MONGO_URI);
    app.listen(port, console.log(`~Server running on port ${port}...`));
    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  } catch (error) {
    console.log(error);
  }
};

start();
