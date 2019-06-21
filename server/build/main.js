"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const http_1 = require("http");
const ws_auction_1 = require("./ws-auction");
const rest_auction_1 = require("./rest-auction");
const app = express();
app.use('/api', rest_auction_1.router);
app.use('/data', express.static(path.join(__dirname, '..', 'data')));
const server = http_1.createServer(app);
ws_auction_1.createBidServer(server);
server.listen(9090, "localhost", () => {
    // const {address, port} = server.address();
    // console.log('Listening on %s %s', address, port);
    console.log('Listening on localhost:9000');
});
