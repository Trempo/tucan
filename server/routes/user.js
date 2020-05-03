const express = require("express");
const router = express.Router();
const request = require("request");
const Article = require("../models/article");

router.get("/", (req,res)=>{
    Article.find({}, (error, articleList)=>{
        if(error){
            Console.log("Something went wrong");
        }else{
            res.send(articleList);
        }
    });
});

router.delete("/:id",(req,res)=>{
    Article.findOneAndDelete({_id:req.params.id}, (error)=>{
        if(error){
            console.log("error");
        }
    });
});

module.exports = router;