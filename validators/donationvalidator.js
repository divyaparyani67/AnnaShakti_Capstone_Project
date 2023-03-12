import Joi from "joi";

const donationSchema = Joi.object({
 
  foodQuantity: Joi.string().required(),
  foodDescription: Joi.string().required(),
  donorname: Joi.string().required(),
  mobile: Joi.number().required(),
  address: Joi.string().required(),
  pincode: Joi.number().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
});

export default donationSchema;
