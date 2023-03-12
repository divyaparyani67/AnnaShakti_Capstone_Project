import Joi from "joi";
import { User, RefreshToken } from "../../models";
import bcrypt from "bcrypt";
import { CustomErrorHandler, JwtService } from "../../services";
import { REFRESH_SECRET } from "../../config";
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

    const { name, email, phone, password } = req.body;

    // hash-password
    const hashedPassword = await bcrypt.hash(password, 10); //saltorrounds

    //prepare the model
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    let access_token;
    let refresh_token;
    try {
      const result = await user.save();
      console.log(result);

      // token create
      access_token = JwtService.sign({ _id: result._id, role: result.role });

      refresh_token = JwtService.sign(
        { _id: user._id, role: user.role },
        "1y",
        REFRESH_SECRET
      );
      // database whitelist
      await RefreshToken.create({ token: refresh_token });
    } catch (err) {
      return next(err);
    }

    res.json({
      access_token,
      refresh_token,
      message: "Registered Successfully",
    });
  },
};

export default registerController;
