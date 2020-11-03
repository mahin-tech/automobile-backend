require("dotenv").config()

//Define Packages
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const path = require("path")

//My Routes
const authRoutes = require("./routes/auth")
const categoryRoutes = require("./routes/category")
const tagRoutes = require("./routes/tag")
const postRoutes = require("./routes/post")
const discussionRoutes = require("./routes/discussion")
const commentRoutes = require("./routes/comment")
const likeRoutes = require("./routes/like")

//DB Connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => {
    console.log("DB CONNECTED")
})

//Middleware
app.use(bodyParser.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(cookieParser())
app.use(cors())
app.use('/upload',express.static(path.join(__dirname,'public/upload')))

//Routes
app.use("/api", authRoutes)
app.use("/api", categoryRoutes)
app.use("/api", tagRoutes)
app.use("/api", postRoutes)
app.use("/api", discussionRoutes)
app.use("/api", commentRoutes)
app.use("/api", likeRoutes)

//PORT
const port = process.env.PORT || 8000

//Starting a Server
app.listen(port, () => {
	console.log(`app is running at ${port}`)
})