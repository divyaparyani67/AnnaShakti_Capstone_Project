import Joi from "joi";
import { User } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";

const registerController = {
  async register(req, res, next) {
    //validation

    const registerSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      phone: Joi.string()
        .pattern(new RegExp("^[0-9]{10}$"))
        .messages({
          "string.pattern.base": `Phone number must have 10 digits.`,
        })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      repeat_password: Joi.ref("password"),
    });

    const { error } = registerSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    //check if user in the databse already

    try {
      const exist = await User.exists({ email: req.body.email });
      if (exist) {
        return next(
          CustomErrorHandler.alreadyExist("This email id already taken.")
        );
      }
    } catch (err) {
      return next(err);
    }

    res.json({ msg: "hello from express" });
  },
};

export default registerController;
