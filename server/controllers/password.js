const User = require("../models/user");
const {sendEmail} = require("../utils/index");

// @route POST api/auth/recover
// @desc Recover Password - Generates token and Sends passwords reset email
// @access Public

exports.recover = async (req, res) => {
    try{
        const {email} = req.body;

        const user = await User.findOne({email});

        if(!user) return res.status(401).json({error: "El correo " + req.body.email + " no esta asociado a ninguna cuenta"});

        //generate and set password reset token
        user.generatePasswordReset();

        //save the update user object
        await user.save();

        //send email
        let subject = "Petición de cambio de contraseña";
        let to = user.email;
        let from = process.env.FROM_EMAIL;
        let link = "https://www.tucan.news/#/reset/" + user.resetPasswordToken;
        let html = `<p>Hola ${user.firstName}</p>
                    <p>Por favor de click <a href="${link}">aquí</a> para restablecer tu contraseña.</p> 
                    <p>Si no pediste esto, ignoralo, tu contraseña no será cambiada.</p>`;

        await sendEmail({to, from, subject, html});

        res.status(200).json({message: "Un correo para restablecer tu contraseña fue enviado a " + user.email + "."});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// @route POST api/auth/reset
// @desc Reset Password - Validate password reset token and shows the password reset view
// @access Public
exports.reset = async (req, res) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({resetPasswordToken: token, resetPasswordExpires: {$gt: Date.now()}});

        if (!user) return res.status(401).json({error: 'El token para restablecer tu contraseña es invalido o a expirado.'});

        //Redirect user to form with the email address
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

// @route POST api/auth/reset
// @desc reset password
// @access Public
exports.resetPassword = async (req, res) => {
    try{
        const {token} = req.params;

        const user = await User.findOne({resetPasswordToken: token, resetPasswordExpires: {$gt: Date.now()}});

        if(!user) return res.status(401).json({message: "El token para restablecer la contraseña es invalido o ha caducado"});

        //set the new password
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.isVerified = true;

        //save the updated user
        await user.save();

        let subject = "Tu contraseña fue restablecida";
        let to = user.email;
        let from = process.env.FROM_EMAIL;
        let html = `<p>Hola ${user.firstName}</p>
                    <p>Esta es una confirmación de que tu contraseña de la cuenta  ${user.email} ha cambiado.</p>`

        await sendEmail({to, from, subject, html});
        
        res.status(200).json({message: "Tu contraseña ha sido actualizada"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

