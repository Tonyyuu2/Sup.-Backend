import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./Routes/PostsRoute.js";
import cors from "cors";

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
mongoose.set('strictQuery', false)

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
dotenv.config();

app.use("/posts", router);

mongoose
  .connect(process.env.ATLAS_URI, {
    dbName: 'sup-posts',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Listening on ${process.env.PORT}`);
    })
  )
  .catch((error) => console.log(error));
