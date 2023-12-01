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

/* Routes */
app.use("/auth", authRoutes);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await dbConnection(process.env.MONGO_URI);
    app.listen(port, console.log(`~Server running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
