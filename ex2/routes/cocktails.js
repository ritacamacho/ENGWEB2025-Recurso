var axios = require("axios");
var express = require('express');
var router = express.Router();

var endpoint = "http://localhost:18000";

/* GET cocktails page */
router.get("/", function(req, res, next) {
  axios.get(endpoint + "/cocktails").then(function(response) {
    // Sort cocktails by name
    const cocktailsData = response.data;
    res.render("cocktailsShow", { cocktails: cocktailsData });
  }).catch(next);
});

/* GET cocktail page */
router.get("/:id", function(req, res, next) {
  axios.get(endpoint + "/cocktails/" + req.params.id).then(function(response) {
    res.render("cocktailShow", { cocktail: response.data });
  }).catch(next);
});

/* GET cocktail creator page */
router.get("/criadores/:criador", function(req, res, next) {
  axios.get(endpoint + "/criadores/" + req.params.criador).then(function(response) {
    res.render("criadorShow", { criador: response.data });
  }).catch(next);
});

module.exports = router;
