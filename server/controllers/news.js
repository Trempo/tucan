const User = require("../models/user");
const Article = require("../models/article");
const { sendMail } = require("../utils/index");
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.API_KEY);

exports.showMainStories = async function (req, res) {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) return res.status(401).json({ error: "No se pudo actualizar la bandeja de entrada" });

        newsapi.v2.topHeadlines({
            country: user.country,
        }).then(response => {
            const data = response;
            res.send(data["articles"].map(article => {
                return {
                    title: article.title,
                    source: article.author,
                    url: article.url,
                    imageurl: article.urlToImage,
                    description: article.description
                }
            }));
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

exports.showTechStories = async function (req, res) {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) return res.status(401).json({ error: "No se pudo actualizar la bandeja de entrada" });

        newsapi.v2.topHeadlines({
            category: 'technology',
            country: user.country,
        }).then(response => {
            const data = response;
            res.send(data["articles"].map(article => {
                return {
                    title: article.title,
                    source: article.author,
                    url: article.url,
                    imageurl: article.urlToImage,
                    description: article.description
                }
            }));
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}
exports.showEconStories = async function (req, res) {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) return res.status(401).json({ error: "No se pudo actualizar la bandeja de entrada" });

        newsapi.v2.topHeadlines({
            category: 'business',
            country: user.country,
        }).then(response => {
            const data = response;
            res.send(data["articles"].map(article => {
                return {
                    title: article.title,
                    source: article.author,
                    url: article.url,
                    imageurl: article.urlToImage,
                    description: article.description
                }
            }));
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}
exports.showSportsStories = async function (req, res) {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) return res.status(401).json({ error: "No se pudo actualizar la bandeja de entrada" });

        newsapi.v2.topHeadlines({
            category: 'sports',
            country: user.country,
        }).then(response => {
            const data = response;
            res.send(data["articles"].map(article => {
                return {
                    title: article.title,
                    source: article.author,
                    url: article.url,
                    imageurl: article.urlToImage,
                    description: article.description
                }
            }));
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}
exports.showEntertainmentStories = async function (req, res) {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) return res.status(401).json({ error: "No se pudo actualizar la bandeja de entrada" });

        newsapi.v2.topHeadlines({
            category: 'entertainment',
            country: user.country,
        }).then(response => {
            const data = response;
            res.send(data["articles"].map(article => {
                return {
                    title: article.title,
                    source: article.author,
                    url: article.url,
                    imageurl: article.urlToImage,
                    description: article.description
                }
            }));
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}


exports.addArticleList = async function (req, res) {
    try {
        const user = await User.findById(req.params.id);
        const user_id = req.user._id;
        const id = req.params.id;

        if (user_id.toString() !== id.toString()) return res.status(400).json({ message: "No tienes permiso para eliminar eso" });
        if (!user) return res.status(401).json({ message: "No se pudo actualizar la bandeja de entrada" });

        Article.create(req.body).then((article) => {
            user.articleList.push(article);
            user.save();
            res.json(article);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

exports.showArticleList = async function (req, res) {
    try {
        const user = await User.findById(req.params.id).populate({ path: "articleList", model: Article });
        const user_id = req.user._id;
        const id = req.params.id;

        if (user_id.toString() !== id.toString()) return res.status(400).json({ message: "No tienes permiso para eliminar eso" });
        if (!user) return res.status(401).json({ message: "No se pudo actualizar tu lista de lecturas" });
        res.status(200).json(user.articleList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteArticleList = async function (req, res) {
    try {
        const user = await User.findById(req.params.id);
        const user_id = req.user._id;
        const id = req.params.id;

        if (user_id.toString() !== id.toString()) return res.status(400).json({ message: "No tienes permiso para eliminar eso" });
        if (!user) return res.status(401).json({ message: "No se encontro un usuario para esta lista de lectura" });

        await Article.deleteOne({ _id: req.params.article_id });
        res.status(200).json({ message: "El articulo fue eliminado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}