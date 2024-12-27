import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import UserModel from "./models/usermodel.js";
import cors from "cors";

const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

//connection for mongodb
mongoose
  .connect("mongodb://localhost:27017/upload-image-mern")
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));

//multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

//api for uploading images
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log(req.file);

    const createUser = new UserModel({
      image: req.file.filename,
    });

    await createUser.save();
  } catch (error) {
    return res
      .status(500)
      .json({ err: error.message, msg: "Internal server error" });
  }
});

//api for getting images
app.get("/get-images", async (req, res) => {
  try {
    const findAllImage = await UserModel.find();
    if (findAllImage) {
      return res.status(200).json(findAllImage);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ err: error.message, msg: "Internal server error" });
  }
});

app.listen(4000, () => console.log("server started at port 4000"));
