import mongoose, { model } from "mongoose";

const Schema = mongoose.Schema;

const donationSchema = new Schema(
  {
    foodQuantity: { type: String, required: true },
    foodDescription: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    pincode: { type: Number },
    city: { type: String, required: true },
    state: { type: String, required: true },
    role: { type: String, default: "donor" },
  },
  { timestamps: true }
);

export default mongoose.model("Donation", donationSchema, "donations");
