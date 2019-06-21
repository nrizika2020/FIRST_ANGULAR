"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const db$ = readFile('./data/products.json', 'utf8')
    .then(JSON.parse, console.error);
async function getAllCategories() {
    const allCategories = (await db$)
        .map(p => p.categories)
        .reduce((all, current) => all.concat(current), []);
    return [...new Set(allCategories)];
}
exports.getAllCategories = getAllCategories;
async function getProducts(params = {}) {
    return filterProducts(await db$, params);
}
exports.getProducts = getProducts;
async function getProductById(productId) {
    return (await db$).find(p => p.id === productId);
}
exports.getProductById = getProductById;
async function getProductsByCategory(category) {
    return (await db$).filter(p => p.categories.includes(category));
}
exports.getProductsByCategory = getProductsByCategory;
async function updateProductBidAmount(productId, price) {
    const products = await db$;
    const product = products.find(p => p.id === productId);
    if (product) {
        product.price = price;
    }
}
exports.updateProductBidAmount = updateProductBidAmount;
function filterProducts(products, params) {
    return products.filter(p => {
        if (params.title && !p.title.toLowerCase().includes(params.title.toLowerCase())) {
            return false;
        }
        if (params.minPrice && p.price < parseInt(params.minPrice)) {
            return false;
        }
        if (params.maxPrice && p.price > parseInt(params.maxPrice)) {
            return false;
        }
        return true;
    });
}
