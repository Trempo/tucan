const express = require("express");
const {check} = require("express-validator");

const Auth = require("../controllers/auth");
const Password = require("../controllers/password");
const validate = require("../middleware/validate");

const router = express.Router();

router.get("/", (req,res)=>{
    res.status(200).json({message: "Este es el endpoint de autorizacion, registrate o inicia sesion"});
});

router.post("/register", [
    check('email').isEmail().withMessage('Ingresa un correo valido'),
    check('password').not().isEmpty().isLength({min: 6}).withMessage('La contraseña debe tener más de 6 caracteres'),
    check('firstName').not().isEmpty().withMessage('Tu nombre es requerido'),
    check('lastName').not().isEmpty().withMessage('Tu apellido es requerido')
], validate, Auth.register);

router.post("/login", [
    check('email').isEmail().withMessage('Ingresa un correo valido'),
    check('password').not().isEmpty(),
], validate, Auth.login);

//EMAIL verification
router.get("/verify/:token", Auth.verify);
router.post("/resend", Auth.resendToken);

//password reset
router.post("/recover", [
    check('email').isEmail().withMessage("Ingresa un correo valido"),
], validate, Password.recover);

router.get("/reset/:token", Password.reset);

router.post('/reset/:token', [
    check('password').not().isEmpty().isLength({min: 6}).withMessage('La contraseña debe tener más de 6 caracteres'),
    check('confirmPassword', 'Las contraseñas no son iguales').custom((value, {req}) => (value === req.body.password)),
], validate, Password.resetPassword);


module.exports = router;