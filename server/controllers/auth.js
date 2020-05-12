const User = require("../models/user");
const Token = require("../models/token");
const {sendEmail} = require("../utils/index");

// @route POST api/auth/register
// @desc Register user
// @access Public
exports.register = async (req, res) => {
    try{
        const {email} = req.body;

        //Make sure this account doesn't already exist
        const user = await User.findOne({email});

        if(user) return res.status(401).json({message: "La dirección de email proporcionada ya esta registrada"});

        const newUser = new User({...req.body, role: "basic"});
        const user_ = await newUser.save();
        await sendVerificationEmail(user_, req, res);
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
};

// @route POST api/auth/login 
// @desc Login user and return JWT token
// @access Public

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user) return res.status(401).json({error: "El correo " + email + " no esta asociado a ninguna cuenta."});

        //validate password 

        if(!user.comparePassword(password)) return res.status(401).json({error: "Correo o contraseña incorrectos."});

        //make sure the user has been verified
        if(!user.isVerified) return res.status(401).json({type: 'non-verified', error:"Tu cuenta no ha sido verificada."});

        //login successfull, write token, and send back user
        res.status(200).json({token:user.generateJWT(),user:user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//===== Email verification
// @route GET api/verify/:token
// @desc Verify token
// @access Public

exports.verify = async (req, res) => {
    if(!req.params.token) return res.status(400).json({message: "No se encontro un usuario para este token."});

    try{
        //find matching token
        const token = await Token.findOne({token:req.params.token});

        if(!token) return res.status(400).json({error:"No se encontro un token valido. Su token pudo haber expirado."});

        //if we found a token
        User.findOne({_id:token.userId}, (err, user) => {
            if(!user) return res.status(400).json({error:"No pudimos encontrar un usuario para este token"});
            
            if(user.isVerified) return res.status(400).json({error: "El usuario ya fue verificado"});

            //verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if(err) return res.status(500).json({message:err.message});

                res.status(200).json({message:"La cuenta fue verificada. Inicia sesión"});
            });
        });
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

// @route POST api/resend
// @desc Resend verification token
// @access Public 
exports.resendToken = async (req, res) => {
    try{
        const {email} = req.body;

        const user = await User.findOne({email});

        if(!user) return res.status(401).json({message: "El correo " + email + "no esta associado con ninguna cuenta. Vuelve a intentarlo"});

        if(user.isVerified) return res.status(400).json({message: "Esta cuenta ya fue verificada. Inicia sesión"});

        await sendVerificationEmail(user, req, res);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

async function sendVerificationEmail(user, req, res){
    try{
        const token = user.generateVerificationToken();

        //save the verification token
        await token.save();

        let subject = "Verifica tu cuenta de Tucan";
        let to = user.email;
        let from = process.env.FROM_EMAIL;
        //esto se tiene que cambiar para que el usuario vaya el frontend y el frontend mande el request
        // let link = "http://localhost:8080/#/verify/" + token.token;
        let link = "https://www.tucan.news/#/verify/" + token.token;
        let html = `<p>Hola ${user.firstName}<p><br><p>Por favor da click <a href="${link}">aquí</a> para verificar tu cuenta.</p> 
        <br><p>Si no hiciste esto, solo ignoralo.</p>`;
        await sendEmail({to, from, subject, html});

        res.status(200).json({message: "Un mensaje de verificación fue enviado a " + user.email + "."});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}