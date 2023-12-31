const express = require("express")
const router = require("./routes/userRoutes")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors({credentials:true, origin: "http://localhost:5173"}))
app.use(cookieParser())

app.use(express.json())
app.use("/api", router)

mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(4000, ()=>{console.log("server started at http://localhost:4000")})
    console.log("Database Connected successfully")
}).catch((error)=>{
    console.log("Error whilel conntecting with database :", error.message)
})



