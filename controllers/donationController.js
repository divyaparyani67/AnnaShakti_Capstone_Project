import { Donation } from "../models";
import { CustomErrorHandler } from "../services";
import donationSchema from "../validators/donationvalidator";
import router from "../routes";
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
      const {page,limit} = req.query;
      const skip = (page-1)*10;
      documents = await Donation.find().select("-__v").skip(skip).limit(limit);
      res.send(documents)
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }

    return res.json(documents);
    res.send(res.paginatedResults, documents)
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



// /function that will handle pagination logic
function paginate(data, page, limit) {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  results.totalCount = data.length;
  results.currentPage = page;
  results.limit = limit;
  results.totalPages = Math.ceil(data.length / limit);

  if (endIndex < data.length) {
    results.nextPage = page + 1;
  }

  if (startIndex > 0) {
    results.prevPage = page - 1;
  }

  results.items = data.slice(startIndex, endIndex);

  return results;
}

//middleware function that will call the pagination function and add the relevant data to the response object
function paginationMiddleware(req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const paginatedData = paginate(res.locals.data, page, limit);

  res.locals.data = paginatedData;

  next();
}

export default donationController;
