const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = "helloworld";

const signupUser = async (req, res, next) => {
  // email id duplication validation
  let checkExistingUser;
  try {
    checkExistingUser = await userModel.findOne({ email: req.body.email });
  } catch (error) {
    console.log("User exist already");
  }

  if (checkExistingUser) {
    return res.status(400).json({ message: "User exist already" });
  }
  // email id duplication validation end

  // encrypting the password before storing in database

  const hashedPassword = bcrypt.hashSync(req.body.password);

  // adding the user after email validation and hashing the password
  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    await user.save();
  } catch (error) {
    console.log("Error while adding the user", error.message);
  }

  return res.status(201).json({ message: user });
};

const loginUser = async (req, res, next) => {
  // checking if user exists or not
  const { email, password } = req.body;

  let exisitingUser;
  try {
    exisitingUser = await userModel.findOne({ email: email });
  } catch (error) {
    console.log(error);
  }

  if (!exisitingUser) {
    return res.status(400).json({ message: "User not found, Please Signup" });
  }

  // /comparing hashed password of user with given password at the time of login
  const isPasswordCorrect = bcrypt.compareSync(password, exisitingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({message: "Invalid Email / Password, Please check your credentials",});
  }

  // creating token to authorize the users access
  const loginToken = jwt.sign({ id: exisitingUser._id }, JWT_SECRET_KEY, {
    expiresIn: "35s",
  });

//   creating cookie using userId and token 
    res.cookie(String(exisitingUser._id), loginToken, {
        path:"/",
        expires: new Date(Date.now() + 1000*30),
        httpOnly:true,
        sameSite:"lax"
    })

  return res.status(200).json({message: "Successfully Logged In", loggedInUser: exisitingUser, loginToken,});
};

// AccessToken creation 

// verifying the creation of the access token and extracting the user id for getting the user details
const verifyToken = (req, res, next) => {

  // here we are getting token from req.headers["authorization"] which we are setting manullay 
  // const headers = req.headers["authorization"];
  // const token = headers.split(" ")[1];

  // here we are getting token from cookie which we set and its gets automatically set in req.headers.cookie
  const cookies = req.headers.cookie
  const token = cookies.split("=")[1]
  // console.log(token)

  // checking the validation of the token
  if (!token) {
    return res.status(404).json({ message: "No Token found" });
  }

//   jwt.verify will verify the given token with secret key and we can extract the user id 
  jwt.verify(String(token), JWT_SECRET_KEY, (error, user) => {
    if (error) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    // console.log(user.id);

    req.id = user.id;
  });
  next(); // used to run the next function written in router.get("/user", verifyToken, getUser)
};

const getUser = async (req, res, next) => {
  const userId = req.id;

  let user
  try{
    user = await userModel.findById(userId, "-password") // "-password: used to exclude the password field while getting the user document"
  }catch(error){
    console.log("Failed to get User", error.message)
  }

  if(!user){
    return res.status(400).json({message:"User not find"})
  }

  return res.status(200).json({user})
};


const refreshToken = ( req, res, next) =>{

  // getting the cookies from header
  const cookies = req.headers.cookie
  const prevToken = cookies.split("=")[1]

  if(!prevToken){
    return res.status(400).json({message:"token not found"})
  }

  // verifying the token 
  jwt.verify(String(prevToken), JWT_SECRET_KEY, (err, user)=>{
    if(err){
      return res.status(403).json({message:"Authentication failed"})
    }

    // destorying the token 
    res.clearCookie(`${user.id}`)
    req.cookies[`${user.id}`]= ""

    // creating the new token 
    const token = jwt.sign({id: user.id}, JWT_SECRET_KEY, {
      expiresIn:"35s"
    })

    res.cookie(String(user.id), token, {
      path:"/",
      httpOnly:true,
      expires: new Date(Date.now + 1000*30), //30sec
      sameSite:"lax"
    })

    req.id = user.id
    next()
  })



}

module.exports = { signupUser, loginUser, verifyToken, getUser, refreshToken };
