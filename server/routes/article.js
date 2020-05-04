const express = require("express");
const router = express.Router();
const request = require("request");
const Article = require("../models/article");

const topHeadlines = {
    url: "https://newsapi.org/v2/top-headlines?country=co&api",
    headers: {
        "Authorization": "Bearer bafd59bee7774729a1a34926e536a998"
    }
}

const googleSearchApiKey = 'AIzaSyBH1hipn5acSEiXOdhAHGf5xba15sl2iyI';

router.get("/", (req, res) => {
    request(topHeadlines, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let data = JSON.parse(body);

            res.send(data["articles"].map(article=>{
                return {
                    title: article.title,
                    source: article.author,
                    url: article.url,
                    imageurl: article.urlToImage,
                    description: article.description
                }
            }));
        }
    });


});

router.post("/", (req,res)=>{
    Article.create(req.body).then((article)=>{
        res.json(article);
    }).catch((error)=>{
        res.status(500);
        res.json(error);
    });
});



module.exports = router;