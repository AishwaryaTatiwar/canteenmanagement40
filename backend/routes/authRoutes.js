const express = require("express");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
// const UserModel = require("../mod");

// Registration Route User Register with  email, password, mobile
userRouter.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    // find email is that user want to register if this already exists then response will be Email already exists
    const isEmail = await UserModel.find({ email: email });
    if (isEmail.length > 0) {
      res.status(200).send({ message: "Email already exists" });
    } else {
      // else use bcyrpt that will encrypt the password and make it hashed and add to DB
      bcrypt.hash(password, 4, async (err, hash) => {
        const payload = {
          email,
          password: hash,
          name,
        };
        // now in payload password will be hased
        const user = new UserModel(payload);
        await user.save();
        // response
        res.status(200).send({ message: "Registration successful" });
      });
    }
  } catch (err) {
    // error
    res.status(400).send({ message: err.message });
  }
});

// POST Route for Login user using Credentials
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // first Find Email that user enter
    const user = await UserModel.find({ email: email });
    if (user[0]) {
      // then comapire hash or basically decrypt the password
      bcrypt.compare(password, user[0].password, (err, result) => {
        // is sucesfully matched then send response
        if (result) {
          let obj = user[0];
          // we dont want to sent hased password to user so overwrite it with "lol"
          obj.password = "lol";
          // Response
          res.status(200).send({
            message: "Login successful",
            // token Creation -- key -- somesh
            token: (token = jwt.sign({ userID: user[0]._id }, "somesh")),
            // owner is use information obj
            owner: obj,
          });
          
        } else {
          // on Wrong Response --
          res.status(400).send({ message: "Invalid password" });
        }
      });
    } else {
      // if email is not Present
      res.status(400).send({ message: "Invalid email" });
    }
  } catch (err) {
    // on Error
    res.status(400).send({ message: err.message });
  }
});

module.exports = userRouter;

// const express=require("express");
// const jwt=require("jsonwebtoken");
// const bcrypt=require("bcrypt");
// const userRouter = express.Router();
// const UserModel = require("../Model/User.Model");

// //Registration
// userRouter.post("/signUp",async(req,res)=>{

// const{name,email,password}=req.body;
// try{
//     //find email is that user want to register if this already exists then response will be Email already exists

//     const isEmail=await UserModel.find({email:email});

//     if(isEmail.length>0){
//         res.status(200).send({"email already exists,bhai dusra daalo na!!"});
//     }
//     else{
//          // else use bcyrpt that will encrypt the password and make it hashed and add to DB
//          bcrypt.hash(password,hash,async(err,hash))
//     }
//     }
// }

// });
