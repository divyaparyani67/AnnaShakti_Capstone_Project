import mongoose, { model } from "mongoose";

const Schema = mongoose.Schema;

const volunteerSchema = new Schema(
  {
    foodQuantityToCollect: { type: String, required: true },
    volunteername: { type: String, required: true },
    mobile: { type: Number, required: true },
    address: { type: String, required: true },
    pincode: { type: Number },
    city: { type: String, required: true },
    state: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Volunteer", volunteerSchema, "volunteers");
