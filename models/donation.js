import mongoose, { model } from "mongoose";

const Schema = mongoose.Schema;

const donationSchema = new Schema(
  {
    foodQuantity: { type: String, required: true },
    foodDescription: { type: String, required: true },
    donorname: { type: String, required: true },
    mobile: { type: Number, required: true },
    address: { type: String, required: true },
    pincode: { type: Number },
    city: { type: String, required: true },
    state: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Donation", donationSchema, "donations");
