const express = require("express");
const routes = express.Router();
var fetch = require("node-fetch");

const productsHandler = require("./productsHandler");

routes.post("/registerProduct", async (req, res) => {
    const data = req.body;
    res.json(await productsHandler.productsRegister(data));
});

routes.get("/", async (req, res) => {
    res.json(await productsHandler.getProducts());
});

routes.post("/getUserProducts", async (req, res) => {
    const data = req.body;
    res.json(await productsHandler.getUserProducts(data.cpf));
});


module.exports = routes;