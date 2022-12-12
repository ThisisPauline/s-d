const database = require("../database");

const getAllArticles = (req, res) => {
  database
    .query("SELECT * FROM articles")
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
};

const creatArticle = (req, res) => {
  const { name, category, description, price, quantity } = req.body;
  database
    .query(
      "INSERT INTO articles (name, category, description, price, quantity ) VALUES (?, ?, ?, ?, ?)",
      [name, category, description, price, quantity]
    )
    .then((result) => {
      if (result[0].affectedRows === 0) {
        res.status(400).send("Article could not be created.");
      } else {
        const newArticleID = result[0].insertId;
        res.status(201).json({
          id: newArticleID,
          name,
          category,
          description,
          price,
          quantity,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
};

module.exports = {
  getAllArticles,
  creatArticle,
};
