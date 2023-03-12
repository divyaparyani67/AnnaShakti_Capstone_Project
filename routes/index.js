import express from "express";
import {
  registerController,
  loginController,
  userController,
  refreshController,
  donationController,
  volunteerController,
} from "../controllers";
import auth from "../middlewares/auth";

const router = express.Router();

//routes
router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/me", auth, userController.me);
router.post("/refresh", refreshController.refresh);
router.post("/logout", auth, loginController.logout);
router.post("/donatemeal", donationController.donations);
router.get("/donations", donationController.index);
router.get("/donations/:id", donationController.show);
router.get("/donations/:ids", donationController.getDonation);
router.post("/volunteerRegistration", volunteerController.volunteer);
router.get("/volunteersInfo", volunteerController.index);
router.get("/volunteers/:id", volunteerController.show);

export default router;
