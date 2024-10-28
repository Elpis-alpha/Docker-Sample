import mongoose from "mongoose";

// Sets up cat schema
const catSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  cuteness: {
    type: Number,
    required: true,
    max: 10,
    min: 0,
  },
});

// Create Cat Model
const Cat = mongoose.model("Cat", catSchema);

export default Cat;
