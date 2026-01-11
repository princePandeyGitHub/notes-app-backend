import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Notes", notesSchema);