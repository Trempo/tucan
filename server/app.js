const express = require("express");
const request = require("request");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();

const articleRoutes = require("./routes/article");
const userRoutes = require("./routes/user");




mongoose.connect('mongodb://localhost:27017/tucan', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors());
app.use(methodOverride("_method"));
app.use("/feed", articleRoutes);

//Solo es para prueba de concepto
app.use("/list", userRoutes);




app.listen(port, () => {
    console.log("Server online.")
});