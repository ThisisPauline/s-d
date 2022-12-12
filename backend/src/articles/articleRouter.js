const express = require("express");
const articleRouter = express.Router();
const articleHandlers = require("./articleHandlers");

articleRouter.get("/", articleHandlers.getAllArticles);
articleRouter.post("/", articleHandlers.creatArticle);

module.exports = articleRouter;
