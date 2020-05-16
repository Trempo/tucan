const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const Token = require("../models/token");
const Article = require("../models/article");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: "Un email es requerido",
        trim: true
    }, 

    password: {
        type: String,
        required: "Una contraseña es requerida",
        max: 100
    },

    firstName: {
        type: String,
        required: "Un nombre es requerido",
        max: 100
    },

    lastName: {
        type: String,
        required: "Un apellido es requerido",
        max: 100
    },

    country: {
        type: String,
        required: false
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    resetPasswordToken: {
        type: String,
        required: false
    },

    resetPasswordExpires: {
        type: Date,
        required: false
    },

    articleList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Article"
        }
    ],
    userStatus: {
        type: Number,
        default: 0,
    }
}, {timestamps:true});

userSchema.pre("save", function(next){
    const user = this;

    if(!user.isModified("password")) return next();

    bcrypt.genSalt(10, function(err, salt){
        if(err) return next(err);
        
        bcrypt.hash(user.password, salt, function(err,hash){
            if(err) return next(err);

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJWT = function(){
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
    
    let payload = {
        id: this._id,
        email: this.email,
        firstname: this.firstName,
        lastname: this.lastName,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(expirationDate.getTime()/1000, 10)
    });
};

userSchema.methods.generatePasswordReset = function(){
    this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordExpires = Date.now() + 3600000;
};

userSchema.methods.generateVerificationToken = function(){
    let payload = {
        userId: this._id,
        token: crypto.randomBytes(20).toString("hex")
    };

    return new Token(payload);
};

module.exports = mongoose.model("User", userSchema);