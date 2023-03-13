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
    let documents;
    try {
      const {page,limit} = req.query;
      const skip = (page-1)*10;
      documents = await Volunteer.find().select("-__v").skip(skip).limit(limit);
      res.send(documents)
      
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
