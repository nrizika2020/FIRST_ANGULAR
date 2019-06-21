"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
const express = require("express");
const db_auction_1 = require("./db-auction");
exports.router = express.Router();
exports.router.use(cors());
exports.router.get('/products', async (req, res) => {
    res.json(await db_auction_1.getProducts(req.query));
});
exports.router.get('/products/:productId', async (req, res) => {
    const productId = parseInt(req.params.productId, 10) || -1;
    res.json(await db_auction_1.getProductById(productId));
});
exports.router.get('/categories', async (_, res) => {
    res.json(await db_auction_1.getAllCategories());
});
exports.router.get('/categories/:category', async (req, res) => {
    res.json(await db_auction_1.getProductsByCategory(req.params.category));
});
