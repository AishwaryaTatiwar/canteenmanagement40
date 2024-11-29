const express = require("express");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const axios = require("axios");
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
  const { email, password, captchaToken } = req.body; // Add captchaToken from frontend

  try {
    // Verify the CAPTCHA token with Google
    const secretKey = "6LczmYsqAAAAAMeRQOt8QVfWao031YdbHp6FtuPQ"; // Replace with your reCAPTCHA secret key
    const captchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: secretKey,
          response: captchaToken,
        },
      }
    );

    // Check CAPTCHA verification result
    if (!captchaResponse.data.success) {
      return res.status(400).send({ message: "CAPTCHA verification failed" });
    }

    // Find the user by email
    const user = await UserModel.find({ email: email });
    if (user[0]) {
      // Compare the hashed password
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          let obj = user[0];
          obj.password = "lol"; // Overwrite hashed password before sending response

          res.status(200).send({
            message: "Login successful",
            token: jwt.sign({ userID: user[0]._id }, "somesh"), // Generate JWT
            owner: obj,
          });
        } else {
          res.status(400).send({ message: "Invalid password" });
        }
      });
    } else {
      res.status(400).send({ message: "Invalid email" });
    }
  } catch (err) {
    res.status(500).send({ message: "Server error", error: err.message });
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
