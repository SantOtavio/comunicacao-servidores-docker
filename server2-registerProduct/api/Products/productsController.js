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

routes.get("/:cpf", async (req, res) => {
    const cpf = req.params.cpf;
    res.json(await productsHandler.getUserProducts(cpf));
});


module.exports = routes;