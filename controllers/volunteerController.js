import { Volunteer } from "../models";
import { CustomErrorHandler } from "../services";
import volunteerSchema from "../validators/volunteervalidator";
import Joi from "joi";

const volunteerController = {
  async volunteer(req, res, next) {
    // validation

    const { error } = volunteerSchema.validate(req.body);

    const {
      foodQuantityToCollect,
      volunteername,
      mobile,
      address,
      pincode,
      city,
      state,
    } = req.body;

    let document;
    try {
      document = await Volunteer.create({
        foodQuantityToCollect,
        volunteername,
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
      .json({ document, message: "Volunteer details added successfully" });
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

      paginateddonations = await Volunteer.find()
        .skip(skip)
        .limit(limit)
        .select("-__v");

      //documents = await Donation.find().select("-__v"); // this is for getting all donation
      //.sort({ _id: 1 }) this is for sort
      res.send({
        page,
        size,
        paginateddonations,
      });
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }

    return res.json(documents);
  },
  async show(req, res, next) {
    let document;
    try {
      document = await Volunteer.findOne({ _id: req.params.id }).select("-__v");
    } catch (err) {
      return next(CustomErrorHandler.serverError);
    }
    return res.json(document);
  },
};

export default volunteerController;
