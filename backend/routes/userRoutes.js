const express = require("express")
const { signupUser, loginUser, verifyToken, getUser, refreshToken } = require("../controller/userController")

const router = express.Router()

router.post("/signup", signupUser)

router.post("/login", loginUser)

router.get("/user", verifyToken, getUser)

router.get("/refresh", refreshToken, verifyToken, getUser)

module.exports = router