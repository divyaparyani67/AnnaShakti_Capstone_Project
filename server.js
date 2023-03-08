import express from "express";
import mongoose from "mongoose";
import { APP_PORT, DB_URL } from "./config";
import errorHandler from "./middlewares/errorHandler";
import routes from "./routes";
import cors from "cors";

const app = express();

//database connection
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("DB connected.... ");
});

app.use(express.json());
app.use(cors());
app.use("/api", routes);

app.use("/", (req, res) => {
  res.send({ Message: "Welcome to Annashaki Rest API" });
});

app.use(errorHandler);

const PORT = process.env.PORT || APP_PORT;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
