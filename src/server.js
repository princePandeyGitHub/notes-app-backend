import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

// importing routes
import notesRoute from './routes/notesRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares to parse json request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// applying routes
app.use('/',notesRoute);

app.get("/", (req, res) => {
  res.send("Backend is alive");
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
