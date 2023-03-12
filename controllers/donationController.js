import { Donation } from "../models";
import { CustomErrorHandler } from "../services";
import donationSchema from "../validators/donationvalidator";
import Joi from "joi";

const donationController = {
  async donations(req, res, next) {
    const { error } = donationSchema.validate(req.body); // validation

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

    console.log("running donation controller");

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
      console.log(err);
      return next(err);
    }

    res
      .status(201)
      .json({ document, message: "Donation details added successfully" });
  },

  async index(req, res, next) {
    try {
      let { page, size, paginateddonations } = req.query;

      if (!page) {
        page = 1;
      }
      if (!size) {
        size = 3;
      }

      const limit = parseInt(size);
      const skip = (page - 1) * 3;

      paginateddonations = await Donation.find()
        .skip(skip)
        .limit(limit)
        .select("-__v");

      //documents = await Donation.find().select("-__v"); // this is for getting all donation
      //.sort({ _id: 1 })
      res.send({
        page,
        size,
        paginateddonations,
      });
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
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

  async getDonation(req, res, next) {
    let documents;

    try {
      documents = await Donation.find({
        _id: { $in: req.body.ids },
      }).select("-updatedAt -__v");
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    return res.json(documents);
  },
};

export default donationController;
