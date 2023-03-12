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

// const exmUsers= [
//   {id:1, name:'User 1'},
//   {id:2, name:'User 1'},
//   {id:3, name:'User 1'},
//   {id:4, name:'User 1'},
//   {id:5, name:'User 1'},
//   {id:6, name:'User 1'},
//   {id:7, name:'User 1'},
//   {id:8, name:'User 1'},
//   {id:9, name:'User 1'},
//   {id:10, name:'User 1'},
//   {id:11, name:'User 1'},
//   {id:12, name:'User 1'},
//   {id:13, name:'User 1'},
//   {id:14, name:'User 1'},
//   {id:15, name:'User 1'},
//   {id:16, name:'User 1'},
//   {id:17, name:'User 1'},
//   {id:18, name:'User 1'},
//   {id:19, name:'User 1'},
//   {id:20, name:'User 1'},
//   {id:21, name:'User 1'},
//   {id:22, name:'User 1'},
//   {id:23, name:'User 1'},
//   {id:24, name:'User 1'},
//   {id:25, name:'User 1'},
//   {id:26, name:'User 1'},
//   {id:27, name:'User 1'},
//   {id:28, name:'User 1'},
//   {id:29, name:'User 1'},
//   {id:30, name:'User 1'}
// ]

// router.get("/exmUser",(req,res)=>{
//   const page = parseInt(req.query.page);
//     const limit = parseInt(req.query.limit);
//     const startIndex = (page-1) * limit;
//     const endIndex = page * limit;
//     const resultUsers = exmUsers.slice(startIndex, endIndex)
//   res.json(resultUsers);
// });

// router.get("/posts",paginatedResults('posts'),(req,res)=>{
  
//   res.json(res.paginatedResults);
// });

router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/me", auth, userController.me);
router.post("/refresh", refreshController.refresh);
router.post("/logout", auth, loginController.logout);
router.post("/donatemeal", donationController.donations);
router.get("/donations",paginatedResults('donations'), donationController.index);
router.get("/donations/:id", donationController.show);
router.post("/volunteerRegistration", volunteerController.volunteer);
router.get("/volunteersInfo",paginatedResults('volunteersInfo'), volunteerController.index);
router.get("/volunteers/:id", volunteerController.show);


function paginatedResults(model) {
  return (req,res,next) => {
      const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page-1) * limit;
    const endIndex = page * limit;
    const results = {};
    if(endIndex < model.length){
    results.next = {
      page:page+1,
      limit: limit
    }}
    if(startIndex > 0){
    results.previous = {
      page:page-1,
      limit: limit
    }}
     results.results = model.slice(startIndex, endIndex)
     res.paginatedResults = results
     next();
  // res.json(results);
}
}


export default router;
