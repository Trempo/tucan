const express = require("express");
const request = require("request");
const port = process.env.PORT || 3000;
const app = express();

const topHeadlines = {
    url: "https://newsapi.org/v2/top-headlines?country=co&api",
    headers: {
        "Authorization": "Bearer bafd59bee7774729a1a34926e536a998"
    }
}

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    request(topHeadlines, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let data = JSON.parse(body);

            res.render("news", { articles: data["articles"] });
        }
    });


});


app.listen(port, () => {
    console.log("Server online.")
});