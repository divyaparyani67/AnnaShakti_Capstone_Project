import Joi from "joi";

const volunteerSchema = Joi.object({
  foodQuantityToCollect: Joi.string().required(),
  volunteername: Joi.string().required(),
  mobile: Joi.number().required(),
  address: Joi.string().required(),
  pincode: Joi.number().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
});

export default volunteerSchema;
