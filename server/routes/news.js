const express = require("express");
const router = express.Router();
const {check} = require("express-validator");
const Article = require("../models/article");

const User = require("../controllers/user");
const validate = require("../middleware/validate");
const News = require("../controllers/news");

//SHOW MAIN STORIES
router.get("/:id/feed", News.showMainStories);

//SHOW MAIN TECH STORIES
router.get("/:id/techfeed", News.showTechStories);

//SHOW MAIN ECONOMY STORIES
router.get("/:id/econfeed", News.showEconStories);

//SHOW MAIN SPORTS STORIES
router.get("/:id/sportsfeed", News.showSportsStories);

//SHOW MAIN POLITICS STORIES
router.get("/:id/entertainmentfeed", News.showEntertainmentStories);

//ADD A POST FROM MAINS STORIES
router.post("/:id/list", News.addArticleList);

//SHOWS THE USER READ LIST
router.get("/:id/list", News.showArticleList);

//DELETES AN ARTICLE FROM THE READ LIST
router.delete("/:id/list/:article_id", News.deleteArticleList);

//SEARCH
router.post("/:id/search", News.Search);

module.exports = router;