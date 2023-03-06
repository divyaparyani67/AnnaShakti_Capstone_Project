import { Donation } from "../models";
import { CustomErrorHandler } from "../services";
import donationSchema from "../validators/donationvalidator";
import Joi from "joi";

const donationController = {
  async donations(req, res, next) {
    // validation

    const { error } = donationSchema.validate(req.body);

    const {
      foodQuantity,
      foodDescription,
      donorname,
      mobile,
      address,
      pincode,
      city,
      state,
    } = req.body;

    let document;
    try {
      document = await Donation.create({
        foodQuantity,
        foodDescription,
        donorname,
        mobile,
        address,
        pincode,
        city,
        state,
      });
    } catch (err) {
      return next(err);
    }
    res
      .status(201)
      .json({ document, message: "Donation details added successfully" });
  },

  async index(req, res, next) {
    let documents;
    try {
      documents = await Donation.find().select("-__v");
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }

    return res.json(documents);
  },
  async show(req, res, next) {
    let document;
    try {
      document = await Donation.findOne({ _id: req.params.id }).select("-__v");
    } catch (err) {
      return next(CustomErrorHandler.serverError);
    }
    return res.json(document);
  },
};

export default donationController;
