require("dotenv").config();

const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");
const morgan = require("morgan");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
// const methodOverride = require("method-override");
const passport = require("passport");
const app = express();
app.use(cors());
const userRoutes = require("./routes/user");

mongoose.promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tucan', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
app.use(morgan("tiny"));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// app.use(methodOverride("_method"));

//initialize passport middleware
app.use(passport.initialize());
require("./middleware/jwt")(passport);


//configurar rutas
require("./routes/index")(app);


app.listen(port, () => {
    console.log("Server online.");
});