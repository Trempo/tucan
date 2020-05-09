const User = require("../models/user");
const Article = require("../models/article");
const {sendMail} = require("../utils/index");
const request = require("request");

// @route GET admin/user
// @desc Returns all users
// @access Public
exports.index = async function (req, res) {
    const users = await User.find({});
    res.status(200).json({users});
};

// @route POST api/user
// @desc add a new user
// @access Public
exports.store = async (req, res) => {
    try{
        const {email} = req.body;

        //make sure this account doesn't already exist
        const user = await User.findOne({email});

        if(user) return res.status(401).json({message: "El correo que ingresaste ya esta registrado"});

        const password = "_" + Math.random().toString(36).substr(2, 9); //Generate a random password
        const newUser = new User({...req.body, password});

        const user_ = await newUser.save();

        //generate and set password reset token
        user_.generatePasswordReset();

        //save the updated user object
        await user_.save();

        //get mail options
        let domain = "http://" + req.headers.host;
        let subject = "Nueva cuenta de Tucan";
        let to = user.email;
        let from = process.env.FROM_EMAIL;
        let link = "http://" + req.headers.host + "/api/auth/reset/" + user.resetPasswordToken;
        let html = `<p>Hola ${user.username}<p><br><p>Se creo una cuenta de ${domain}. Por favor ve a <a href="${link}">link</a> tpara establecer una contraseña e iniciar sesión.</p> 
                  <br><p>Si no hiciste eso, solo ignora este correo</p>`

        await sendEmail({to, from, subject, html});
               
        res.status(200).json({message:"Un correo fue enviado a " + user.mail + " para terminar el proceso de registro"});
    } catch (error){
        res.status(500).json({success: false, message:error.message});
    }
};

// @route GET api/user/{id}
// @desc Returns a specific user
// @access Public

exports.show = async function(req, res) {
    try{
        const id = req.params.id;

        const user = await User.findById(id);

        if(!user) return res.status(401).json({message:"El usuario no existe"});

        res.status(200).json({user});
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

// @route PUT api/user/{id}
// @desc Update user details
// @access Public
exports.update = async function(req, res){
    try{
        const update = req.body;
        const id = req.params.id;
        const userId = req.user._id;
        
        if(userId.toString() !== id.toString()) return res.status(400).json({message: "No tienes permiso para eso"});

        const user = await User.updateOne({_id: id}, {$set: update}, {new:true});

        res.status(200).json({user,message:"El usuario fue actualizado"});

    } catch (error){
        res.status(500).json({message:error.message});
    }
};

exports.destroy = async function (req, res) {
    try{
        const id = req.params.id;
        const user_id = req.user._id;

        if(user_id.toString() !== id.toString()) return res.status(400).json({message:"No tienes permiso para eliminar eso"});

        await User.findOneAndDelete({_id:id});
        res.status(200).json({message:"El usuario fue eliminado"});
    } catch(error){
        res.status(500).json({message:error.message});
    }
};

exports.showMainStories = async function (req, res) {
    try{
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user) return res.status(401).json({message: "No se pudo actualizar la bandeja de entrada"});

        const topHeadlines = {
            url: "https://newsapi.org/v2/top-headlines?country=" + user.country + "&api",
            headers: {
                "Authorization": "Bearer bafd59bee7774729a1a34926e536a998"
            }
        }
        request(topHeadlines, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let data = JSON.parse(body);
    
                res.send(data["articles"].map(article => {
                    return {
                        title: article.title,
                        source: article.author,
                        url: article.url,
                        imageurl: article.urlToImage,
                        description: article.description
                    }
                }));
            }
        })
    } catch (error){
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
}

exports.addArticleList = async function (req, res) {
    try{
        const user = await User.findById(req.params.id);
        const user_id = req.user._id;
        const id = req.params.id;

        if(user_id.toString() !== id.toString()) return res.status(400).json({message:"No tienes permiso para eliminar eso"});
        if(!user) return res.status(401).json({message: "No se pudo actualizar la bandeja de entrada"});
        
        Article.create(req.body).then((article) => {
            user.articleList.push(article);
            user.save();
            res.json(article);
        });
    }catch (error){
        res.status(500).json({message:error.message});
    }

}

exports.showArticleList = async function (req, res) {
    try{
        const user = await User.findById(req.params.id).populate({path:"articleList", model: Article});
        const user_id = req.user._id;
        const id = req.params.id;
        
        if(user_id.toString() !== id.toString()) return res.status(400).json({message:"No tienes permiso para eliminar eso"});
        if(!user) return res.status(401).json({message:"No se pudo actualizar tu lista de lecturas"});
        res.status(200).json(user.articleList);
    } catch (error){
        res.status(500).json({message:error.message});
    }
}

exports.deleteArticleList = async function (req, res) {
    try{
        const user = await User.findById(req.params.id);
        const user_id = req.user._id;
        const id = req.params.id;
        
        if(user_id.toString() !== id.toString()) return res.status(400).json({message:"No tienes permiso para eliminar eso"});
        if(!user) return res.status(401).json({message: "No se encontro un usuario para esta lista de lectura"});

        await Article.deleteOne({_id:req.params.article_id});
        res.status(200).json({message:"El articulo fue eliminado"});
    } catch(error){
        res.status(500).json({message:error.message});
    }
}