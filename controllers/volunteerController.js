import { Volunteer } from "../models";
import { CustomErrorHandler } from "../services";
import volunteerSchema from "../validators/volunteervalidator";
import Joi from "joi";

////creating volunteer form
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

    // //adding data volunteer form
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

  ////find the volunteer data with pagination
  async index(req, res, next) {
    try {
      let { page, size, paginatedvolunteers } = req.query;

      if (!page) {
        page = 1;
      }
      if (!size) {
        size = 3;
      }

      const limit = parseInt(size);
      const skip = (page - 1) * 3;

      paginatedvolunteers = await Volunteer.find()
        .skip(skip)
        .limit(limit)
        .select("-__v");

      //documents = await Volunteer.find().select("-__v"); // this is for getting all donation
      //.sort({ _id: 1 }) this is for sort
      res.send({
        page,
        size,
        paginatedvolunteers,
      });
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }

    return res.json(documents);
  },

  //find the Volunteer with id
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
